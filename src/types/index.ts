// Tipos para Tecnologias
export interface Technology {
  name: string;
  description: string;
  color: string;
}

// Tipos para Projetos
export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

// Tipos para Formulário de Contato
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Tipos para Habilidades
export interface Skill {
  category: string;
  items: string[];
}

// Tipos para Configurações do Site
export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

// Tipos para Animações
export interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// Tipos para Componentes de Layout
export interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: object;
}

// Tipos para Navegação
export interface NavItem {
  title: string;
  path: string;
}

// Tipos para Temas
export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
  text: string;
} 