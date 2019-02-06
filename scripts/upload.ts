import { S3 } from 'aws-sdk';
// import * as BluebirdPromise from 'bluebird';

(async function() {
    const s3: S3 = new S3();
    const params = {
        Bucket: "robsiglerstatic",
        CopySource: "index.html",
        Key: "index.html",
    };

    try {
        const response = await s3.putObject(params).promise();
        console.log(response);
    } catch (e) {
        console.log(e);
    }
})();