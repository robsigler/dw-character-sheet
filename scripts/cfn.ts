import { CloudFormation } from 'aws-sdk';
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

(async () => {
    try {
        await deployCfn("cfn/main.yaml", "dw-character-sheet");
    } catch (error) {
        console.log("error caught..");
    }
})();

async function deployCfn(srcFileName: string, stackName: string): Promise<void> {
    const cfn: CloudFormation = new CloudFormation({region: "us-east-1"});
    const templateBody: string = await readFile(srcFileName, "utf-8")
    const deployStackParams = {
        StackName: stackName,
        TemplateBody: templateBody,
    }
    const stackOutput: CloudFormation.DescribeStacksOutput = await cfn.describeStacks({StackName: stackName}).promise();
    if (stackOutput.Stacks.length > 0) {
        try {
            await cfn.updateStack(deployStackParams).promise();
        } catch (error) {
            if (!(error.code === "ValidationError" && error.message === "No updates are to be performed.")) {
                throw error;
            }
        }
    } else {
        await cfn.createStack(deployStackParams).promise();
    }
    return Promise.resolve();
}