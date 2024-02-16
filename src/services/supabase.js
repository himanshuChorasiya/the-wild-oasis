
import { createClient } from '@supabase/supabase-js'
 export const supabaseUrl = 'https://kahcnctlsoejhhagkdvq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthaGNuY3Rsc29lamhoYWdrZHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NDg1MTMsImV4cCI6MjAyMjQyNDUxM30._TvzvE7criHtNYixWujJcgrqf0LNAX9RcFa0zyiJQp8";
 const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    
  }
//const supabase = createClient(supabaseUrl, supabaseKey, {global: {headers: corsHeaders}})
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;