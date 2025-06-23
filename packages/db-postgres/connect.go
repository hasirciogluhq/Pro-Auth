package dbpostgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

func ConnectPostgres(ctx context.Context, dsn string) (*pgxpool.Pool, error) {
	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		return nil, err
	}
	db, err := pgxpool.NewWithConfig(ctx, config)
	return db, err
}
