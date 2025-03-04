package customvalidators

import (
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func RegisterCustomValidators(router *gin.Engine) {
	validate := validator.New()

	// ----ADD CUSTOM Validators----- //

	validate.RegisterValidation("rla_mail", validateEmail)
	validate.RegisterValidation("valid_phone", validatePhone)

	// ----ADD CUSTOM Validators----- //

	router.Use(func(ctx *gin.Context) {
		ctx.Set("validator", validate)
		ctx.Next()
	})
}

func validateEmail(f validator.FieldLevel) bool {
	email :=  strings.ToLower(f.Field().String())
	return strings.HasSuffix(email, "@rla.du.ac.in")
}
func validatePhone(f validator.FieldLevel) bool {
	phone := f.Field().Uint()

	return phone > 999999999 && phone <= 9999999999
}