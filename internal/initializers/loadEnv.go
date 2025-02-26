package initializers

import "github.com/joho/godotenv"

// LoadENV: Load all the local environment variables stored in .env file
func LoadENV() error {
	return godotenv.Load(".env")
}