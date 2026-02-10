export const DateUtils = (dateString?: string | null): string => {
  if (!dateString) return '';

  const now = new Date();
  const past = new Date(dateString);

  if (isNaN(past.getTime())) return '';

  const diffMs = now.getTime() - past.getTime();

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffMs >= year) return `${Math.floor(diffMs / year)}y ago`;
  if (diffMs >= month) return `${Math.floor(diffMs / month)}mo ago`;
  if (diffMs >= week) return `${Math.floor(diffMs / week)}w ago`;
  if (diffMs >= day) return `${Math.floor(diffMs / day)}d ago`;
  if (diffMs >= hour) return `${Math.floor(diffMs / hour)}h ago`;
  if (diffMs >= minute) return `${Math.floor(diffMs / minute)}m ago`;

  return 'just now';
};
