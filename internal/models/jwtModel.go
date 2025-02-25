package models

type JWTModel struct {
	UserID uint `json:"UserID"`
	Email string `json:"Email"`
	Role string `json:"Role"`
}