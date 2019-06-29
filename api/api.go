package main

import (
    "net/http"
    "log"
    "github.com/gorilla/mux"
    "api/character"
)

func main() {
    r := mux.NewRouter()
    // Routes consist of a path and a handler function.
    r.HandleFunc("/api/character/{user}", character.Handler)
    // r.PathPrefix("/").Handler(http.FileServer(http.Dir("/home/rob/Development/dw-character-sheet/www/build")))

    // Bind to a port and pass our router in
    log.Fatal(http.ListenAndServe(":8000", r))
}
