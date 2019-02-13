mkdir -p tmp
aws cloudformation package --s3-bucket $CFN_BUCKET --template-file cfn/main.yaml --output-template-file tmp/main.yaml
aws cloudformation deploy --template-file tmp/main.yaml --stack-name dw-character-sheet
