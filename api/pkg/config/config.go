package config

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

type Configuration struct {
	Region string `json:"region"`
	Table  string `json:"table"`
}

func LoadConfiguration() (Configuration, error) {
	var config Configuration
	jsonFile, err := os.Open("config.json")
	if err != nil {
		return config, err
	}
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return config, err
	}
	json.Unmarshal(byteValue, &config)
	return config, nil
}