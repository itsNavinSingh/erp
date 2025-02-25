package initializers

import (
	"github.com/itsNavinSingh/erp/internal/config"
	"github.com/itsNavinSingh/erp/internal/models"
)

func SyncToDB(app *config.AppConfig) error {
	return app.Database.AutoMigrate(
		&models.User{},
		&models.Department{},
		&models.Teacher{},
		&models.Course{},
		&models.Paper{},
		&models.Student{},
		&models.Score{},
		&models.Class{},
		&models.StudentPaper{},
		&models.TimeTable{},
		&models.Attendence{},
	)
}
