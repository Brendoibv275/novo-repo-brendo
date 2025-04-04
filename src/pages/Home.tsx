import { Box, Container, Typography, Grid, Paper, IconButton, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useInView } from 'react-intersection-observer';

const MotionTypography = motion(Typography);

interface Technology {
  name: string;
  description: string;
  color: string;
}

const technologies: Technology[] = [
  {
    name: 'React & TypeScript',
    description: 'Desenvolvimento de interfaces modernas e responsivas',
    color: '#61DAFB'
  },
  {
    name: 'Python & IA',
    description: 'Criação de soluções inteligentes e humanizadas',
    color: '#3776AB'
  },
  {
    name: 'UX/UI Design',
    description: 'Design centrado no usuário e experiências intuitivas',
    color: '#FF6B6B'
  },
  {
    name: 'Marketing Digital',
    description: 'Estratégias de crescimento e automação',
    color: '#4CAF50'
  }
];

const testimonials = [
  {
    name: "Kauan Naftalle",
    role: "Gestor de Tráfego",
    text: "A implementação do sistema de IA para atendimento trouxe resultados impressionantes. Conseguimos aumentar nossa taxa de conversão bem mais do que pensei, mantendo a qualidade do atendimento."
  },
  {
    name: "Suzane Cruchon",
    role: "Proprietária de Salão de Beleza",
    text: "O sistema desenvolvido para meu salão revolucionou nossa gestão. A interface intuitiva e o sistema de agendamento tornaram nossos processos muito mais eficientes."
  },
  {
    name: "Brendo Dutra",
    role: "Case de Sucesso - Odontologia",
    text: "Com a implementação do sistema de IA para agendamentos e qualificação de leads, consegui aumentar em 60% a taxa de conversão dos meus anúncios e reduzir em 80% o tempo gasto com gestão de agenda."
  }
];

const Home = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.dark} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 0 }
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
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url('/circuit-pattern.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: { xs: 'auto', md: '100vh' }, py: { xs: 4, md: 8 } }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MotionTypography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 2,
                  lineHeight: { xs: 1.2, md: 1.4 }
                }}
              >
                {`{>_}`} Olá, eu sou Brendo
              </MotionTypography>
              <MotionTypography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 4,
                  lineHeight: { xs: 1.2, md: 1.4 }
                }}
              >
                Dentista, Desenvolvedor Full Stack & Especialista em IA Humanizada
              </MotionTypography>
              <MotionTypography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: theme.palette.text.secondary,
                  mb: 4,
                  lineHeight: { xs: 1.6, md: 1.8 }
                }}
              >
                Combinando expertise em desenvolvimento full stack com IA para criar soluções
                que mantêm o toque humano. Minha experiência como dentista me permitiu 
                entender profundamente as nuances do atendimento ao paciente, o que me ajuda 
                a desenvolver IAs mais empáticas e humanizadas. Especializado em React, 
                TypeScript, Python e automação inteligente para empresas de saúde e PMEs, 
                transformo experiências de atendimento através da tecnologia.
              </MotionTypography>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
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
                  href="https://www.linkedin.com/in/brendo-dutra-63b883216/"
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
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
                  p: { xs: 1, sm: 2 }
                }}
              >
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        borderRadius: 2,
                        bgcolor: `${tech.color}15`,
                        border: `1px solid ${tech.color}30`,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)'
                        }
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: tech.color,
                          fontWeight: 600,
                          mb: 1,
                          fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                      >
                        {tech.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: { xs: '0.875rem', sm: '0.9rem' }
                        }}
                      >
                        {tech.description}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: 4,
                color: theme.palette.primary.main,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Depoimentos
            </Typography>
            <Grid container spacing={3}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: { xs: 2, sm: 3 },
                        height: '100%',
                        background: 'rgba(17, 34, 64, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ 
                          mb: 2, 
                          color: theme.palette.text.secondary,
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ 
                          color: theme.palette.primary.main,
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: theme.palette.text.secondary,
                          fontSize: { xs: '0.8rem', sm: '0.875rem' }
                        }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
