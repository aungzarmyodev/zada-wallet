export type ResourceObj = {
  id: string;
  title: string;
  description: string;
  phone: string | null;
  url: string | null;
};

export const mapResource = (api: any): ResourceObj => {
  return {
    id: api.id,
    title: api.title,
    description: api.content_body ?? '',
    phone: api.phone ?? undefined,
    url: api.url ?? undefined,
  };
};

export type CategoryObj = {
  id: string;
  icon: string;
  name: string;
  type: string;
};

const CATEGORY_ICON_MAP: Record<string, string> = {
  'emergency&welfare': 'health-and-safety',
  'financial&insurance': 'credit-card',
  'healthcare&wellness': 'monitor-heart',
};

const getCategoryIcon = (name?: string) => {
  if (!name) return 'help-circle';

  const key = name.toLowerCase().replace(/\s/g, '');
  return CATEGORY_ICON_MAP[key] ?? 'help-circle';
};

export const mapCategory = (api: any): CategoryObj => ({
  id: api?.id ?? '',
  name: api?.name ?? '',
  icon: getCategoryIcon(api?.name),
  type: api?.type ?? '',
});

export type ServiceObj = {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  isActive: boolean;
  url: string | null;
  category: CategoryObj;
};

export const mapService = (api: any): ServiceObj => {
  const category = api.categories || api.category || {};

  return {
    id: api?.id ?? '',
    name: api?.name ?? '',
    description: api?.description ?? '',
    phone: api?.phone_contact ?? undefined,
    address: api?.address ?? undefined,
    isActive: api?.is_active ?? true,
    url: api?.website_url ?? undefined,
    category: {
      id: category.id || category.name || 'unknown',
      name: category.name ?? 'Unknown',
      icon: category.icon ?? 'grid',
      type: api?.type ?? '',
    },
  };
};
