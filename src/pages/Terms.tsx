import { Container, Typography, Box, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const Terms = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          p: { xs: 3, md: 6 },
          background: 'rgba(17, 34, 64, 0.95)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.primary.main}30`
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            mb: 4
          }}
        >
          Termos de Uso
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            1. Aceitação dos Termos
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Ao acessar e utilizar este site, você concorda em cumprir estes termos de uso e todas as leis e regulamentos aplicáveis. Se você não concordar com qualquer um destes termos, está proibido de usar ou acessar este site.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            2. Uso do Site
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Este site é fornecido apenas para fins informativos e de apresentação profissional. Você concorda em não usar o site para qualquer finalidade ilegal ou não autorizada.
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Você não deve, sem nossa permissão prévia por escrito:
          </Typography>
          <Box component="ul" sx={{ pl: 4, color: theme.palette.text.secondary }}>
            <Typography component="li" paragraph>
              Copiar ou reproduzir qualquer parte do site
            </Typography>
            <Typography component="li" paragraph>
              Modificar, distribuir ou criar trabalhos derivados
            </Typography>
            <Typography component="li" paragraph>
              Usar o site para fins comerciais não autorizados
            </Typography>
            <Typography component="li" paragraph>
              Tentar acessar áreas restritas do site
            </Typography>
            <Typography component="li" paragraph>
              Interferir com o funcionamento normal do site
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            3. Responsabilidades
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            O site é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas. Não garantimos que o site será livre de erros ou que qualquer defeito será corrigido.
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Não nos responsabilizamos por danos diretos, indiretos, incidentais, consequenciais ou punitivos resultantes do seu uso ou incapacidade de usar o site.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            4. Modificações
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Reservamos o direito de modificar ou descontinuar, temporária ou permanentemente, o site ou qualquer parte dele, com ou sem aviso prévio. Não seremos responsáveis perante você ou qualquer terceiro por qualquer modificação, suspensão ou descontinuação do site.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            5. Lei Aplicável
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Estes termos serão regidos e interpretados de acordo com as leis do Brasil, independentemente de conflitos de disposições legais.
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 4 }}>
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </Typography>
      </MotionPaper>
    </Container>
  );
};

export default Terms; 