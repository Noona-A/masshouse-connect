-- Create meter_readings table
CREATE TABLE public.meter_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resident_name TEXT NOT NULL,
  flat_number TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  meter_type TEXT NOT NULL CHECK (meter_type IN ('electricity', 'gas', 'water')),
  preferred_date DATE,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  admin_notes TEXT,
  scheduled_date DATE,
  reading_value TEXT,
  completed_by UUID,
  reference_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.meter_readings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can view all meter readings"
  ON public.meter_readings FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update meter readings"
  ON public.meter_readings FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete meter readings"
  ON public.meter_readings FOR DELETE
  USING (is_admin());

CREATE POLICY "Anyone can insert meter readings"
  ON public.meter_readings FOR INSERT
  WITH CHECK (true);

-- Function to generate meter reading reference
CREATE OR REPLACE FUNCTION public.generate_meter_reference()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_ref TEXT;
  ref_exists BOOLEAN;
  date_part TEXT;
  seq_num TEXT;
BEGIN
  date_part := TO_CHAR(NOW(), 'YYMMDD');
  LOOP
    seq_num := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    new_ref := 'MTR-' || date_part || '-' || seq_num;
    SELECT EXISTS(SELECT 1 FROM public.meter_readings WHERE reference_number = new_ref) INTO ref_exists;
    EXIT WHEN NOT ref_exists;
  END LOOP;
  RETURN new_ref;
END;
$$;

-- Trigger for updated_at
CREATE TRIGGER update_meter_readings_updated_at
  BEFORE UPDATE ON public.meter_readings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();