pipeline {
  agent none
  environment {
    DOCKERHUBNAME = "liker163"
  }
  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:6-alpine' 
          // args '-p 3000:3000'
          args '-v /root/.npm:/root/.npm'
        }
      }
      steps {
        echo 'start npm install...'
        sh 'npm install'
        echo 'start npm build...'
        sh 'npm build'
        echo 'npm install and build successfully!'
      }
    }

    stage('docker build & push & run') {
      agent any
      steps {
        script {
          def REMOVE_FLAG = sh(returnStdout: true, script: "docker image ls -q *${DOCKERHUBNAME}/smcauth*") != ""
          echo "REMOVE_FLAG: ${REMOVE_FLAG}"
          if(REMOVE_FLAG){
            sh 'docker image rm -f $(docker image ls -q *${DOCKERHUBNAME}/smcauth*)'
          }
        }

        withCredentials([usernamePassword(credentialsId: 'liker163ID', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'docker login -u $USERNAME -p $PASSWORD'
          sh 'docker image build -t ${DOCKERHUBNAME}/smcauth .'
          sh 'docker push ${DOCKERHUBNAME}/smcauth'
          sh 'docker run -d -p 4200:4200 --network smc-net --name smceureka ${DOCKERHUBNAME}/smcauth'
        }
      }
    }

    stage('clean workspace') {
      agent any
      steps {
        // clean workspace after job finished
        cleanWs()
      }
    }
  }
}


