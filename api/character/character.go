package character

import (
	"encoding/json"
	"fmt"
	"net/http"

	"api/character/auth"

    "github.com/gorilla/mux"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

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

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received request!")
	if r.Method == "GET" {
		Get(w, r)
		return
	}
	if r.Method == "PUT" {
		Put(w, r)
		return
	}
	fmt.Fprintf(w, "Unsupported request method %s", r.Method)
}

func Get(w http.ResponseWriter, r *http.Request) {
	authenticatedUser, err := auth.GetAuthentication(r)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	vars := mux.Vars(r)
	userId := vars["user"]
	if authenticatedUser != userId {
		fmt.Fprintf(w, "ERROR: not authenticated to get sheet for that user")
		return
	}

	svc := dynamodb.New(session.New(&aws.Config{
		Region: aws.String("us-east-1"),
	}))
	input := &dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(userId),
			},
		},
		TableName: aws.String("dw-character-sheet-SheetTable-E9OWGTSTQH32"),
	}

	result, err := svc.GetItem(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case dynamodb.ErrCodeConditionalCheckFailedException:
				fmt.Println(dynamodb.ErrCodeConditionalCheckFailedException, aerr.Error())
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				fmt.Println(dynamodb.ErrCodeProvisionedThroughputExceededException, aerr.Error())
			case dynamodb.ErrCodeResourceNotFoundException:
				fmt.Println(dynamodb.ErrCodeResourceNotFoundException, aerr.Error())
			case dynamodb.ErrCodeItemCollectionSizeLimitExceededException:
				fmt.Println(dynamodb.ErrCodeItemCollectionSizeLimitExceededException, aerr.Error())
			case dynamodb.ErrCodeTransactionConflictException:
				fmt.Println(dynamodb.ErrCodeTransactionConflictException, aerr.Error())
			case dynamodb.ErrCodeRequestLimitExceeded:
				fmt.Println(dynamodb.ErrCodeRequestLimitExceeded, aerr.Error())
			case dynamodb.ErrCodeInternalServerError:
				fmt.Println(dynamodb.ErrCodeInternalServerError, aerr.Error())
			default:
				fmt.Println(aerr.Error())
			}
		} else {
			// Print the error, cast err to awserr.Error to get the Code and
			// Message from an error.
			fmt.Println(err.Error())
		}
		return
	}

	record := CharacterStateRecord{}
	err = dynamodbattribute.UnmarshalMap(result.Item, &record)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	sheetJson, err := json.Marshal(record.Sheet)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(sheetJson)
}

func Put(w http.ResponseWriter, r *http.Request) {
	authenticatedUser, err := auth.GetAuthentication(r)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	vars := mux.Vars(r)
	userId := vars["user"]
	if authenticatedUser != userId {
		fmt.Fprintf(w, "ERROR: not authenticated to get sheet for that user")
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
	sheetJson, err := json.Marshal(body)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	body.Id = userId

	svc := dynamodb.New(session.New(&aws.Config{
		Region: aws.String("us-east-1"),
	}))
	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(body.Id),
			},
			"Sheet": {
				S: aws.String(string(sheetJson)),
			},
		},
		TableName: aws.String("dw-character-sheet-SheetTable-E9OWGTSTQH32"),
	}

	result, err := svc.PutItem(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case dynamodb.ErrCodeConditionalCheckFailedException:
				fmt.Println(dynamodb.ErrCodeConditionalCheckFailedException, aerr.Error())
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				fmt.Println(dynamodb.ErrCodeProvisionedThroughputExceededException, aerr.Error())
			case dynamodb.ErrCodeResourceNotFoundException:
				fmt.Println(dynamodb.ErrCodeResourceNotFoundException, aerr.Error())
			case dynamodb.ErrCodeItemCollectionSizeLimitExceededException:
				fmt.Println(dynamodb.ErrCodeItemCollectionSizeLimitExceededException, aerr.Error())
			case dynamodb.ErrCodeTransactionConflictException:
				fmt.Println(dynamodb.ErrCodeTransactionConflictException, aerr.Error())
			case dynamodb.ErrCodeRequestLimitExceeded:
				fmt.Println(dynamodb.ErrCodeRequestLimitExceeded, aerr.Error())
			case dynamodb.ErrCodeInternalServerError:
				fmt.Println(dynamodb.ErrCodeInternalServerError, aerr.Error())
			default:
				fmt.Println(aerr.Error())
			}
		} else {
			// Print the error, cast err to awserr.Error to get the Code and
			// Message from an error.
			fmt.Println(err.Error())
		}
		return
	}

	fmt.Println(result)

	fmt.Fprintf(w, "Hello! You have been identified as %s", authenticatedUser)
}
