package handler

import (
	"fmt"
	"net/http"

	"character/auth"
)

type Header struct {
	Kid string `json:"kid"`
	Alg string `json:"alg"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received request!")

	user, err := auth.GetAuthentication(r)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	fmt.Fprintf(w, "Hello! You have been identified as %s", user)
}
