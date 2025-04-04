import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CodeIcon from '@mui/icons-material/Code';

const MotionBox = motion(Box);

const services = [
  {
    title: 'Desenvolvimento Web Personalizado',
    description:
      'Criação de sites e aplicações web modernas e responsivas com foco em experiência do usuário.',
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Sites e Portfólios Profissionais',
      'Aplicações Web Responsivas',
      'Interfaces Modernas e Intuitivas',
      'Otimização para SEO',
    ],
  },
  {
    title: 'Automação com IA Humanizada',
    description:
      'Soluções de automação inteligente que mantêm o toque humano no atendimento.',
    icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Chatbots Inteligentes',
      'Automação de Atendimento',
      'Qualificação de Leads',
      'Follow-up Personalizado',
    ],
  },
  {
    title: 'Soluções para Área da Saúde',
    description: 'Sistemas especializados para clínicas e profissionais de saúde.',
    icon: <FollowTheSignsIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Agendamento Inteligente',
      'Gestão de Pacientes',
      'Automação de Processos',
      'Comunicação Eficiente',
    ],
  },
  {
    title: 'Marketing Digital & Automação',
    description: 'Estratégias de marketing digital com automação inteligente.',
    icon: <AutoGraphIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Gestão de Tráfego',
      'Automação de Campanhas',
      'Análise de Dados',
      'Otimização de Conversão',
    ],
  },
  {
    title: 'Consultoria em Tecnologia',
    description: 'Orientação especializada para implementação de soluções tecnológicas.',
    icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Análise de Necessidades',
      'Planejamento Estratégico',
      'Escolha de Tecnologias',
      'Acompanhamento de Projetos',
    ],
  },
];

const Services = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Cabeçalho */}
          <Grid item xs={12}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" component="h1" gutterBottom align="center">
                Nossas Soluções
              </Typography>
              <Typography variant="h5" color="text.secondary" align="center" paragraph>
                Tecnologia com toque humano para transformar seu negócio
              </Typography>
            </MotionBox>
          </Grid>

          {/* Serviços */}
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>{service.icon}</Box>
                    <Typography variant="h4" component="h2">
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {service.description}
                  </Typography>
                  <List>
                    {service.benefits.map((benefit, benefitIndex) => (
                      <ListItem key={benefitIndex}>
                        <ListItemIcon>
                          <Box
                            component="span"
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
