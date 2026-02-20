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
