export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Pricing", href: "/pricing", key: "pricing" },
  { label: "Examples", href: "/examples", key: "examples" },
  { label: "FAQ", href: "/faq", key: "faq" },
  { label: "Contact Us", href: "/contact", key: "contact" },
];

export const APP_NAME = "Builder by hotcode.ai";
export const APP_TAGLINE = "The fastest way to turn an idea into a production-ready website.";
export const APP_TAGLINE_SHORT = "Generate production-ready websites with AI in seconds.";

export interface PricingTier {
  id: string;
  name: string;
  credits: number;
  price: number;
  priceLabel: string;
  isPopular: boolean;
  ctaLabel: string;
  features: string[];
  colorClass: string;
  bgClass: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ExampleProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  badgeLabel: string;
  iconColor: string;
  bgColor: string;
  decorativeGlyph: string;
}