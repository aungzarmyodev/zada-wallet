export const CredentialStatus = {
  VALID: 'valid',
  EXPIRING: 'expiring',
  EXPIRED: 'expired',
} as const;

export type CredentialStatusType = (typeof CredentialStatus)[keyof typeof CredentialStatus];
