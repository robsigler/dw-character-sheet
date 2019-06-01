pipeline {
  agent any
  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:11'
        }

      }
      steps {
        sh 'cd www && yarn install && yarn build'
      }
    }
  }
}