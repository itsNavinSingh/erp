package initializers

import "github.com/joho/godotenv"

func LoadENV() error {
	return godotenv.Load(".env")
}