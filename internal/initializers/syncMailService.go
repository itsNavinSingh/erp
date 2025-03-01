package initializers

import (
	"net/smtp"
	"os"

	"github.com/itsNavinSingh/erp/internal/config"
)

func SyncMail(app *config.AppConfig) {
	app.MailData = config.MailInfo{
		Host:     os.Getenv("MAIL_HOST"),
		Port:     os.Getenv("MAIL_PORT"),
		User:     os.Getenv("MAIL_USER"),
		Password: os.Getenv("MAIL_PASS"),
	}
	app.MailData.Auth = smtp.PlainAuth("", app.MailData.User, app.MailData.Password, app.MailData.Host)
}
