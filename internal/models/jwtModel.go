package models

// JWTModel: Authentication Model used to create JWT Token and retrive data from JWT Token
type JWTModel struct {
	UserID uint `json:"UserID"`
	Email string `json:"Email"`
	Role string `json:"Role"`
}