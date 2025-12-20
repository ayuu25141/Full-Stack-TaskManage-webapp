package dbconn

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

// ConnectDB initializes PostgreSQL using PGX with DATABASE_URL
func ConnectDB() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		panic("❌ DATABASE_URL is not set")
	}

	// parse PGX config from full URL
	config, err := pgxpool.ParseConfig(dbURL)
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
	fmt.Println("✅ Database connected (Neon PGX)")
}

// CloseDB closes PGX pool
func CloseDB() {
	if Pool != nil {
		Pool.Close()
	}
}
