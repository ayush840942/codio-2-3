import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'

const envConfig = dotenv.parse(fs.readFileSync('.env'))
const supabase = createClient(envConfig.VITE_SUPABASE_URL, envConfig.VITE_SUPABASE_ANON_KEY)

async function run() {
    console.log("Supabase URL configured:", envConfig.VITE_SUPABASE_URL)
    const { data, error } = await supabase.from('profiles').select('id').limit(1)
    if (error) {
        console.error("Profiles error:", error)
    } else {
        console.log("Profiles access ok:", data)
    }
}
run()
