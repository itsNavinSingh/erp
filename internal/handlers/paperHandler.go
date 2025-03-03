package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

func (m *Repository) ViewPapers(ctx *gin.Context) {
	var papers []models.Paper

	result := m.App.Database.Preload("Department").Find(&papers)
	papersApi := make([]models.ViewPapersApi, len(papers))
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": papersApi,
		})
		return
	}
	for i, paper := range papers {
		papersApi[i] = models.ViewPapersApi{
			ID: paper.ID,
			Name: paper.Name,
			UPC: paper.UPC,
			Semister: paper.Semister,
			DepartmentID: paper.DepartmentID,
			Department: paper.Department.Name,
			Type: paper.Type,
			CreditL: paper.CreditL,
			CreditT: paper.CreditT,
			CreditP: paper.CreditP,
			Syllabus: paper.Syllabus,
		}
	}

	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Papers Fetched Successfully",
		"Data": papersApi,
	})
}
func (m *Repository) AddPaper(ctx *gin.Context) {
	var ReqData models.ViewPapersApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.ViewPapersApi{},
		})
		return
	}
	NewPaper := models.Paper{
		Name: ReqData.Name,
		UPC: ReqData.UPC,
		Semister: ReqData.Semister,
		DepartmentID: ReqData.DepartmentID,
		Type: ReqData.Type,
		CreditL: ReqData.CreditL,
		CreditP: ReqData.CreditP,
		CreditT: ReqData.CreditT,
	}
	result := m.App.Database.Create(&NewPaper)
	if result.Error !=  nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": models.ViewPapersApi{},
		})
		return
	}

	ReqData.ID = NewPaper.ID
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Teacher Created Successfully",
		"Data": ReqData,
	})
}
func (m *Repository) EditPaper(ctx *gin.Context) {}
func (m *Repository) DeletePaper(ctx *gin.Context) {}