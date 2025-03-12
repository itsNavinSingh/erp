package controllers

import (
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/handlers"
	"github.com/itsNavinSingh/erp/internal/middleware"
)

// Controller: Set All the routes
func Controller(router *gin.Engine) {

	buildPath := filepath.Join("client", "dist")
	router.Static("/assets", filepath.Join(buildPath, "assets"))
	router.GET("/", func(ctx *gin.Context) {
		ctx.File(filepath.Join(buildPath, "index.html"))
	})
	
	router.POST("/login", handlers.Repo.Login)
	router.GET("/validate", middleware.RequireAuth, handlers.Repo.Validate)
	StudentController(router)
	TeacherController(router)
	AdminController(router)
}