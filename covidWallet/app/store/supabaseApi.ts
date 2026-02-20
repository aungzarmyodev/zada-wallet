import { supabase } from '../gateways/supabase';
import {
  mapCategory,
  mapResource,
  mapService,
  ResourceObj,
} from './services_and_resources/ServieAndResourceModels';

export const SupabaseAPI = {
  // Fetch categories
  async getCategories() {
    const { data, error } = await supabase.from('categories').select('*').order('name');

    if (error) throw error;
    return data;
  },

  // Fetch services
  async getServices() {
    const { data, error } = await supabase
      .from('service_providers')
      .select('*, categories(name, icon_name)')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data;
  },

  async getCategoriesAndServices() {
    const [categoriesRaw, servicesRaw] = await Promise.all([
      this.getCategories(),
      this.getServices(),
    ]);

    const categories = (categoriesRaw ?? []).map(mapCategory);
    const services = (servicesRaw ?? []).map(mapService);

    const filteredCategories = categories.filter(c => c.type === 'service');

    return {
      categories: filteredCategories,
      services,
    };
  },

  // Fetch resources
  async getResources(): Promise<ResourceObj[]> {
    const { data, error } = await supabase
      .from('resources_tips')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error', error);
      throw error;
    }

    return (data ?? []).map(mapResource);
  },
};
