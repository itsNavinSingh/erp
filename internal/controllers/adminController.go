package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/handlers"
	"github.com/itsNavinSingh/erp/internal/middleware"
)

// AdminController: All the routes related to Admin
func AdminController(router *gin.Engine){
	admin := router.Group("/api/admin")
	admin.Use(middleware.RoleAuth("admin"))
	{
		// for fetching his details
		admin.GET("/me", handlers.Repo.MyDetails)

		// for Departments
		admin.GET("/department", handlers.Repo.GetDepartments)
		admin.POST("/department", handlers.Repo.AddDepartments)
		admin.DELETE("/department", handlers.Repo.DeleteDepartments)
		admin.PATCH("/department", handlers.Repo.EditDepartment)

		// for User
		admin.GET("/user", handlers.Repo.ViewUsers)
		admin.POST("/user", handlers.Repo.AddUser)
		admin.PATCH("/user", handlers.Repo.EditUser)
		admin.DELETE("/user", handlers.Repo.DeleteUser)

		// for Teacher
		admin.GET("/teacher", handlers.Repo.ViewTeachers)
		admin.POST("/teacher", handlers.Repo.AddTeacher)
		admin.DELETE("/teacher", handlers.Repo.DeleteTeacher)
		admin.PATCH("/teacher", handlers.Repo.EditTeacher)

		// for Course
		admin.GET("/course", handlers.Repo.ViewCourses)
		admin.POST("/course", handlers.Repo.AddCourse)
		admin.PATCH("/course", handlers.Repo.EditCourse)
		admin.DELETE("/course", handlers.Repo.DeleteCourse)

		// for Paper
		admin.GET("/paper", handlers.Repo.ViewPapers)
		admin.POST("/paper", handlers.Repo.AddPaper)
		admin.PATCH("/paper", handlers.Repo.EditPaper)
		admin.DELETE("/paper", handlers.Repo.DeletePaper)
	}
}