package initializers

import (
	"os"

	"github.com/itsNavinSingh/erp/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDB(app *config.AppConfig) error {
	var err error
	app.Database, err = gorm.Open(postgres.Open(os.Getenv("DB_INFO")), &gorm.Config{})
	return err
}