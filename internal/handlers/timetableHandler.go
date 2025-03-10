package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

func (m *Repository) ViewTimetable(ctx *gin.Context) {
	var timetables []models.TimeTable

	result := m.App.Database.Preload("Class").Preload("Paper").Preload("Teacher").Preload("User").Find(&timetables)
	ResData := make([]models.ViewTimetableApi, 0, len(timetables))
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	for i, timetable := range timetables {
		ResData[i] = models.ViewTimetableApi{
			ID: timetable.ID,
			ClassID: timetable.ClassID,
			PaperID: timetable.Class.PaperID,
			Paper: timetable.Class.Paper.Name,
			TeacherID: timetable.Class.TeacherID,
			Teacher: timetable.Class.Teacher.User.Name,
			ClassType: timetable.Class.Type,
			Day: timetable.Day,
			Location: timetable.Location,
			Start: timetable.Start,
		}
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Timetable fetched successfully",
		"Data": ResData,
	})
}
func (m *Repository) AddTimetable(ctx *gin.Context) {
	var (
		ReqData models.ViewTimetableApi
		ResData models.ViewTimetableApi
		timetable models.TimeTable
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
	timetable = models.TimeTable{
		ClassID: ReqData.ClassID,
		Day: ReqData.Day,
		Location: ReqData.Location,
		Start: ReqData.Start,
	}
	if err = tx.Create(&timetable).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Preload("Class").Preload("Paper").Preload("Teacher").Preload("User").Find(&timetable).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "failed to create timetable",
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to save timetable",
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewTimetableApi{
		ID: timetable.ID,
		ClassID: timetable.ClassID,
		PaperID: timetable.Class.PaperID,
		Paper: timetable.Class.Paper.Name,
		TeacherID: timetable.Class.TeacherID,
		Teacher: timetable.Class.Teacher.User.Name,
		ClassType: timetable.Class.Type,
		Day: timetable.Day,
		Location: timetable.Location,
		Start: timetable.Start,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Timetable data created successfully",
		"Data": ResData,
	})
}
func (m *Repository) EditTimetable(ctx *gin.Context) {
	var (
		ReqData models.EditTimetableApi
		ResData models.ViewTimetableApi
		timetable models.TimeTable
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
			"Msg": "failed to start database transection",
			"Data": ResData,
		})
		return
	}
	if err = tx.First(&timetable, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": fmt.Sprintf("Timetable not found with ID = %d", ReqData.ID),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Model(&timetable).Updates(models.TimeTable{
		ClassID: ReqData.ClassID,
		Day: ReqData.Day,
		Location: ReqData.Location,
		Start: ReqData.Start,
	}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to update timetable data",
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Preload("Class").Preload("Paper").Preload("Teacher").Preload("User").Find(&timetable, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to save changes",
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewTimetableApi{
		ID: timetable.ID,
		ClassID: timetable.ClassID,
		PaperID: timetable.Class.PaperID,
		Paper: timetable.Class.Paper.Name,
		TeacherID: timetable.Class.TeacherID,
		Teacher: timetable.Class.Teacher.User.Name,
		ClassType: timetable.Class.Type,
		Day: timetable.Day,
		Location: timetable.Location,
		Start: timetable.Start,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Timetable data saved successfully",
		"Data": ResData,
	})
}
func (m *Repository) DeleteTimetable(ctx *gin.Context) {
	var (
		ReqData models.EditTimetableApi
		ResData models.ViewTimetableApi
		timetable models.TimeTable
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
	if err = tx.Preload("Class").Preload("Paper").Preload("Teacher").Preload("User").Find(&timetable, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": fmt.Sprintf("Timetable record not found with ID = %d", ResData.ID),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Delete(&timetable).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to delete timetable data",
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to delete timetable data!",
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewTimetableApi{
		ID: timetable.ID,
		ClassID: timetable.ClassID,
		PaperID: timetable.Class.PaperID,
		Paper: timetable.Class.Paper.Name,
		TeacherID: timetable.Class.TeacherID,
		Teacher: timetable.Class.Teacher.User.Name,
		ClassType: timetable.Class.Type,
		Day: timetable.Day,
		Location: timetable.Location,
		Start: timetable.Start,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Timetable data deleted successfully",
		"Data": ResData,
	})
}