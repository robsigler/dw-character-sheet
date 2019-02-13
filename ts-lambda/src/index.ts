import { DynamoDB } from "aws-sdk";

export const handler = async (event: any = {}): Promise<any> => {
    const dynamoDB = new DynamoDB({apiVersion: "2012-08-10", region: "us-east-1"});
    const putItemParams: DynamoDB.PutItemInput = {
        Item: {
            "Id": {
                "N": "1"
            },
            "Sheet": {
                "S": '{"name":"Helga","stats":{"strength":20,"dexterity":10,"constitution":10,"intelligence":10,"wisdom":10,"charisma":10},"gear":[{"item":{"count":3,"name":"Adventuring Gear","weight":1},"itemId":1},{"item":{"count":1,"name":"Enchanted Dagger","weight":1},"itemId":2}],"nextGearKey":3}'
            }
        },
        TableName: "dw-character-sheet-SheetTable-7SJTQH9CJTVG"
    };
    const output: DynamoDB.PutItemOutput = await dynamoDB.putItem(putItemParams).promise();
    console.log('Hello World!');
    const response = JSON.stringify(event, null, 2);
    return response;
}