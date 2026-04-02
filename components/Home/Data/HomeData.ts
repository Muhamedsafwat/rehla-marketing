export interface StepData {
  num: string;
  id: string;
}

export interface ServiceData {
  id: "branding" | "content" | "performance" | "strategy";
  icon?: string;
}

export const services: ServiceData[] = [
  { id: "branding" },
  { id: "content" },
  { id: "performance" },
  { id: "strategy" },
];

export const steps: StepData[] = [
  { num: "01", id: "step1" },
  { num: "02", id: "step2" },
  { num: "03", id: "step3" },
  { num: "04", id: "step4" },
];

export const whyUsPoints: string[] = [
  "point1",
  "point2",
  "point3",
  "point4",
];
