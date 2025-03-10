package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

// ViewTeachers: View all the teacher details
func (m *Repository) ViewTeachers(ctx *gin.Context) {
	var teachers []models.Teacher
	result := m.App.Database.Preload("User").Preload("Department").Find(&teachers)
	ResData := make([]models.ViewTeacherApi, len(teachers))
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	for i, teacher := range teachers {
		ResData[i] = models.ViewTeacherApi{
			ID: teacher.ID,
			Email: teacher.User.Email,
			Prefix: teacher.Prefix,
			Name: teacher.User.Name,
			Phone: teacher.Phone,
			Department: teacher.Department.Name,
		}
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Teacher Data fetched successfully",
		"Data": ResData,
	})
}
// AddTeacher: Add teacher info
func (m *Repository) AddTeacher(ctx *gin.Context) {
	var ReqData models.AddTeacherApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.AddTeacherApi{},
		})
		return
	}
	validate := ctx.MustGet("validator").(*validator.Validate)
	if err = validate.Struct(ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.AddTeacherApi{},
		})
		return
	}
	Newteacher := models.Teacher{
		UserID: ReqData.UserID,
		Prefix: ReqData.Prefix,
		Phone: ReqData.Phone,
		DepartmentID: ReqData.DepartmentID,
	}
	result := m.App.Database.Create(&Newteacher)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": models.AddTeacherApi{},
		})
		return
	}
	ReqData.ID = Newteacher.ID
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Teacher created successfully",
		"Data": ReqData,
	})
}
// EditTeacher: Edit Teacher Information
func (m *Repository) EditTeacher(ctx *gin.Context) {
	var ReqData models.EditTeacherApi
	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": "Invalid Data",
			"Data": models.EditTeacherApi{},
		})
		return
	}
	var teacher models.Teacher
	result := m.App.Database.First(&teacher, ReqData.ID)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": fmt.Sprintf("Teacher not found with ID = %d", ReqData.ID),
			"Data": models.EditTeacherApi{},
		})
		return
	}

	result = m.App.Database.Model(&teacher).Updates(models.Teacher{UserID: ReqData.UserID, Prefix: ReqData.Prefix, Phone: ReqData.Phone, DepartmentID: ReqData.DepartmentID})
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to Update Teacher Data",
			"Data": models.EditTeacherApi{},
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": fmt.Sprintf("Teacher Updated Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": ReqData,
	})
}
// DeleteTeacher: Delete a teacher information
func (m *Repository) DeleteTeacher(ctx *gin.Context) {
	var ReqData models.EditTeacherApi
	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.ViewTeacherApi{},
		})
		return
	}
	teacher := models.Teacher{
		ID: ReqData.ID,
		UserID: ReqData.UserID,
		Prefix: ReqData.Prefix,
		Phone: ReqData.Phone,
		DepartmentID: ReqData.DepartmentID,
	}
	result := m.App.Database.Preload("User").Preload("Department").Where(&teacher).First(&teacher)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": result.Error.Error(),
			"Data": models.ViewTeacherApi{},
		})
		return
	}
	result = m.App.Database.Delete(&teacher)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": models.ViewTeacherApi{},
		})
		return
	}
	ResData := models.ViewTeacherApi{
		ID: teacher.ID,
		Email: teacher.User.Email,
		Prefix: teacher.Prefix,
		Name: teacher.User.Name,
		Phone: teacher.Phone,
		Department: teacher.Department.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": fmt.Sprintf("Teacher Deleted Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": ResData,
	})
}