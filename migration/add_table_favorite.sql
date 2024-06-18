CREATE TABLE IF NOT EXISTS favorite(
    candidat_id integer NOT NULL,
    offre_id integer NOT NULL,
    add_date timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT favorite_candidat_id_fkey FOREIGN key(candidat_id) REFERENCES candidat(id),
    CONSTRAINT favorite_offre_id_fkey FOREIGN key(offre_id) REFERENCES offre(id)
);