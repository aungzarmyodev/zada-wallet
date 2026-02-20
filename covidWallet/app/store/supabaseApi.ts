import { supabase } from '../gateways/supabase';
import { mapResource, ResourceObj } from './services_and_resources/ServieAndResourceModels';

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

  // Fetch ports
  async getPorts() {
    const { data, error } = await supabase.from('port_guides').select('*').order('port_name');

    if (error) throw error;
    return data;
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
