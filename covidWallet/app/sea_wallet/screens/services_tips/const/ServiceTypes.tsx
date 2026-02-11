export const ServiceTypes = {
  INSURANCE: 'insurance',
  HEALTHCARE: 'healthcare',
  FINANCIAL: 'financial',
  CAREER: 'career',
} as const;

export type ServiceStatusType = (typeof ServiceTypes)[keyof typeof ServiceTypes];
