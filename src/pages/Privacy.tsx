import { Container, Typography, Box, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const Privacy = () => {
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
          Política de Privacidade e Direitos Autorais
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            1. Direitos Autorais
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Todo o conteúdo deste site, incluindo textos, imagens, logos, ícones, vídeos e demais materiais, é de propriedade exclusiva de Brendo Dutra e está protegido pela Lei de Direitos Autorais (Lei nº 9.610/98) e demais leis de proteção à propriedade intelectual.
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            A reprodução, distribuição, transmissão, modificação ou uso do conteúdo deste site, total ou parcialmente, para fins comerciais ou não, sem autorização prévia e por escrito, é expressamente proibida.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            2. Proteção de Dados Pessoais (LGPD)
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/18), este site está comprometido com a proteção dos seus dados pessoais. Coletamos apenas informações necessárias para melhorar sua experiência de navegação e prestar nossos serviços.
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Seus dados pessoais são tratados com segurança e sigilo, sendo utilizados apenas para as finalidades para as quais foram coletados. Você tem direito a acessar, corrigir, solicitar a exclusão ou a portabilidade dos seus dados pessoais.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            3. Cookies e Tecnologias de Rastreamento
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar o conteúdo. Ao continuar navegando, você concorda com o uso dessas tecnologias.
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Você pode configurar seu navegador para recusar todos os cookies ou para receber um aviso quando um cookie for enviado. No entanto, se você recusar os cookies, algumas partes do site podem não funcionar corretamente.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            4. Contato
          </Typography>
          <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
            Para questões relacionadas aos seus dados pessoais ou direitos autorais, entre em contato através do email: contato@brendodutra.com.br
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 4 }}>
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </Typography>
      </MotionPaper>
    </Container>
  );
};

export default Privacy; 