package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/handlers"
)
// Controller: Set All the routes
func Controller(router *gin.Engine) {
	router.POST("/login", handlers.Repo.Login)
	StudentController(router)
	TeacherController(router)
	AdminController(router)
}