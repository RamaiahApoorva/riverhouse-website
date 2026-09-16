import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ttkiylxbficyjdnkcqds.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0a2l5bHhiZmljeWpkbmtjcWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyODc2ODUsImV4cCI6MjEwNDg2MzY4NX0.s1Rl37xaBtKoGYqpYt61b31R0kGY_xJr26R1sqoEgbg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
