package config

import (
	"net/smtp"

	"gorm.io/gorm"
)

var GlobalConfig *AppConfig

type MailInfo struct {
	Host     string
	Port     string
	User     string
	Password string
	Auth     smtp.Auth
}
type AppConfig struct {
	Database     *gorm.DB
	InProduction bool
	JWTKey       []byte
	MailData     MailInfo
}

// SetGlobalConfig: Set a Global Config data
func SetGlobalConfig(conf *AppConfig) {
	GlobalConfig = conf
}
