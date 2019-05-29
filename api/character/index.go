package handler

import (
	"fmt"
	"net/http"
	"encoding/json"

	"character/auth"
)

type CharacterState struct {
	Name string `json:"name"`
	Stats Stats `json:"stats"`
	Gear []ItemEntry `json:"gear"`
}

type Stats struct {
	Strength int `json:"strength"`
	Dexterity int `json:"dexterity"`
	Constitution int `json:"constitution"`
	Intelligence int `json:"intelligence"`
	Wisdom int `json:"wisdom"`
	Charisma int `json:"charisma"`
}

type ItemEntry struct {
	Item Item `json:"item"`
	ItemId int `json:"itemId"`
}

type Item struct {
	Count int `json:"count"`
	Name string `json:"name"`
	Weight int `json:"weight"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received request!")

	user, err := auth.GetAuthentication(r)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	decoder := json.NewDecoder(r.Body)
	var body CharacterState
	err = decoder.Decode(&body)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}
	fmt.Println("Request body:")
	fmt.Println(body)

	fmt.Fprintf(w, "Hello! You have been identified as %s", user)
}
