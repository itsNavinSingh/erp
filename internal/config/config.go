package config

import "gorm.io/gorm"

var GlobalConfig *AppConfig
type AppConfig struct {
	Database *gorm.DB
	InProduction bool
	JWTKey []byte
}
// SetGlobalConfig: Set a Global Config data
func SetGlobalConfig(conf * AppConfig) {
	GlobalConfig = conf
}