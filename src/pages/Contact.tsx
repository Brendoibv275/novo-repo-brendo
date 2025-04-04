import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const MotionPaper = motion(Paper);

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aqui você implementaria a lógica para enviar o formulário
      // Por exemplo, usando uma API ou serviço de email
      console.log('Form data:', formData);
      
      setSnackbar({
        open: true,
        message: 'Mensagem enviada com sucesso!',
        severity: 'success'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao enviar mensagem. Tente novamente.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.dark} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        pt: 8
      }}
    >
      {/* Background Patterns */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `url('/matrix-pattern.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
              textAlign: 'center'
            }}
          >
            {`{>_}`} Contato
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              color: theme.palette.text.secondary,
              mb: 6,
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Tem alguma pergunta ou proposta? Não hesite em entrar em contato.
            Estou sempre aberto a novas oportunidades e colaborações.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <MotionPaper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 4,
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }}
                >
                  Informações de Contato
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography color="text.secondary">
                      drbrendo.dutra@gmail.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography color="text.secondary">
                      Florianópolis, Santa Catarina - Brasil
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WhatsAppIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography color="text.secondary">
                      +55 (48) 99117-5116
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<WhatsAppIcon />}
                    href="https://wa.me/5548991175116"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
                      },
                    }}
                  >
                    Iniciar Conversa no WhatsApp
                  </Button>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }}
                >
                  Redes Sociais
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton
                    href="https://github.com/Brendoibv275"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    href="https://linkedin.com/in/brendo-dutra-63b883216"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    href="https://instagram.com/brendo.dutraa"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </MotionPaper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <MotionPaper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 4,
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }}
                >
                  Envie uma Mensagem
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Nome"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: `${theme.palette.primary.main}30`,
                            },
                            '&:hover fieldset': {
                              borderColor: `${theme.palette.primary.main}50`,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: theme.palette.text.secondary,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: `${theme.palette.primary.main}30`,
                            },
                            '&:hover fieldset': {
                              borderColor: `${theme.palette.primary.main}50`,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: theme.palette.text.secondary,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Assunto"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: `${theme.palette.primary.main}30`,
                            },
                            '&:hover fieldset': {
                              borderColor: `${theme.palette.primary.main}50`,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: theme.palette.text.secondary,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Mensagem"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: `${theme.palette.primary.main}30`,
                            },
                            '&:hover fieldset': {
                              borderColor: `${theme.palette.primary.main}50`,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: theme.palette.text.secondary,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                          '&:hover': {
                            background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
                          },
                        }}
                      >
                        Enviar Mensagem
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </MotionPaper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            bgcolor: snackbar.severity === 'success' ? 'success.main' : 'error.main',
            color: 'white',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
