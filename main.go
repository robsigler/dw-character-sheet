package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	//r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Got request on /")
		http.ServeFile(w, r, "/home/rob/Development/dw-character-sheet/frontend/build/index.html")
	})
	staticFileHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("/home/rob/Development/dw-character-sheet/frontend/build/static")))
	r.PathPrefix("/static/").Handler(staticFileHandler).Methods("GET")
	fmt.Println("Starting server on port 8080")
	http.ListenAndServe(":8080", r)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Hello World\n")
}
