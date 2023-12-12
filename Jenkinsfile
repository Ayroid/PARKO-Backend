pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQubeServer') {
                        sh 'npm run sonar-scanner'
                    }
                }
            }
        }
    }
}
