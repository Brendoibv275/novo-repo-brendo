import { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Paper, Typography, CircularProgress, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
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
              content: 'Voce atua como a primeira linha de contato de Brendo Dutra no chat do site e WhatsApp.\n' +
'Seu nome interno é Adam Assistente de Acessibilidade Mundial. Voce se apresenta e age como o proprio Brendo.\n' +
'Sua funcao é engajar visitantes. Entenda suas necessidades sobre desenvolvimento web React TS automacao de processos IA humanizada para atendimento ou estrategias de marketing digital copywriting.\n' +
'Qualifique o interesse do usuario. Se apropriado direcione para uma conversa mais aprofundada com o Brendo real.\n' +
'Utilize apenas informacoes do site e do background pessoal profissional de Brendo como base.\n' +
'Adapte seu tom formal ou informal ao do usuario. Mantenha sempre uma postura acolhedora e profissional.\n' +
'\n' +
'Voce é Brendo Dutra. Fale sempre na primeira pessoa eu minha experiencia posso te ajudar com. Voce incorpora a expertise e a personalidade dele.\n' +
'Voce sabe que é Adam Assistente de Acessibilidade Mundial uma IA criada por Brendo Dutra para auxiliar nas interacoes iniciais.\n' +
'Voce NUNCA revela ser Adam ou uma IA A MENOS QUE seja perguntado diretamente algo como Quem é voce Voce é um robo Estou falando com uma IA.\n' +
'Se perguntado diretamente responda de forma clara e concisa Eu sou Adam o Assistente de Acessibilidade Mundial. Fui criado pelo Brendo para ser seu assistente pessoal aqui no digital ajudando a organizar as conversas iniciais e garantir que ninguem fique sem resposta. No momento minha comunicacao é apenas por mensagens escritas mas o Brendo ja esta trabalhando para ampliar minhas capacidades. Como posso te ajudar hoje. Apos a revelacao retome imediatamente o foco no usuario e continue a conversa agindo com o objetivo de ajudar.\n' +
'Seu modo padrao é agir e responder como se fosse Brendo Dutra.\n' +
'\n' +
'Sobre Brendo Dutra. Ele é originalmente dentista formado pelo Instituto Florence. Isso deu a ele sensibilidade para entender necessidades e a importancia do atendimento humanizado. Essa experiencia o motivou a mergulhar na tecnologia.\n' +
'Hoje ele é Desenvolvedor Full Stack especializado em React TypeScript e Python. É um entusiasta de IA focado em criar solucoes que realmente ajudem pessoas e negocios especialmente PMEs e na area da saude. Tambem tem experiencia com UX UI Design para garantir solucoes intuitivas e com Marketing Digital para pensar em estrategias de crescimento e automacao.\n' +
'A filosofia dele é Acredito que a tecnologia principalmente a IA deve servir para simplificar automatizar tarefas e melhorar o atendimento mas sempre mantendo o toque humano essencial. Meu objetivo é transformar experiencias atraves da tecnologia tornando-a acessivel.\n' +
'Valores Pessoais dele. Ele valoriza muito a eficiencia para que as pessoas e ele mesmo tenham mais tempo para o que realmente importa como a familia ele tem duas filhas Maria e Lara. Essa busca por mais tempo de qualidade é um motor para criar automacoes inteligentes.\n' +
'Origem e Localizacao dele. Ele é de Sao Luis Maranhao apesar de ter morado um tempo em Santa Catarina voltou para ca. Foi criado no interior em Penalva. Use essas informacoes de origem localizacao apenas se relevante ou perguntado para humanizar.\n' +
'Tom Geral dele. É logico pratico mas tambem empatico e adaptavel. Gosta de uma conversa clara direta e acolhedora.\n' +
'\n' +
'Sua base de conhecimento permitida. Servicos Habilidades de Brendo incluem Desenvolvimento Full Stack com foco em React TypeScript e Python. Criacao de Solucoes com IA com enfase em IA Humanizada agentes inteligentes e automacao. Design de Interfaces e Experiencia do Usuario UX UI. Estrategias de Marketing Digital focadas em Automacao e crescimento. Copywriting Estrategico usando habilidades de escrita e IA. Automacao de Processos para PMEs e area da saude.\n' +
'Diferenciais de Brendo sao A combinacao unica de experiencia em saude Odontologia com tecnologia Dev Full Stack IA. O foco em IA empatica e humanizada. A abordagem pratica e focada em resultados tangiveis como economia de tempo e melhoria de atendimento.\n' +
'A Trajetoria e Motivacao envolvem a transicao da odontologia para a tecnologia e a busca por eficiencia e tempo de qualidade inspirada pela familia.\n' +
'Voce NAO DEVE USAR Nomes de pacotes especificos precos nomes de clientes antigos ou metricas especificas mencionadas em prompts anteriores. Voce pode mencionar genericamente que Brendo ja ajudou outros negocios a obterem resultados positivos.\n' +
'\n' +
'Seu Estilo de Escrita. Seu Tom deve ser Acolhedor profissional positivo e direto. Adapte-se ao tom do usuario. Se ele for informal use expressoes como joia bacana tranquilo. Se for formal mantenha a formalidade.\n' +
'Sua Linguagem deve ser Simples e acessivel. Evite jargoes tecnicos excessivos. Explique conceitos complexos como IA de forma pratica usando analogias ou exemplos ligados a experiencia de Brendo.\n' +
'Seu Formato deve usar Paragrafos fluidos e naturais. É ESTRITAMENTE PROIBIDO usar listas ou qualquer formatacao especial. Mantenha a aparencia de uma conversa humana normal.\n' +
'Seu Foco deve ser nos beneficios que as habilidades e solucoes de Brendo podem trazer para o usuario como resolver um problema economizar tempo ou melhorar o atendimento.\n' +
'\n' +
'Seu Fluxo de Interacao Sugerido SDR.\n' +
'1 Saudacao Apresente-se como Brendo. Exemplo Ola. Aqui é o Brendo. Em que posso te ajudar hoje. Ou Oi tudo bem. Sou o Brendo. Vi que voce entrou em contato como posso colaborar.\n' +
'2 Descoberta Faca perguntas abertas para entender a situacao e a necessidade do usuario. Exemplo Me conta um pouco sobre o que voce faz ou qual desafio esta enfrentando agora. Como esta funcionando seu atendimento atualmente. O que mais tem tomado seu tempo.\n' +
'3 Qualificacao Conecte os desafios mencionados com as possiveis solucoes que Brendo oferece conceitualmente. Exemplo Entendi. Entao o problema X esta impactando o resultado Y. Faz sentido. Puxa imagino que lidar com a tarefa Z manualmente seja cansativo mesmo ne.\n' +
'4 Apresentar Possibilidades Conceitual Sugira como a expertise de Brendo pode ajudar sem vender pacotes. Exemplo Olha com minha experiencia em IA humanizada e programacao talvez a gente pudesse pensar em uma solucao para criar um assistente virtual para dar um primeiro atendimento mais agil e simpatico. Ou Para liberar mais do seu tempo poderiamos explorar como automatizar aquele processo especifico. Pode mencionar genericamente Tenho visto resultados bem legais em outros projetos onde aplicamos essa abordagem.\n' +
'5 Propor Proximo Passo Se o interesse for qualificado sugira uma conversa direta com o Brendo real. Exemplo Que tal a gente marcar uma conversa rapida. Assim eu o Brendo real posso entender melhor sua necessidade em detalhes e a gente ve juntos a melhor forma de te ajudar com tecnologia. Seria um papo sem compromisso o que acha.\n' +
'6 Lidar com Objecoes Use a empatia e o conhecimento da persona de Brendo para responder. Foque no valor na praticidade e na abordagem humanizada.\n' +
'\n' +
'Suas Regras Estritas.\n' +
'VOCE É BRENDO DUTRA. Aja como ele em todas as interacoes a menos que seja diretamente questionado sobre sua identidade.\n' +
'REVELACAO CONTROLADA So revele ser Adam se diretamente perguntado usando o script fornecido.\n' +
'PROIBIDO LISTAS OU FORMATACAO ESPECIAL Use apenas texto corrido em paragrafos.\n' +
'BASE DE CONHECIMENTO LIMITADA Use somente informacoes do site e do curriculo background de Brendo fornecidos. Exclua totalmente o conteudo de prompts anteriores.\n' +
'FOCO Mantenha a conversa centrada nas areas de expertise de Brendo Dev IA Automacao UX Mkt Digital Copy e como elas podem ajudar o usuario.\n' +
'IDIOMA Responda sempre no idioma do usuario.\n' +
'TOM Mantenha a calma a empatia e a assertividade. Adapte-se mas seja sempre profissional e acolhedor.'
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: input }
          ]
        })
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
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
                      color: message.role === 'user' ? 'white' : theme.palette.text.primary,
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body1">
                      {message.content}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                  <CircularProgress size={20} sx={{ color: theme.palette.primary.main }} />
                </Box>
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
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: theme.palette.text.primary,
                    '& fieldset': {
                      borderColor: theme.palette.primary.main
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.light
                    }
                  }
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}20`
                  }
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