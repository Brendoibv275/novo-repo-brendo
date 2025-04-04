import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const theme = useTheme();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              p: { xs: 2, sm: 3 },
              background: 'rgba(17, 34, 64, 0.95)',
              backdropFilter: 'blur(10px)',
              borderTop: `1px solid ${theme.palette.primary.main}30`,
              zIndex: 1000
            }}
          >
            <Box
              sx={{
                maxWidth: 'lg',
                mx: 'auto',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 2, sm: 3 }
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  flex: 1,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
                <Typography
                  component="a"
                  href="/privacy"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Política de Privacidade
                </Typography>
                .
              </Typography>
              <Button
                variant="contained"
                onClick={handleAccept}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: 'white',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                  }
                }}
              >
                Aceitar
              </Button>
            </Box>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 