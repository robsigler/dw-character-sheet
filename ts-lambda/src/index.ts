import { DynamoDB } from "aws-sdk";

export const handler = async (event: any = {}): Promise<any> => {
    const dynamoDB = new DynamoDB({apiVersion: "2012-08-10", region: "us-east-1"});
    const putItemParams: DynamoDB.PutItemInput = {
        Item: {
            "Id": {
                "N": Number(event.id).toString()
            },
            "Sheet": {
                "S": JSON.stringify(event.sheet)
            }
        },
        TableName: "dw-character-sheet-SheetTable-7SJTQH9CJTVG"
    };
    const output: DynamoDB.PutItemOutput = await dynamoDB.putItem(putItemParams).promise();
    return {};
}