package main

import (
	"net/http"
	"github.com/gin-gonic/gin"

	"api/character"
	"api/character/auth"
)

func main() {
	router := gin.Default()

	router.GET("/api/character/:user", func(c *gin.Context) {
		userID := c.Param("user")

		authenticatedUser, err := auth.GetAuthentication(c.Request)
		if (err != nil) || authenticatedUser != userID {
			c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			return
		}
		character, err := character.Get(userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		c.JSON(http.StatusOK, character)
	})

	router.PUT("/api/character/:user", func(c *gin.Context) {
		userID := c.Param("user")

		authenticatedUser, err := auth.GetAuthentication(c.Request)
		if (err != nil) || authenticatedUser != userID {
			c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			return
		}

		var json character.CharacterState
		c.BindJSON(&json)

		err = character.Put(userID, &json)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	})
	router.Run()
}
