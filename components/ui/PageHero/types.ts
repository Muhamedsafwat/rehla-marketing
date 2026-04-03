export type WordVariant = "filled" | "outlined" | "accent" | "muted";

export interface HeroWord {
  text: string;
  variant?: WordVariant;
  indent?: number;
  clampSize?: string;
}

export interface PageHeroProps {
  eyebrow?: string;
  words: HeroWord[];
  statement: string;
  meta?: string;
  isRtl?: boolean;
  className?: string;
}
