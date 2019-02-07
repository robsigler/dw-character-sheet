workflow "static" {
  on = "push"
  resolves = ["deploy"]
}

action "install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "install"
}

action "build" {
  needs = "install"
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "run build"
}

action "deploy" {
  needs = "build"
  uses = "actions/aws/cli@aba0951d3bb681880614bbf0daa29b4a0c9d77b8"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  runs = "./scripts/upload.sh"
}
