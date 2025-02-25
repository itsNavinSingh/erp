package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/authutils"
	"github.com/itsNavinSingh/erp/internal/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func (m *Repository) Login(ctx *gin.Context) {

	var ReqData models.LoginApi
	var UserData models.User
	var msg string
	err := ctx.ShouldBindJSON(&ReqData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"msg": err.Error(),
		})
		return
	}
	result := m.App.Database.First(&UserData, models.User{Email: ReqData.Email, Role: ReqData.Role})
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			msg = "No User exists with this email: " + ReqData.Email + " and Role: " + ReqData.Role
		} else {
			msg = "Something went wrong!"
		}
		ctx.JSON(http.StatusForbidden, gin.H{
			"msg": msg,
		})
		return
	}
	//check password
	err = bcrypt.CompareHashAndPassword([]byte(UserData.Password), []byte(ReqData.Password))
	if err != nil {
		ctx.JSON(http.StatusForbidden, gin.H{
			"msg": "Invalid Password",
		})
		return
	}
	msg, err = authutils.CreateToken(&models.JWTModel{UserID: UserData.ID, Email: UserData.Email, Role: UserData.Role}, m.App.JWTKey)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"msg": "Internal Server Error",
		})
		return
	}
	if ReqData.Device == "mobile" {
		ctx.JSON(http.StatusOK, gin.H{
			"token" : msg,
			"msg": "Login Successful",
		})
	} else {
		ctx.SetCookie("Auth", msg, 30 * 24 * 3600, "/", "", m.App.InProduction, true)
		ctx.JSON(http.StatusOK, gin.H{
			"msg": "Login Successful",
		})
	}
}