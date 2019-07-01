package main

import (
	"github.com/gin-gonic/gin"

	"api/character"
)

func main() {
	router := gin.Default()
	characterHandler := character.CharacterHandler{}
	router.GET("/api/character/:user", characterHandler.Get)
	router.PUT("/api/character/:user", characterHandler.Put)
	router.Run()
}
