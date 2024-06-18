ALTER TABLE candidat_offres
ADD COLUMN IF NOT EXISTS date DATE DEFAULT (current_date + (random() * 365)::integer);