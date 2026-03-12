-- THE METADATA BYPASS (v28)
-- Diagnostic trigger to isolate the source of "Database error granting user"
-- This trigger wipes metadata BEFORE it hits the database to see if the insert succeeds.

CREATE OR REPLACE FUNCTION public.diagnostic_metadata_wiper()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- WE TEMPORARILY WIPE THE METADATA
    -- If the sign-up succeeds with this active, we know the issue is a DB constraint or trigger on the metadata content.
    -- If it still fails, the issue is GoTrue itself or something earlier in the stack.
    NEW.raw_user_meta_data := '{}'::jsonb;
    RETURN NEW;
END;
$$;

-- ATTACH AS BEFORE INSERT (Highest priority)
DROP TRIGGER IF EXISTS a_diagnostic_metadata_wiper ON auth.users;
CREATE TRIGGER a_diagnostic_metadata_wiper
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.diagnostic_metadata_wiper();

-- Successfully applied THE METADATA BYPASS.
