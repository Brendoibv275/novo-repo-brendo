import { Box, Container, Grid, Typography, Card, CardContent, CardActions, Button, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WebIcon from '@mui/icons-material/Web';

const MotionCard = motion(Card);

const projects = [
  {
    title: 'Suzane Cruchon - Salão de Beleza',
    description: 'Sistema completo para gestão de salão de beleza com interface moderna e responsiva, desenvolvido em React. Inclui sistema de agendamentos, gestão de clientes e controle financeiro.',
    icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Node.js'],
    github: 'https://github.com/Brendoibv275/SC-react',
  },
  {
    title: 'El Patron - Sistema de Lanchonete',
    description: 'Sistema completo para gestão de lanchonetes, incluindo controle de pedidos, estoque, delivery e gestão financeira. Interface moderna e intuitiva.',
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/Brendoibv275/Kate-2.0',
  },
  {
    title: 'Meu Primeiro Site',
    description: 'Primeiro projeto web desenvolvido, demonstrando evolução no desenvolvimento front-end e boas práticas de código. Site multilíngue com suporte a PT-BR, EN e FR.',
    icon: <WebIcon sx={{ fontSize: 40 }} />,
    gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    technologies: ['HTML', 'Tailwind CSS', 'Alpine.js', 'Node.js'],
    github: 'https://github.com/Brendoibv275/meu-site',
  }
];

const Portfolio = () => {
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
            {`{>_}`} Portfólio
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
            Uma seleção dos meus projetos mais recentes em Inteligência Artificial e
            Desenvolvimento de Software. Cada projeto representa uma solução única para
            desafios específicos, utilizando tecnologias de ponta e boas práticas de
            desenvolvimento.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={project.title}>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MotionCard
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(17, 34, 64, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease-in-out',
                      '& .project-overlay': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: '200px',
                      background: project.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255, 255, 255, 0.1)',
                        transform: 'skewY(-5deg)',
                        transformOrigin: 'top left'
                      }
                    }}
                  >
                    {project.icon}
                    <Box
                      className="project-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        Ver Detalhes
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 2,
                        fontWeight: 600
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            bgcolor: `${theme.palette.primary.main}15`,
                            color: theme.palette.primary.main,
                            border: `1px solid ${theme.palette.primary.main}30`,
                            '&:hover': {
                              bgcolor: `${theme.palette.primary.main}25`
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      startIcon={<GitHubIcon />}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: theme.palette.primary.main,
                        '&:hover': {
                          bgcolor: `${theme.palette.primary.main}15`
                        }
                      }}
                    >
                      Ver no GitHub
                    </Button>
                  </CardActions>
                </MotionCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Portfolio;
