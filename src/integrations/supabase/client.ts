// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://upevgzdmtefdmgtnrkcx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZXZnemRtdGVmZG1ndG5ya2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDU3ODksImV4cCI6MjA2NDM4MTc4OX0._o4F6JZJ1_lQvUjErla5q06olWIbzo6x0k6Dg5qI63Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);