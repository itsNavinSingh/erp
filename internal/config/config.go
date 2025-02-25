package config

import "gorm.io/gorm"

var GlobalConfig *AppConfig
type AppConfig struct {
	Database *gorm.DB
	InProduction bool
	JWTKey []byte
}

func SetGlobalConfig(conf * AppConfig) {
	GlobalConfig = conf
}