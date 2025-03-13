package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/handlers"
	"github.com/itsNavinSingh/erp/internal/middleware"
)

// StudentController: All the routes related to Student
func StudentController(router *gin.Engine){
	student := router.Group("/api/student")
	student.Use(middleware.RoleAuth("Student"))
	{
		student.GET("/me", handlers.Repo.MyDetails)
	}
}