package handler

import (
	"fmt"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	authorization := r.Header.Get("Authorization")
	fmt.Println(authorization)
	fmt.Fprintf(w, "Hello from Go on Now 2.0, bruh!")
}
