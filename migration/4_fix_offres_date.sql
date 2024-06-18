UPDATE candidat_offres
SET date = current_date - (random() * 365)::integer
WHERE date > current_date;

UPDATE offre
SET date = current_date - (random() * 365)::integer
WHERE date > current_date;
