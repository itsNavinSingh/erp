package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

func (m *Repository) ViewStudent(ctx *gin.Context) {
	var students []models.Student
	result := m.App.Database.Preload("User").Preload("Course").Find(&students)
	ResData := make([]models.ViewStudentApi, 0, len(students))
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	for i, student := range students {
		ResData[i] = models.ViewStudentApi{
			ID:             student.ID,
			UserID:         student.UserID,
			Name:           student.User.Name,
			Email:          student.User.Email,
			Dob:            student.Dob,
			Phone:          student.Phone,
			EnrollmentYear: student.EnrollmentYear,
			Semister:       student.Semister,
			CourseID:       student.CourseID,
			Course:         student.Course.Name,
		}
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  "Student Data fetched Successfully",
		"Data": ResData,
	})
}
func (m *Repository) AddStudent(ctx *gin.Context) {
	var ReqData models.ViewStudentApi
	if err := ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  err.Error(),
			"Data": models.ViewStudentApi{},
		})
		return
	}

	newStudent := models.Student{
		ID:             ReqData.ID,
		UserID:         ReqData.UserID,
		Dob:            ReqData.Dob,
		Phone:          ReqData.Phone,
		EnrollmentYear: ReqData.EnrollmentYear,
		Semister:       ReqData.Semister,
		CourseID:       ReqData.CourseID,
	}
	result := m.App.Database.Create(&newStudent)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  result.Error.Error(),
			"Data": models.ViewStudentApi{},
		})
		return
	}
	ReqData.ID = newStudent.ID
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  "Student created successfully",
		"Data": ReqData,
	})
}
// to do : use db transaction
func (m *Repository) EditStudent(ctx *gin.Context) {
	var ReqData models.EditStudentApi
	var ResData models.ViewStudentApi
	if err := ctx.ShouldBindJSON(ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		return
	}
	
	var student models.Student
	result := m.App.Database.First(&student, ReqData.ID)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg":  fmt.Sprintf("Student not found with ID = %d", ReqData.ID),
			"Data": ResData,
		})
		return
	}
	result = m.App.Database.Model(&student).Updates(models.Student{UserID: ReqData.UserID, Dob: ReqData.Dob, Phone: ReqData.Phone, EnrollmentYear: ReqData.EnrollmentYear, Semister: ReqData.Semister, CourseID: ReqData.CourseID})
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Failed to Update Student Data",
			"Data": ResData,
		})
		return
	}
	student = models.Student{}
	m.App.Database.Preload("User").Preload("Course").First(&student, ReqData.ID)
	ResData = models.ViewStudentApi{
		ID:             student.ID,
		UserID:         student.UserID,
		Name:           student.User.Name,
		Email:          student.User.Email,
		Dob:            student.Dob,
		Phone:          student.Phone,
		EnrollmentYear: student.EnrollmentYear,
		Semister:       student.Semister,
		CourseID:       student.CourseID,
		Course:         student.Course.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  fmt.Sprintf("Teacher Updated Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": ResData,
	})

}
// to do : use db transaction
func (m *Repository) DeleteStudent(ctx *gin.Context) {
	var (
		ReqData models.EditStudentApi
		ResData models.ViewStudentApi
	)
	if err := ctx.ShouldBindJSON(&ReqData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  err.Error(),
			"Data": ResData,
		})
		return
	}
	
	student := models.Student{
		ID:             ReqData.ID,
		UserID:         ReqData.UserID,
		Dob:            ReqData.Dob,
		Phone:          ReqData.Phone,
		EnrollmentYear: ReqData.EnrollmentYear,
		Semister:       ReqData.Semister,
		CourseID:       ReqData.CourseID,
	}
	result := m.App.Database.Preload("User").Preload("Course").Where(&student).First(&student)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg":  result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	result = m.App.Database.Delete(&student)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	ResData = models.ViewStudentApi{
		ID:             student.ID,
		UserID:         student.UserID,
		Name:           student.User.Name,
		Email:          student.User.Email,
		Dob:            student.Dob,
		Phone:          student.Phone,
		EnrollmentYear: student.EnrollmentYear,
		Semister:       student.Semister,
		CourseID:       student.CourseID,
		Course:         student.Course.Name,
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  fmt.Sprintf("Student data deleted Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": ResData,
	})
}
