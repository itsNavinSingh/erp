package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

func (m *Repository) ViewStudentPaper(ctx *gin.Context) {
	var studentPapers []models.StudentPaper

	result := m.App.Database.Preload("Student.User").Preload("Paper").Find(&studentPapers)
	ResData := make([]models.ViewStudentPaperApi, 0, len(studentPapers))
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": ResData,
		})
		return
	}

	for i, studentPaper := range studentPapers {
		ResData[i] = models.ViewStudentPaperApi{
			ID: studentPaper.ID,
			StudentID: studentPaper.StudentID,
			Student: studentPaper.Student.User.Name,
			PaperID: studentPaper.PaperID,
			Paper: studentPaper.Paper.Name,
		}
	}

	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Student's Paper Data fetched successfully",
		"Data": ResData,
	})
}
func (m *Repository) AddStudentPaper(ctx *gin.Context) {
	var (
		ReqData models.ViewStudentPaperApi
		ResData models.ViewStudentPaperApi
		studentPaper models.StudentPaper
		err error
	)

	if err = ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}

	studentPaper = models.StudentPaper{
		StudentID: ReqData.StudentID,
		PaperID: ReqData.PaperID,
	}
	
	tx := m.App.Database.Begin()
	if tx.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to start database transection",
			"Data": ResData,
		})
		return
	}

	if err = tx.Create(&studentPaper).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}

	if err := tx.Preload("Student.User").Preload("Paper").First(&studentPaper, studentPaper.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}

	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}

	ResData = models.ViewStudentPaperApi{
		ID: studentPaper.ID,
		PaperID: studentPaper.PaperID,
		StudentID: studentPaper.StudentID,
		Paper: studentPaper.Paper.Name,
		Student: studentPaper.Student.User.Name,
	}

	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Student's Paper Created successfully",
		"Data": ResData,
	})
}
func (m *Repository) EditStudentPaper(ctx *gin.Context) {
	var (
		ReqData models.EditStudentPaperApi
		ResData models.ViewStudentPaperApi
		studentPaper models.StudentPaper
		err error
	)

	if err = ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}

	tx := m.App.Database.Begin()
	if tx.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to start database transection",
			"Data": ResData,
		})
		return
	}
	
	if err = tx.First(&studentPaper, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": fmt.Sprintf("Student's Paper not found with ID = %d", ReqData.ID),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}

	if err = tx.Model(&studentPaper).Updates(models.StudentPaper{
		ID: ReqData.ID,
		PaperID: ReqData.PaperID,
		StudentID: ReqData.StudentID,
	}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to update paper data",
			"Data": ResData,
		})
		tx.Rollback()
		return
	}

	if err = tx.Preload("Student.User").Preload("Paper").First(&studentPaper, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to make changes in the Student's Paper data",
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewStudentPaperApi{
		ID: studentPaper.ID,
		PaperID: studentPaper.PaperID,
		Paper: studentPaper.Paper.Name,
		StudentID: studentPaper.StudentID,
		Student: studentPaper.Student.User.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Changes saved successfully",
		"Data": ResData,
	})
}
func (m *Repository) DeleteStudentPaper(ctx *gin.Context) {
	var (
		ReqData models.EditStudentPaperApi
		ResData models.ViewStudentPaperApi
		studentPaper models.StudentPaper
		err error
	)
	if err = ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}
	tx := m.App.Database.Begin()
	if tx.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to start database transection",
			"Data": ResData,
		})
		return
	}
	if err = tx.Preload("Student.User").Preload("Paper").First(&studentPaper, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": fmt.Sprintf("Student's Paper not found with ID = %d", ReqData.ID),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Delete(&studentPaper).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to delete the Student's Paper",
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewStudentPaperApi{
		ID: studentPaper.ID,
		StudentID: studentPaper.StudentID,
		Student: studentPaper.Student.User.Name,
		PaperID: studentPaper.ID,
		Paper: studentPaper.Paper.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Student's Paper deleted successfully",
		"Data": ResData,
	})
}