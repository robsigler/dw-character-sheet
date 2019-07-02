package character

import (
	"encoding/json"
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/gin-gonic/gin"

	"api/character/auth"
	"api/pkg/config"
)

type CharacterHandler struct {
	Config config.Configuration
}

type CharacterStateRecord struct {
	Id    string
	Sheet string
}

type CharacterState struct {
	Id    string      `json:"id"`
	Name  string      `json:"name"`
	Stats Stats       `json:"stats"`
	Gear  []ItemEntry `json:"gear"`
}

type Stats struct {
	Strength     int `json:"strength"`
	Dexterity    int `json:"dexterity"`
	Constitution int `json:"constitution"`
	Intelligence int `json:"intelligence"`
	Wisdom       int `json:"wisdom"`
	Charisma     int `json:"charisma"`
}

type ItemEntry struct {
	Item   Item `json:"item"`
	ItemId int  `json:"itemId"`
}

type Item struct {
	Count  int    `json:"count"`
	Name   string `json:"name"`
	Weight int    `json:"weight"`
}

func (h CharacterHandler) Get(c *gin.Context) {
	userID := c.Param("user")

	authenticatedUser, err := auth.GetAuthentication(c.Request)
	if (err != nil) || authenticatedUser != userID {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
		return
	}
	character, err := h.GetCharacter(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, character)
}

// Get ...
func (h CharacterHandler) GetCharacter(userID string) (*CharacterState, error) {
	svc := dynamodb.New(session.New(&aws.Config{
		Region: aws.String(h.Config.Region),
	}))
	input := &dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(userID),
			},
		},
		TableName: aws.String(h.Config.Table),
	}

	result, err := svc.GetItem(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return nil, aerr
		}
		return nil, err
	}

	record := CharacterStateRecord{}
	err = dynamodbattribute.UnmarshalMap(result.Item, &record)
	if err != nil {
		return nil, err
	}

	var sheet CharacterState
	err = json.Unmarshal([]byte(record.Sheet), &sheet)
	if err != nil {
		return nil, err
	}
	return &sheet, nil
}

func (h CharacterHandler) Put(c *gin.Context) {
	userID := c.Param("user")

	authenticatedUser, err := auth.GetAuthentication(c.Request)
	if (err != nil) || authenticatedUser != userID {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
		return
	}

	var json CharacterState
	c.BindJSON(&json)

	err = h.PutCharacter(userID, &json)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "OK"})
}

func (h CharacterHandler) PutCharacter(userID string, sheet *CharacterState) error {
	sheetJSON, err := json.Marshal(*sheet)
	if err != nil {
		return err
	}

	svc := dynamodb.New(session.New(&aws.Config{
		Region: aws.String(h.Config.Region),
	}))
	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(userID),
			},
			"Sheet": {
				S: aws.String(string(sheetJSON)),
			},
		},
		TableName: aws.String(h.Config.Table),
	}

	_, err = svc.PutItem(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return aerr
		}
		return err
	}

	return nil
}
