package dbconn

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

// ConnectDB initializes PostgreSQL using PGX only
func ConnectDB() {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASSWORD")
	name := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		user, pass, host, port, name,
	)

	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		panic("❌ Failed to parse PGX config: " + err.Error())
	}

	// Pool tuning
	config.MaxConns = 15
	config.MinConns = 2
	config.MaxConnIdleTime = 10 * time.Minute
	config.MaxConnLifetime = 1 * time.Hour

	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		panic("❌ PGX pool connection failed: " + err.Error())
	}

	Pool = pool
	fmt.Println("✅ Database connected (PGX only)")
}

// CloseDB closes pgx pool
func CloseDB() {
	if Pool != nil {
		Pool.Close()
	}
}
