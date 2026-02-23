package config

import (
    "log"
    "os"
    "github.com/joho/godotenv"
)

type Config struct {
    DBDSN string
}

func LoadConfig() *Config {
    err := godotenv.Load()
    if err != nil {
        log.Println("Warning: .env file not found")
    }

    dsn := os.Getenv("DATABASE_URL") 
    if dsn == "" {
        dsn = "host=" + os.Getenv("DB_HOST") + ... 
    }

    return &Config{DBDSN: dsn}
}