package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/handlers"
	"github.com/itsNavinSingh/erp/internal/middleware"
)

func Controller(router *gin.Engine) {
	router.POST("/login", handlers.Repo.Login)
	StudentController(router)
	TeacherController(router)
	AdminController(router)
}
func StudentController(router *gin.Engine){
	student := router.Group("/api/student")
	student.Use(middleware.RoleAuth("student"))
	{
		student.GET("/userDetails", handlers.Repo.UserDetails)
	}
}
func TeacherController(router *gin.Engine){
	teacher := router.Group("/api/teacher")
	teacher.Use(middleware.RoleAuth("teacher"))
	{
		teacher.GET("/userDetails", handlers.Repo.UserDetails)
	}
}
func AdminController(router *gin.Engine){
	admin := router.Group("/api/admin")
	admin.Use(middleware.RoleAuth("admin"))
	{
		admin.GET("/userDetails", handlers.Repo.UserDetails)
	}
}