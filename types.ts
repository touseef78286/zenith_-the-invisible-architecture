
export enum FrequencyLayer {
  VISION = 0,
  TECHNICAL = 1,
  CORE = 2
}

export interface MouseState {
  x: number;
  y: number;
  speed: number;
}

export interface ZenithContent {
  title: string;
  subtitle: string;
  data: string[];
}
