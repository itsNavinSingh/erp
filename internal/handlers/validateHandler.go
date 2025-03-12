package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/models"
)

func (m *Repository) Validate(ctx *gin.Context) {
	var UserData models.JWTModel

	userinfo, exists := ctx.Get("userInfo")
	if !exists {
		ctx.JSON(http.StatusForbidden, gin.H{
			"Msg": "Something went wrong please try after sometime.",
			"Role": "",
		})
		return
	}
	UserData, exists = userinfo.(models.JWTModel)
	if !exists {
		ctx.JSON(http.StatusForbidden, gin.H{
			"Msg": "Something went wrong please try after sometime",
			"Role": "",
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"Msg": "Welcome",
		"Role": UserData.Role,
	})
}