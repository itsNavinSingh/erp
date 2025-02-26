package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
	"gorm.io/gorm"
)

func (m *Repository) UserDetails(ctx *gin.Context) {
	
	var UserData models.JWTModel
	var UserDB models.User
	var msg string

	userInfo, exists := ctx.Get("userInfo")
	if !exists {
		ctx.JSON(http.StatusForbidden, gin.H{
			"msg": "Something went wrong",
		})
	}
	UserData, exists = userInfo.(models.JWTModel)
	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"msg": "Something went wrong",
		})
		return
	}
	result := m.App.Database.First(&UserDB, models.User{ID: UserData.UserID, Email: UserData.Email, Role: UserData.Role})
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			msg = fmt.Sprintf("No User exist with Email[%s] and Role[%s]", UserData.Email, UserData.Role)
		} else {
			msg = "Something went wrong!"
		}
		ctx.JSON(http.StatusForbidden, gin.H{
			"msg": msg,
		})
		return
	}
	ctx.JSON(http.StatusOK, &models.UserDetailApi{
		UserID: UserDB.ID,
		Name: UserDB.Name,
		Email: UserDB.Role,
		Role: UserDB.Role,
	})
}