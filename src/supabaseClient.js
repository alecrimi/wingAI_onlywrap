import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://stuwewruttnziomoxmqb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dXdld3J1dHRuemlvbW94bXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MTEzMjEsImV4cCI6MjAzNjI4NzMyMX0.yRHBnUJxeyqHN9t7dzQ0mBho8kILbr9txVapnw1ED0k';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
