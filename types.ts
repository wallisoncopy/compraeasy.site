export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureArea {
  title: string;
  description: string;
  iconName: 'clinical' | 'behavioral' | 'sports' | 'aesthetic' | 'child' | 'pregnant' | 'bonus';
}
