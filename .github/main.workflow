workflow "Deploy" {
  on = "push"
  resolves = ["Build static"]
}

action "Build static" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  runs = "npm install --save-dev && npm run build"
}
