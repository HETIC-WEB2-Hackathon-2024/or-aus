ALTER TABLE offre
ADD COLUMN IF NOT EXISTS date DATE DEFAULT (current_date + (random() * 365)::integer);