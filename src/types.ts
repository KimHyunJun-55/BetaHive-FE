export interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  badge?: "NEW" | "HOT" | "URGENT" | "BEST" | "EARLY";
  baseReward?: string;
  participants: number;
  daysLeft: number;
  progress: number;
  requirements?: [];
  testerBadgeType?: "required" | "recommended";
}

export interface Theme {
  name: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  bg: string;
  card: string;
  text: string;
  textLight: string;
  textLighter: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  overlay: string;
  gradientPrimary: string;
}

export interface MenuItem {
  icon: React.ReactNode; // JSX 요소를 허용하도록 변경
  label: string;
  active?: boolean;
}
