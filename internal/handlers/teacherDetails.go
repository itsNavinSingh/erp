package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
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
			"Msg":  result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	for i, teacher := range teachers {
		ResData[i] = models.ViewTeacherApi{
			ID:           teacher.ID,
			UserID:       teacher.UserID,
			Email:        teacher.User.Email,
			Prefix:       teacher.Prefix,
			Name:         teacher.User.Name,
			Phone:        teacher.Phone,
			DepartmentID: teacher.DepartmentID,
			Department:   teacher.Department.Name,
		}
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  "Teacher Data fetched successfully",
		"Data": ResData,
	})
}

// AddTeacher: Add teacher info
func (m *Repository) AddTeacher(ctx *gin.Context) {
	var ReqData models.AddTeacherApi
	var ResData models.ViewTeacherApi

	if err := ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		return
	}

	tx := m.App.Database.Begin()
	if tx.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Failed to start transection",
			"Data": ResData,
		})
		return
	}

	Newteacher := models.Teacher{
		UserID:       ReqData.UserID,
		Prefix:       ReqData.Prefix,
		Phone:        ReqData.Phone,
		DepartmentID: ReqData.DepartmentID,
	}

	if err := tx.Create(&Newteacher).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err := tx.Preload("Department").Preload("User").First(&Newteacher, Newteacher.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err := tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewTeacherApi{
		ID:           Newteacher.ID,
		UserID:       Newteacher.UserID,
		Email:        Newteacher.User.Email,
		Prefix:       Newteacher.Prefix,
		Name:         Newteacher.User.Name,
		Phone:        Newteacher.Phone,
		DepartmentID: Newteacher.DepartmentID,
		Department:   Newteacher.Department.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  "Teacher created successfully",
		"Data": ResData,
	})
}

// EditTeacher: Edit Teacher Information
func (m *Repository) EditTeacher(ctx *gin.Context) {
	var (
		ReqData models.EditTeacherApi
		ResData models.ViewTeacherApi
		teacher models.Teacher
		err     error
	)
	if err = ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		return
	}
	tx := m.App.Database.Begin()
	if tx.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Failed to start database transection",
			"Data": ResData,
		})
		return
	}
	if err = tx.First(&teacher, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg":  fmt.Sprintf("Teacher not found with ID = %d", ReqData.ID),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Model(&teacher).Updates(models.Teacher{
		ID:           ReqData.ID,
		UserID:       ReqData.UserID,
		Prefix:       ReqData.Prefix,
		Phone:        ReqData.Phone,
		DepartmentID: ReqData.DepartmentID,
	}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Failed to Update Teacher Data",
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Preload("User").Preload("Department").First(&teacher, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Failed to make changes in teacher data",
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewTeacherApi{
		ID:           teacher.ID,
		UserID:       teacher.UserID,
		Email:        teacher.User.Email,
		Prefix:       teacher.Prefix,
		Name:         teacher.User.Name,
		Phone:        teacher.Phone,
		DepartmentID: teacher.DepartmentID,
		Department:   teacher.Department.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  "Teacher Updated Successfully",
		"Data": ResData,
	})
}

// DeleteTeacher: Delete a teacher information
func (m *Repository) DeleteTeacher(ctx *gin.Context) {
	var (
		ReqData models.EditTeacherApi
		ResData models.ViewTeacherApi
		teacher models.Teacher
		err     error
	)
	if err = ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		return
	}
	tx := m.App.Database.Begin()
	if tx.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Failed to start database transcetion",
			"Data": ResData,
		})
		return
	}
	teacher = models.Teacher{
		ID:           ReqData.ID,
		UserID:       ReqData.UserID,
		Prefix:       ReqData.Prefix,
		Phone:        ReqData.Phone,
		DepartmentID: ReqData.DepartmentID,
	}
	if err = tx.Preload("User").Preload("Department").Where(&teacher).First(&teacher).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Delete(&teacher).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Failed to delete teacher",
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewTeacherApi{
		ID:           teacher.ID,
		UserID:       teacher.UserID,
		Email:        teacher.User.Email,
		Prefix:       teacher.Prefix,
		Name:         teacher.User.Name,
		Phone:        teacher.Phone,
		DepartmentID: teacher.DepartmentID,
		Department:   teacher.Department.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  "Teacher Deleted Successfully",
		"Data": ResData,
	})
}
