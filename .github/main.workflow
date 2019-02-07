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
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  runs = "run deploy"
}
