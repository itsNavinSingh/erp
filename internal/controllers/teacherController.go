package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/handlers"
	"github.com/itsNavinSingh/erp/internal/middleware"
)

// TeacherController: All the routes related to Teacher
func TeacherController(router *gin.Engine){
	teacher := router.Group("/api/teacher")
	teacher.Use(middleware.RoleAuth("Teacher"))
	{
		teacher.GET("/me", handlers.Repo.MyDetails)
	}
}