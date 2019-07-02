package main

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"api/character"
	"api/pkg/config"
)

func main() {
	config, err := config.LoadConfiguration()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(config)
	router := gin.Default()
	characterHandler := character.CharacterHandler{
		Config: config,
	}
	router.GET("/api/character/:user", characterHandler.Get)
	router.PUT("/api/character/:user", characterHandler.Put)
	router.Run()
}
