package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/handlers"
)

func Controller(router *gin.Engine) {
	router.POST("/login", handlers.Repo.Login)
}
func StudentController(router *gin.Engine){}
func TeacherController(router *gin.Engine){}
func AdminController(router *gin.Engine){}