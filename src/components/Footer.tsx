import { Box, Container, Grid, Typography, IconButton, Link, Divider, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(10, 25, 47, 0.85)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}40 0%, transparent 100%)`,
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo e Descrição */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 2
              }}
            >
              {`{>_}`} Brendo Dutra
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Desenvolvedor Full Stack & Especialista em IA, unindo tecnologia e 
              atendimento humanizado para criar soluções inovadoras.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                href="https://github.com/Brendoibv275"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
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
                size="small"
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
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="mailto:drbrendo.dutra@gmail.com"
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Contato */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Contato
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2" color="text.secondary">
                  Florianópolis, Santa Catarina - Brasil
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2" color="text.secondary">
                  drbrendo.dutra@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WhatsAppIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2" color="text.secondary">
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
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Rodapé */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} Brendo Dutra. Todos os direitos reservados.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" align="right">
              Desenvolvido com{' '}
              <Link
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                React
              </Link>{' '}
              e{' '}
              <Link
                href="https://mui.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Material-UI
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer; 