import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const pages = [
  { title: 'Início', path: '/' },
  { title: 'Sobre', path: '/sobre' },
  { title: 'Portfólio', path: '/portfolio' },
  { title: 'Contato', path: '/contato' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'rgba(10, 25, 47, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'none'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MotionBox 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              mr: 2,
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5 }
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: theme.palette.primary.main
              }}
            >
              {`{>_}`} Brendo Dutra
            </Typography>
          </MotionBox>

          {isMobile && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    background: 'rgba(10, 25, 47, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.path}
                    sx={{
                      color: theme.palette.text.primary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: theme.palette.primary.main,
              textDecoration: 'none',
            }}
          >
            {`{>_}`} Brendo Dutra
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: theme.palette.text.primary,
                  display: 'block',
                  mx: 1,
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
