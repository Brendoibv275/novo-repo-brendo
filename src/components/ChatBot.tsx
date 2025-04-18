import { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Paper, Typography, CircularProgress, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ClientData {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  preferredDate?: Date;
  preferredTime?: string;
}

interface SDRState {
  step: 'initial' | 'gathering_info' | 'email_confirmation' | 'calendar_scheduling' | 'completed';
  clientData: ClientData;
}

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializa Firebase apenas se as credenciais estiverem disponíveis
let app;
let db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error('Erro ao inicializar Firebase:', error);
}

const ChatBot = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sdrState, setSDRState] = useState<SDRState>({
    step: 'initial',
    clientData: {
      name: '',
      email: '',
      interest: '',
    }
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const saveToFirebase = async (clientData: ClientData) => {
    if (!db) {
      throw new Error('Firebase não está inicializado');
    }

    try {
      const docRef = await addDoc(collection(db, 'leads'), {
        ...clientData,
        createdAt: new Date(),
        status: 'new'
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao salvar no Firebase:', error);
      throw error;
    }
  };

  const processDateTime = (input: string): Date => {
    // Implementação simplificada - você pode melhorar isso
    const now = new Date();
    const [day, time] = input.toLowerCase().split(' às ');
    
    // Mapeia dias da semana
    const weekDays: { [key: string]: number } = {
      'domingo': 0, 'segunda': 1, 'segunda-feira': 1,
      'terça': 2, 'terça-feira': 2,
      'quarta': 3, 'quarta-feira': 3,
      'quinta': 4, 'quinta-feira': 4,
      'sexta': 5, 'sexta-feira': 5,
      'sábado': 6, 'sabado': 6
    };

    // Encontra o próximo dia da semana correspondente
    const targetDay = weekDays[day.trim()];
    if (targetDay === undefined) {
      throw new Error('Dia da semana inválido');
    }

    let targetDate = new Date(now);
    while (targetDate.getDay() !== targetDay) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    // Processa o horário
    const [hours, minutes] = time.split(':').map(Number);
    targetDate.setHours(hours || 0, minutes || 0, 0, 0);

    return targetDate;
  };

  const processSDRStep = async (userInput: string) => {
    try {
      switch(sdrState.step) {
        case 'initial':
          if (userInput.toLowerCase().includes('reunião') || userInput.toLowerCase().includes('conversar')) {
            setSDRState(prev => ({ ...prev, step: 'gathering_info' }));
            return 'Ótimo! Para agendarmos uma reunião, primeiro preciso de algumas informações. Qual é o seu nome completo?';
          }
          break;
        
        case 'gathering_info':
          if (!sdrState.clientData.name) {
            setSDRState(prev => ({
              ...prev,
              clientData: { ...prev.clientData, name: userInput }
            }));
            return 'Obrigado! Agora, por favor, me informe seu e-mail para contato:';
          } else if (!sdrState.clientData.email) {
            if (validateEmail(userInput)) {
              setSDRState(prev => ({
                ...prev,
                clientData: { ...prev.clientData, email: userInput },
                step: 'email_confirmation'
              }));
              return `Perfeito! Você confirma que ${userInput} é seu e-mail correto? (Sim/Não)`;
            } else {
              return 'Desculpe, mas este e-mail parece inválido. Pode me fornecer um e-mail válido?';
            }
          }
          break;

        case 'email_confirmation':
          if (userInput.toLowerCase().includes('sim')) {
            setSDRState(prev => ({
              ...prev,
              step: 'calendar_scheduling'
            }));
            return 'Excelente! Qual seria o melhor dia e horário para nossa reunião? (Ex: Segunda-feira às 14:00)';
          } else {
            setSDRState(prev => ({
              ...prev,
              clientData: { ...prev.clientData, email: '' },
              step: 'gathering_info'
            }));
            return 'Ok, por favor, me forneça o e-mail correto:';
          }
          break;

        case 'calendar_scheduling':
          try {
            const dateTime = processDateTime(userInput);
            const formattedDateTime = format(dateTime, "EEEE, dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
            
            setSDRState(prev => ({
              ...prev,
              clientData: { 
                ...prev.clientData,
                preferredDate: dateTime,
                preferredTime: formattedDateTime
              }
            }));

            // Salvar no Firebase
            await saveToFirebase(sdrState.clientData);

            setSDRState(prev => ({
              ...prev,
              step: 'completed'
            }));

            return `Perfeito! Agendei nossa reunião para ${formattedDateTime}. Seus dados foram salvos e você receberá um e-mail de confirmação em breve. Estou ansioso para conversarmos!`;
          } catch (error) {
            console.error('Erro ao processar agendamento:', error);
            return 'Desculpe, tive um problema ao processar o agendamento. Pode tentar informar a data e hora neste formato? (Ex: Segunda-feira às 14:00)';
          }
          break;
      }

      return null;
    } catch (error) {
      console.error('Erro no processamento do SDR:', error);
      setError('Ocorreu um erro no processamento. Por favor, tente novamente.');
      return 'Desculpe, ocorreu um erro inesperado. Pode tentar novamente?';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Primeiro, tenta processar como parte do SDR
      const sdrResponse = await processSDRStep(input);
      
      if (sdrResponse) {
        setMessages(prev => [...prev, { role: 'assistant', content: sdrResponse }]);
        setIsLoading(false);
        return;
      }

      // Se não for parte do SDR, continua com o processamento normal do GPT
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Voce atua como a primeira linha de contato de Brendo Dutra...'
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: input }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Erro na chamada da API');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      setError('Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        width: { xs: '90%', sm: '400px' }
      }}
    >
      {!isOpen ? (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            background: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              background: theme.palette.primary.dark
            }
          }}
        >
          <SmartToyIcon />
        </IconButton>
      ) : (
        <Fade in={isOpen}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              background: 'rgba(17, 34, 64, 0.95)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${theme.palette.primary.main}30`,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '500px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
                pb: 1,
                borderBottom: `1px solid ${theme.palette.primary.main}30`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SmartToyIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                  BrendoBot
                </Typography>
              </Box>
              <IconButton
                onClick={() => setIsOpen(false)}
                size="small"
                sx={{ color: theme.palette.primary.main }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                mb: 2,
                p: 1,
                '&::-webkit-scrollbar': {
                  width: '8px'
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: theme.palette.primary.main,
                  borderRadius: '4px'
                }
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      maxWidth: '80%',
                      background: message.role === 'user' 
                        ? theme.palette.primary.main 
                        : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 2
                    }}
                  >
                    <Typography
                      sx={{
                        color: message.role === 'user' 
                          ? '#fff' 
                          : theme.palette.text.primary
                      }}
                    >
                      {message.content}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
              {error && (
                <Typography color="error" sx={{ textAlign: 'center', my: 2 }}>
                  {error}
                </Typography>
              )}
              <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: `${theme.palette.primary.main}50`,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                sx={{
                  background: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    background: theme.palette.primary.dark,
                  },
                  '&.Mui-disabled': {
                    background: `${theme.palette.primary.main}50`,
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

export default ChatBot;