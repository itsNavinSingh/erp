package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

func (m *Repository) ViewCourses(ctx *gin.Context) {
	var courses []models.Course

	result := m.App.Database.Preload("Department").Find(&courses)
	ResData := make([]models.ViewCourseApi, len(courses))

	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	for i, course := range courses {
		ResData[i] = models.ViewCourseApi{
			ID: course.ID,
			Name: course.Name,
			DepartmentID: course.DepartmentID,
			Department: course.Department.Name,
		}
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Course data fetched successfully",
		"Data": ResData,
	})
}
func (m *Repository) AddCourse(ctx *gin.Context) {
	var ReqData models.ViewCourseApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.ViewCourseApi{},
		})
		return
	}
	Newcourse := models.Course{
		Name: ReqData.Name,
		DepartmentID: ReqData.DepartmentID,
	}
	result := m.App.Database.Create(&Newcourse)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": models.ViewCourseApi{},
		})
		return
	}
	ReqData.ID = Newcourse.ID
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Course created successfully",
		"Data": ReqData,
	})
}
func (m *Repository) EditCourse(ctx *gin.Context) {
	var ReqData models.EditCourseApi

	if err := ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.EditCourseApi{},
		})
		return
	}
	var course models.Course
	result := m.App.Database.First(&course, ReqData.ID)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": fmt.Sprintf("Course not found with ID = %d", ReqData.ID),
			"Data": models.EditCourseApi{},
		})
		return
	}
	result = m.App.Database.Model(&course).Updates(models.Course{Name: ReqData.Name, DepartmentID: ReqData.DepartmentID})
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": "Failed to Update Course Data",
			"Data": models.EditCourseApi{},
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": fmt.Sprintf("Course Updated Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": ReqData,
	})
}
func (m *Repository) DeleteCourse(ctx *gin.Context) {
	var ReqData models.EditCourseApi
	if err := ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.EditCourseApi{},
		})
		return
	}
	course := models.Course{
		ID: ReqData.ID,
		Name: ReqData.Name,
		DepartmentID: ReqData.DepartmentID,
	}
	result := m.App.Database.Where(&course).First(&course)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": result.Error.Error(),
			"Data": models.EditCourseApi{},
		})
		return
	}
	result = m.App.Database.Delete(&course)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": models.EditCourseApi{},
		})
		return
	}
	ReqData.DepartmentID = course.DepartmentID
	ReqData.Name = course.Name
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": fmt.Sprintf("Course Deleted Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": ReqData,
	})
}