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

func GetAuthentication(r *http.Request) (string, error) {
	authorization := r.Header.Get("Authorization")
	sections := strings.Split(authorization, ".")
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
	claims := jwt.StandardClaims{}
	token, err := jwt.ParseWithClaims(authorization, &claims, func(token *jwt.Token) (interface{}, error) {
		return publicKey, nil
	})
	if err != nil {
		return "", errors.New("Failed to parse with claims")
	}
	if !token.Valid {
		return "", errors.New("Token not valid")
	}

	// TODO: perform validation as described in https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html

	fmt.Println("aws_user_pools_web_client_id is", claims.Audience)
	fmt.Println("User is authenticated as", claims.Subject)
	return claims.Subject, nil
}
