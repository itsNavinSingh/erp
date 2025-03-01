package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"github.com/itsNavinSingh/erp/internal/utils"
)

func (m *Repository) ViewUsers(ctx *gin.Context) {
	var users []models.User
	result := m.App.Database.Where("role IN ?", []string{"teacher", "student"}).Find(&users)
	ResData := make([]models.UserDetailApi, len(users))
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  result.Error.Error(),
			"Data": ResData,
		})
		return
	}
	for i, user := range users {
		ResData[i] = models.UserDetailApi{
			UserID: user.ID,
			Email:  user.Email,
			Name:   user.Name,
			Role:   user.Role,
		}
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  "User details fetched successfully",
		"Data": ResData,
	})
}
func (m *Repository) AddUser(ctx *gin.Context) {
	var ReqData models.UserDetailApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  err.Error(),
			"Data": models.UserDetailApi{},
		})
		return
	}
	if ReqData.Role != "teacher" && ReqData.Role != "student" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  fmt.Sprintf("Role: %s. is not allowed!", ReqData.Role),
			"Data": models.UserDetailApi{},
		})
		return
	}
	var (
		textpass string
		hashpass string
	)
	textpass, hashpass, err = utils.HashPassword()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Problem in generating password" + err.Error(),
			"Data": models.UserDetailApi{},
		})
		return
	}
	NewUser := models.User{
		Name:     ReqData.Name,
		Email:    ReqData.Email,
		Role:     ReqData.Role,
		Password: hashpass,
	}
	tx := m.App.Database.Begin()
	result := tx.Create(&NewUser)
	if result.Error != nil {
		tx.Rollback()
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  result.Error.Error(),
			"Data": models.UserDetailApi{},
		})
		return
	}
	ResData := models.UserDetailApi{
		UserID: NewUser.ID,
		Name:   NewUser.Name,
		Email:  NewUser.Email,
		Role:   NewUser.Role,
	}
	if sttatus := utils.SendeWelcomeMail(NewUser.Name, NewUser.Role, textpass, NewUser.Email, m.App.MailData.User, m.App.MailData.Host, m.App.MailData.Port, m.App.MailData.Auth); sttatus != nil {
		tx.Rollback()
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "User Created but failed to Send Mail: " + sttatus.Error(),
			"Data": ResData,
		})
		return
	}
	if tx.Commit().Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"Msg":  "Failed to commit changes",
			"Data": models.UserDetailApi{},
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg":  "User Created successfully",
		"Data": ResData,
	})
}
func (m *Repository) DeleteUser(ctx *gin.Context) {
	var ReqData models.DeleteUserApi

	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg":  err.Error(),
			"Data": models.DeleteUserApi{},
		})
		return
	}
	var deletedUser models.User
	result := m.App.Database.Delete(&deletedUser, ReqData.UserID)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg":  result.Error.Error(),
			"Data": models.DeleteUserApi{},
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": fmt.Sprintf("User Deleted Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": models.DeleteUserApi{
			UserID: deletedUser.ID,
			Name:   deletedUser.Name,
			Email:  deletedUser.Email,
			Role:   deletedUser.Role,
		},
	})
}
func (m *Repository) EditUser(ctx *gin.Context) {
	var ReqData models.UserDetailApi
	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil || ReqData.UserID == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"Msg": err.Error(),
			"Data": models.UserDetailApi{},
		})
		return
	}
	var user models.User
	result := m.App.Database.First(&user, ReqData.UserID)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": fmt.Sprintf("User not found with ID = %d", ReqData.UserID),
			"Data": models.UserDetailApi{},
		})
		return
	}
	result = m.App.Database.Model(&user).Updates(models.User{Name: ReqData.Name, Email: ReqData.Email, Role: ReqData.Role})
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"Msg": "Failed to update User data",
			"Data": models.UserDetailApi{},
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": fmt.Sprintf("User updated Successfully. RowsAffected: %d", result.RowsAffected),
		"Data": ReqData,
	})
}