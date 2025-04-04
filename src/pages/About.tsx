import { Box, Container, Grid, Typography, Paper, useTheme, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionPaper = motion(Paper);

const skills = [
  {
    category: 'Desenvolvimento Web',
    items: [
      'React',
      'TypeScript',
      'Next.js',
      'Material-UI',
      'Tailwind CSS',
      'Responsive Design'
    ]
  },
  {
    category: 'Backend & IA',
    items: [
      'Python (desde 2015)',
      'IA & Machine Learning',
      'Automação de Processos',
      'APIs RESTful',
      'Node.js',
      'Banco de Dados'
    ]
  },
  {
    category: 'Experiência Profissional',
    items: [
      'Odontologia',
      'Marketing Digital',
      'Gestão de Projetos',
      'UX/UI Design',
      'Vendas',
      'Atendimento ao Cliente'
    ]
  }
];

const About = () => {
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
        pt: { xs: 8, md: 8 }
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
        <Grid container spacing={6}>
          {/* Foto de Perfil */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingTop: { xs: '1rem', md: '2rem' }
                }}
              >
                <Box
                  component="div"
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -10,
                      left: -10,
                      right: -10,
                      bottom: -10,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}40 0%, ${theme.palette.primary.light}40 100%)`,
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    },
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                        opacity: 0.5
                      },
                      '50%': {
                        transform: 'scale(1.05)',
                        opacity: 0.8
                      },
                      '100%': {
                        transform: 'scale(1)',
                        opacity: 0.5
                      }
                    }
                  }}
                >
                  <Avatar
                    src="/images/profile.jpg"
                    alt="Brendo Dutra"
                    sx={{
                      width: { xs: 200, md: 300 },
                      height: { xs: 200, md: 300 },
                      border: `4px solid ${theme.palette.primary.main}`,
                      boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
                      zIndex: 1,
                      position: 'relative'
                    }}
                  />
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Texto Sobre */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 2
                }}
              >
                {`{>_}`} Sobre Mim
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: theme.palette.text.secondary,
                  mb: 4,
                  lineHeight: { xs: 1.6, md: 1.8 }
                }}
              >
                Sou um desenvolvedor Full Stack e especialista em IA com uma jornada única.
                Como cirurgião-dentista, desenvolvi uma compreensão profunda do atendimento 
                humanizado, que hoje aplico no desenvolvimento de IAs mais empáticas e 
                soluções tecnológicas que realmente fazem a diferença.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: theme.palette.text.secondary,
                  mb: 4,
                  lineHeight: { xs: 1.6, md: 1.8 }
                }}
              >
                Desde 2015, venho explorando Python e desenvolvimento de software,
                e desde 2020 me aprofundando em IA. Hoje, como desenvolvedor Full Stack,
                crio soluções completas que vão do front-end ao back-end, sempre mantendo
                o foco em experiências que unem tecnologia avançada com atendimento 
                humanizado, especialmente para profissionais de saúde e pequenas empresas.
              </Typography>
            </motion.div>
          </Grid>

          {/* Habilidades */}
          <Grid item xs={12}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <MotionPaper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 4 },
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
                    fontWeight: 600,
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
                  }}
                >
                  Habilidades
                </Typography>
                <Grid container spacing={4}>
                  {skills.map((skill) => (
                    <Grid item xs={12} key={skill.category}>
                      <Box
                        sx={{
                          mb: 2,
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: 1,
                          bgcolor: `${theme.palette.primary.main}15`,
                          border: `1px solid ${theme.palette.primary.main}30`
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.palette.primary.main,
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                          }}
                        >
                          {skill.category}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1
                          }}
                        >
                          {skill.items.map((item) => (
                            <Typography
                              key={item}
                              variant="body2"
                              sx={{
                                color: theme.palette.text.secondary,
                                bgcolor: `${theme.palette.primary.main}10`,
                                px: { xs: 1.5, sm: 2 },
                                py: { xs: 0.5, sm: 1 },
                                borderRadius: 1,
                                border: `1px solid ${theme.palette.primary.main}20`,
                                fontSize: { xs: '0.8rem', sm: '0.875rem' }
                              }}
                            >
                              {item}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </MotionPaper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
