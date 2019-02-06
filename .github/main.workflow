workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for AWS"]
}

action "GitHub Action for AWS" {
  uses = "actions/aws/cli@aba0951d3bb681880614bbf0daa29b4a0c9d77b8"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  runs = "aws s3 ls"
}
