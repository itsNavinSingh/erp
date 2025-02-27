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
				"msg": "Something went wrong",
				"data": []models.DepartmentApi{},
			})
			return
		}
	}
	response := make([]models.DepartmentApi, len(departments))
	for i, dept := range departments {
		response[i] = models.DepartmentApi(dept)
	}
	ctx.JSON(http.StatusOK, gin.H{
		"msg": "Successfully fetched all the departments",
		"data": response,
	})
}

// AddDepartments: Add the department data
func (m *Repository) AddDepartments(ctx *gin.Context) {
	var ReqData []models.DepartmentApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"msg": err.Error(),
			"data": []models.DepartmentApi{},
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
			"msg": result.Error.Error(),
			"data": []models.DepartmentApi{},
		})
		return
	}
	for i, Newdept := range NewDept {
		ReqData[i] = models.DepartmentApi(Newdept)
	}
	ctx.JSON(http.StatusOK, gin.H{
		"msg": "Department added Successfully",
		"data": ReqData,
	})
}

// DeleteDepartments: Delete the given department
func (m *Repository) DeleteDepartments(ctx *gin.Context) {
	var ReqData []models.DepartmentApi

	err := ctx.ShouldBindJSON(&ReqData)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"msg": err.Error(),
			"data": []string{},
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
			"msg": result.Error.Error(),
			"data": []string{},
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"msg": fmt.Sprintf("Departments deleted successfully. RowsAffected: %d", result.RowsAffected),
		"data": depts,
	})
}

// EditDepartment: Edit the given department
func (m *Repository) EditDepartment(ctx *gin.Context) {
	var ReqData models.DepartmentApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"msg": err.Error(),
			"data": models.DepartmentApi{},
		})
		return
	}

	var department models.Department
	if m.App.Database.First(&department, ReqData.ID).Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"msg": fmt.Sprintf("Department not found with ID = %d", ReqData.ID),
			"data": models.DepartmentApi{},
		})
		return
	}
	result := m.App.Database.Model(&department).Updates(models.Department(ReqData))
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"msg": "Failed to Update Department",
			"data": models.DepartmentApi{},
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"msg": fmt.Sprintf("Department Updated Successfully. RowsAffected: %d", result.RowsAffected),
		"data": ReqData,
	})
}