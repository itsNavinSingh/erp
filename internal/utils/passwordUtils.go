package utils

import (
	"crypto/rand"
	"math/big"

	"golang.org/x/crypto/bcrypt"
)

func GenerateRandomPassword() string {
	charset := "qweertyuiopasdffghhjklxcvbnm@ZXCVBNMASDFGHJKLQWERTYUIOP"
	length, _ := rand.Int(rand.Reader, big.NewInt(10))
	lengthInt := int(length.Int64()) + 1

	randomBytes := make([]byte, lengthInt)

	for i := range randomBytes {
		charIndex, _ := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		randomBytes[i] = charset[charIndex.Int64()]
	}
	return string(randomBytes)
}
// return random password, their hash value and error if any
func HashPassword () (string, string, error) {
	charPass := GenerateRandomPassword()
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(charPass), bcrypt.DefaultCost)
	if err != nil {
		return "", "", err
	}
	return charPass, string(hashedPass), err
}