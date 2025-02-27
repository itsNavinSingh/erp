package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

// GetDepartments: Shows all the departments
func (m *Repository) GetDepartments(ctx *gin.Context) {
	var departments []models.Department
	result := m.App.Database.Find(&departments)
	if result.Error != nil {
		if result.Error != gorm.ErrRecordNotFound {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"Msg": "Something went wrong",
				"Data": []models.DepartmentApi{},
			})
			return
		}
	}
	response := make([]models.DepartmentApi, len(departments))
	for i, dept := range departments {
		response[i] = models.DepartmentApi(dept)
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Successfully fetched all the departments",
		"Data": response,
	})
}

// AddDepartments: Add the department data
func (m *Repository) AddDepartments(ctx *gin.Context) {
	var ReqData []models.DepartmentApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": []models.DepartmentApi{},
		})
		return
	}
	NewDept := make([]models.Department, len(ReqData))
	for i, dept := range ReqData {
		NewDept[i].Name = dept.Name
	}
	result := m.App.Database.Create(&NewDept)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": []models.DepartmentApi{},
		})
		return
	}
	for i, Newdept := range NewDept {
		ReqData[i] = models.DepartmentApi(Newdept)
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Department added Successfully",
		"Data": ReqData,
	})
}

// DeleteDepartments: Delete the given department
func (m *Repository) DeleteDepartments(ctx *gin.Context) {
	var ReqData []models.DepartmentApi

	err := ctx.ShouldBindJSON(&ReqData)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": []string{},
		})
		return
	}
	var depts []string

	for _, dept := range ReqData {
		if dept.Name != "" {
			depts = append(depts, dept.Name)
		}
	}

	result := m.App.Database.Where("name IN ?", depts).Delete(&models.Department{})
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg": result.Error.Error(),
			"Data": []string{},
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"Msg": fmt.Sprintf("Departments deleted successfully. RowsAffected: %d", result.RowsAffected),
		"Data": depts,
	})
}

// EditDepartment: Edit the given department
func (m *Repository) EditDepartment(ctx *gin.Context) {
	var ReqData models.DepartmentApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.DepartmentApi{},
		})
		return
	}

	var department models.Department
	if m.App.Database.First(&department, ReqData.ID).Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": fmt.Sprintf("Department not found with ID = %d", ReqData.ID),
			"Data": models.DepartmentApi{},
		})
		return
	}
	result := m.App.Database.Model(&department).Updates(models.Department(ReqData))
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": "Failed to Update Department",
			"Data": models.DepartmentApi{},
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": fmt.Sprintf("Department Updated Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": ReqData,
	})
}