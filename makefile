db-migrate:
	@echo "Migrating database"
	@for file in ./migration/*; do \
		echo "Running migration: $$file"; \
		open $$file; \
		[ -e "$$file" ] || continue; \
		docker container run --env PGPASSWORD=aus2025 -v `pwd`/migration:/sql/migration --rm --network=web --platform linux/amd64 postgis/postgis:16-3.4-alpine psql -h postgres-aus -p 5432 -U aus-user -d aus -f /sql/migration/$$(basename $$file); \
	done
