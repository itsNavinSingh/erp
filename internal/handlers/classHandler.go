package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

func (m *Repository) ViewClass(ctx *gin.Context) {
	var classes []models.Class
	
	result := m.App.Database.Preload("Paper").Preload("Teacher").Preload("User").Find(&classes)
	ResData := make([]models.ViewClassApi, 0, len(classes))

	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	for i, class := range classes {
		ResData[i] = models.ViewClassApi{
			ID: class.ID,
			PaperID: class.PaperID,
			Paper: class.Paper.Name,
			Type: class.Type,
			TeacherID: class.TeacherID,
			Teacher: class.Teacher.User.Name,
		}
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Class data fetched successfully",
		"Data": ResData,
	})

}
func (m *Repository) AddClass(ctx *gin.Context) {
	var ReqData models.ViewClassApi
	var ResData models.ViewClassApi

	if err := ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}

	newClass := models.Class{
		PaperID: ReqData.PaperID,
		TeacherID: ReqData.TeacherID,
		Type: ReqData.Type,
	}
	tx := m.App.Database.Begin()
	if tx.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to start transection",
			"Data": ResData,
		})
		return
	}
	if err := tx.Create(&newClass).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err := tx.Preload("Paper").Preload("Teacher").Preload("User").First(&newClass, newClass.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err := tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewClassApi{
		ID: newClass.ID,
		PaperID: newClass.PaperID,
		Paper: newClass.Paper.Name,
		Type: newClass.Type,
		TeacherID: newClass.TeacherID,
		Teacher: newClass.Teacher.User.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Class Created successfully",
		"Data": ResData,
	})
}
func (m *Repository) EditClass(ctx *gin.Context) {
	var (
		ReqData models.EditClassApi
		ResData models.ViewClassApi
		class models.Class
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
	if err = tx.First(&class, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": fmt.Sprintf("Class not found with ID = %d", ReqData.ID),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Model(&class).Updates(models.Class{
		ID: ReqData.ID,
		PaperID: ReqData.PaperID,
		TeacherID: ReqData.TeacherID,
		Type: ReqData.Type,
	}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to update paper data",
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Preload("Paper").Preload("Teacher").Preload("User").First(&class, ReqData.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		tx.Rollback()
		return
	}
	if err = tx.Commit().Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": "Failed to make changes in class data",
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewClassApi{
		ID: class.ID,
		PaperID: class.PaperID,
		Paper: class.Paper.Name,
		Type: class.Type,
		TeacherID: class.TeacherID,
		Teacher: class.Teacher.User.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Changes saved successfully",
		"Data": ResData,
	})
}
func (m *Repository) DeleteClass(ctx *gin.Context) {
	var (
		ReqData models.EditClassApi
		ResData models.ViewClassApi
		err error
		class models.Class
	)
	if err = ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}
	class = models.Class{
		ID: ReqData.ID,
		PaperID: ReqData.PaperID,
		TeacherID: ReqData.TeacherID,
	}
	if err = m.App.Database.Preload("Paper").Preload("Teacher").Preload("User").Where(&class).First(&class).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}
	if err = m.App.Database.Delete(&class).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": err.Error(),
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewClassApi{
		ID: class.ID,
		PaperID: class.PaperID,
		Paper: class.Paper.Name,
		TeacherID: class.TeacherID,
		Teacher: class.Teacher.User.Name,
		Type: class.Type,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Class Data deleted successfully.",
		"Data": ResData,
	})
}