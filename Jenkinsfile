pipeline {
  agent any
  stages {
    stage('Build www') {
      agent {
        docker {
          image 'node:11'
        }

      }
      steps {
        sh 'cd www && yarn install && yarn build'
      }
    }
    stage('Build api') {
      agent {
        docker {
          image 'golang:1.12'
        }

      }
      steps {
        sh 'cd api/character && go build'
      }
    }
  }
}
