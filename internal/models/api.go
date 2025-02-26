package models

// LoginApi: Use to accept data sent for Login Request
type LoginApi struct {
	Email string `json:"Email" binding:"required"`
	Password string `json:"Password" binding:"required"`
	Role string `json:"Role" binding:"required"`
	Device string `json:"Device" binding:"required"`
}
// UserDetailApi: Use to send User Data when requested
type UserDetailApi struct {
	UserID uint `json:"UserID"`
	Name string `json:"Name"`
	Email string `json:"Email"`
	Role string `json:"Role"`
}