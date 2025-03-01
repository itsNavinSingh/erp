package utils

import (
	"fmt"
	"net/smtp"
)

func ComposeMail(from, to, subject, body string) string {
	return fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s", from, to, subject, body)
}

func SendMail(host, port, user, msg string, to string, auth smtp.Auth) error {
	return smtp.SendMail(host+":"+port, auth, user, []string{to}, []byte(msg))
}
func SendeWelcomeMail(name, role, password, toEmail, fromEmail, host, port string, auth smtp.Auth) error {
	body := fmt.Sprintf(
		`Dear %s,
Welcome to our Organization! We are thrilled to have you join our academic community as a %s. To help you get started, we have created an account for you to access our systems and resources.
		
Below are your login credentials:
 - Email: %s
 - Role: %s
 - Password: %s
		
Please don't share your credientials with anyone!
Next Steps:
1. Visit our mobile/web portal.
2. Log in using the credientials provided above.
3. Change your password upon first login.
		
If you encounter any issues or have questions, please don't hesitate to reach out to our Admin team.
		
Once again, welcome to our institution! We look forward to working with you and supporting your success.
		
Best regards,
Admin Department`, name, role, toEmail, role, password,
	)
	subject := fmt.Sprintf("Welcome %s! - Your Account Details", name)
	mail := ComposeMail(fromEmail, toEmail, subject, body)

	return SendMail(host, port, fromEmail, mail, toEmail, auth)
}