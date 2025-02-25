package models

type LoginApi struct {
	Email string `json:"Email" binding:"required"`
	Password string `json:"Password" binding:"required"`
	Role string `json:"Role" binding:"required"`
	Device string `json:"Device" binding:"required"`
}