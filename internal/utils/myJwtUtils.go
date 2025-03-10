package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/itsNavinSingh/erp/internal/models"
)

type Claims struct {
	models.JWTModel
	jwt.RegisteredClaims
}
// CreateToken: Generates the JWT Token and error if any occour
func CreateToken(data *models.JWTModel, jwtkey []byte) (string, error) {
	claims := &Claims{
		JWTModel: *data,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(30*24*time.Hour)),
		},
	}
	unsignedToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return unsignedToken.SignedString(jwtkey)
}
// ValidateToken: Check if JWT Token is valid or not and returns User Data related to that token
func ValidateToken(tokenString string, jwtkey []byte) (models.JWTModel, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
		return jwtkey, nil
	})
	if err != nil {
		return claims.JWTModel, err
	}
	if !token.Valid {
		return claims.JWTModel, errors.New("invalid token")
	}
	return claims.JWTModel, nil
}