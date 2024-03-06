import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://fynlitghhrpyrfxxfswl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5bmxpdGdoaHJweXJmeHhmc3dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3NDg3MTksImV4cCI6MjAyNTMyNDcxOX0.ivo614aE-p48Uu12rHTURRH_3lVVmZeR0J0yOPZp-Aw')