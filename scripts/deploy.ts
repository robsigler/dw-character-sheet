import { S3 } from 'aws-sdk';
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

(async () => {
    try {
        await uploadFile("index.html", "robsiglerstatic");
        await uploadFile("dist/bundle.js", "robsiglerstatic");
        await uploadFile("dist/bundle.js.map", "robsiglerstatic");
        await uploadFile("node_modules/react/umd/react.development.js", "robsiglerstatic");
        await uploadFile("node_modules/react-dom/umd/react-dom.development.js", "robsiglerstatic");
    } catch (error) {
        console.log(error);
    }
})();

async function uploadFile(srcFileName: string, destBucket: string): Promise<S3.PutObjectOutput> {
    const s3: S3 = new S3();
    const buf: Buffer = await readFile(srcFileName)
    const params = {
        Body: buf,
        Bucket: destBucket,
        Key: srcFileName,
    };
    return s3.putObject(params).promise();
}