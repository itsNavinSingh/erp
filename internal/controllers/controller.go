package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/handlers"
	"github.com/itsNavinSingh/erp/internal/middleware"
)
// Controller: Set All the routes
func Controller(router *gin.Engine) {
	router.POST("/login", handlers.Repo.Login)
	StudentController(router)
	TeacherController(router)
	AdminController(router)
}

// StudentController: All the routes related to Student
func StudentController(router *gin.Engine){
	student := router.Group("/api/student")
	student.Use(middleware.RoleAuth("student"))
	{
		student.GET("/userDetails", handlers.Repo.UserDetails)
	}
}

// TeacherController: All the routes related to Teacher
func TeacherController(router *gin.Engine){
	teacher := router.Group("/api/teacher")
	teacher.Use(middleware.RoleAuth("teacher"))
	{
		teacher.GET("/userDetails", handlers.Repo.UserDetails)
	}
}

// AdminController: All the routes related to Admin
func AdminController(router *gin.Engine){
	admin := router.Group("/api/admin")
	admin.Use(middleware.RoleAuth("admin"))
	{
		admin.GET("/userDetails", handlers.Repo.UserDetails)
	}
}