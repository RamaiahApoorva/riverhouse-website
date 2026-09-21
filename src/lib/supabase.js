import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmcoslvgusbrwltdgpta.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tY29zbHZndXNicndsdGRncHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NTMwODcsImV4cCI6MjEwNTEyOTA4N30.KqjfB2vekdbpw2acoYgrsWte6P_j14Rq_c4c7ZtOxUc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
