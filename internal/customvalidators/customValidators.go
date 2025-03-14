package customvalidators

import (
	"strings"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

func RegisterCustomValidators() {
	validate, ok := binding.Validator.Engine().(*validator.Validate)

	if !ok {
		return
	}
	// ----ADD CUSTOM Validators----- //

	validate.RegisterValidation("rla_mail", validateEmail)
	validate.RegisterValidation("valid_phone", validatePhone)
	validate.RegisterValidation("st_role", validateStRole)

	// ----ADD CUSTOM Validators----- //
}
func validateStRole(f validator.FieldLevel) bool {
	role := f.Field().String()
	return role == "Student" || role == "Teacher"
}
func validateEmail(f validator.FieldLevel) bool {
	email := f.Field().String()
	return strings.HasSuffix(email, "@rla.du.ac.in")
}
func validatePhone(f validator.FieldLevel) bool {
	phone := f.Field().Uint()

	return phone > 999999999 && phone <= 9999999999
}