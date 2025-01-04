export type AbilityType = 
  | 'Haste'
  | 'Charge'
  | 'Splash'
  | 'Double Strike'
  | 'Overwhelm'
  | 'Flying'
  | 'Elusive'
  | 'Taunt'
  | 'Stealth'
  | 'First Strike';

export interface Ability {
  type: AbilityType;
  description: string;
} 