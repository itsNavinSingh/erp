package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/itsNavinSingh/erp/internal/authutils"
	"github.com/itsNavinSingh/erp/internal/config"
	"github.com/itsNavinSingh/erp/internal/models"
)

// RequireAuth: This middleware used to check if a user is authorized or not. If yes, then Attach User Info to Context else Reject the Request
func RequireAuth(ctx *gin.Context) {
	var token string
	var err error
	var UserData models.JWTModel
	authHeader := ctx.GetHeader("Authorization")
	if strings.HasPrefix(authHeader, "Bearer ") {
		token = strings.TrimPrefix(authHeader, "Bearer ")
	} else {
		token, err = ctx.Cookie("Auth")
	}
	if err != nil || token == "" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"msg": "Unauthorized",
		})
		return
	}
	UserData, err = authutils.ValidateToken(token, config.GlobalConfig.JWTKey)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"msg": "Invalid token : " + err.Error(),
		})
		return
	}
	ctx.Set("userInfo", UserData)
	ctx.Next()
}

// RoleAuth: This middleware used to check if a user is not trying to access the different role route
func RoleAuth(role string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var token string
		var err error
		var UserData models.JWTModel
		authHeader := ctx.GetHeader("Authorization")
		if strings.HasPrefix(authHeader, "Bearer ") {
			token = strings.TrimPrefix(authHeader, "Bearer ")
		} else {
			token, err = ctx.Cookie("Auth")
		}
		if err != nil || token == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"msg": "Unauthorized",
			})
			return
		}
		UserData, err = authutils.ValidateToken(token, config.GlobalConfig.JWTKey)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"msg": "Invalid token: " + err.Error(),
			})
			return
		}
		if UserData.Role != role {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"msg": "Wrong Route",
			})
			return
		}
		ctx.Set("userInfo", UserData)
		ctx.Next()
	}
}