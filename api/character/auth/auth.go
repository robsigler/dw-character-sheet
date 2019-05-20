package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/SermoDigital/jose"
	"github.com/dgrijalva/jwt-go"
	"github.com/mendsley/gojwk"
)

type Header struct {
	Kid string `json:"kid"`
	Alg string `json:"alg"`
}

type CognitoClaims struct {
	TokenUse string `json:"token_use"`
	jwt.StandardClaims
}

func GetAuthentication(r *http.Request) (string, error) {
	authorization := r.Header.Get("Authorization")
	sections := strings.Split(authorization, ".")
	fmt.Println(sections)
	headerString, err := jose.Base64Decode([]byte(sections[0]))
	if err != nil {
		return "", errors.New("Could not decode base64 from authorization token")
	}
	var header Header
	json.Unmarshal([]byte(headerString), &header)
	resp, err := http.Get("https://cognito-idp.us-east-1.amazonaws.com/us-east-1_VvaOhobD1/.well-known/jwks.json")
	if err != nil {
		return "", errors.New("Failed to get keys")
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", errors.New("Failed to read keys response")
	}
	jwks, err := gojwk.Unmarshal(body)
	publicKey, err := jwks.Keys[0].DecodePublicKey()
	if err != nil {
		return "", errors.New("Failed to get private key")
	}
	claims := CognitoClaims{}
	token, err := jwt.ParseWithClaims(authorization, &claims, func(token *jwt.Token) (interface{}, error) {
		return publicKey, nil
	})
	if err != nil {
		return "", errors.New("Failed to parse with claims")
	}
	if !token.Valid {
		return "", errors.New("Token not valid")
	}

	if claims.Audience != "257dpg7bmbto3o1r20j9hqmcj9" {
		return "", errors.New("Token not valid")
	}

	if claims.Issuer != "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_VvaOhobD1" {
		return "", errors.New("Token not valid")
	}

	if claims.TokenUse != "id" {
		return "", errors.New("Token not valid")
	}

	return claims.Subject, nil
}
