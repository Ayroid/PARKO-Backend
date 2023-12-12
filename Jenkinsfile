pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS'
        PATH = "$NODEJS_HOME/bin:$PATH"
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
                    withSonarQubeEnv('SonarQube_Server') {
                        sh 'npm run sonar-scanner'
                    }
                }
            }
        }
    }
}
