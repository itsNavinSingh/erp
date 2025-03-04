package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/config"
	"github.com/itsNavinSingh/erp/internal/controllers"
	"github.com/itsNavinSingh/erp/internal/customvalidators"
	"github.com/itsNavinSingh/erp/internal/handlers"
	"github.com/itsNavinSingh/erp/internal/initializers"
)

func Init(app *config.AppConfig) error {
	var err error
	err = initializers.LoadENV()
	if err != nil {
		return err
	}
	app.JWTKey = []byte(os.Getenv("JWT_KEY"))
	err = initializers.ConnectToDB(app)
	if err != nil {
		return err
	}
	initializers.SyncMail(app)
	return initializers.SyncToDB(app)
}

func main() {
	var app config.AppConfig
	app.InProduction = false
	if err:=Init(&app); err != nil {
		log.Fatal(err)
	}
	config.SetGlobalConfig(&app)
	repo := handlers.NewRepo(&app)
	handlers.NewHandlers(repo)

	gin.SetMode(os.Getenv("GIN_MODE"))

	Route := gin.New()
	Route.Use(gin.Recovery())

	customvalidators.RegisterCustomValidators(Route)
	controllers.Controller(Route)
	Route.Run(":" + os.Getenv("PORT"))
}