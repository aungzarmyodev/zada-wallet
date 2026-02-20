import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmzrkquurlnhgpgisfam.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtenJrcXV1cmxuaGdwZ2lzZmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDMzNDYsImV4cCI6MjA4NjM3OTM0Nn0.ysF1g-0Y87MAktMNWaQ2qjrQ1acX-hXMrO2nflgN5yk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
