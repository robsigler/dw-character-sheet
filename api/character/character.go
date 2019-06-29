package character

import (
	"encoding/json"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type CharacterController struct {

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

// Get ...
func Get(userID string) (*CharacterState, error) {
	svc := dynamodb.New(session.New(&aws.Config{
		Region: aws.String("us-east-1"),
	}))
	input := &dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(userID),
			},
		},
		TableName: aws.String("dw-character-sheet-SheetTable-E9OWGTSTQH32"),
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

func Put(userID string, sheet *CharacterState) error {
	sheetJSON, err := json.Marshal(*sheet)
	if err != nil {
		return err
	}

	svc := dynamodb.New(session.New(&aws.Config{
		Region: aws.String("us-east-1"),
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
		TableName: aws.String("dw-character-sheet-SheetTable-E9OWGTSTQH32"),
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
