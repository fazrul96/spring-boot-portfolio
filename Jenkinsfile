pipeline {
    agent any

    parameters {
        string(name: 'NODE_VERSION', defaultValue: '18.17.0', description: 'Specify the Node.js version to use eg: 20.5.0')
        string(name: 'CYPRESS_RECORD_KEY', defaultValue: '', description: 'Cypress record key for video recording (optional)')
        string(name: 'CYPRESS_BROWSER', defaultValue: 'chrome', description: 'eg: chromium')
        string(name: 'GITHUB_USERNAME', defaultValue: 'fazrul96', description: 'Github Username')
        string(name: 'SOFTWARE_RENDERING', defaultValue: 'google-chrome', description: 'eg: chromium-browser')
        string(name: 'NODE_TLS_REJECT_UNAUTHORIZED', defaultValue: '0', description: 'Remove SSL verification') // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0'
    }

    environment {
        NODEJS_HOME = tool 'NodeJS' // This will automatically use the configured NodeJS tool
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout main branch'
                git "https://github.com/${params.GITHUB_USERNAME}/Cypress-ACN.git"
                // withCredentials([usernamePassword(credentialsId: 'bitbucket-credentials', usernameVariable: 'BITBUCKET_USERNAME', passwordVariable: 'BITBUCKET_APP_PASSWORD')]) {
                //     git 'https://${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}@bitbucket.org/fazrulromli/cypress-acn.git'
                // }
            }
        }

        stage('Install Node.js') {
            steps {
                // echo "Installing nvm..."
                // sh "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
                // sh "source ~/.nvm/nvm.sh"
                // echo "Installing Node.js ${params.NODE_VERSION}..."
                // sh "nvm install ${params.NODE_VERSION}"
                echo 'Node.js version:'
                sh 'node --version'
                echo 'npm version:'
                sh 'npm --version'
                echo 'Node.js environment:'
                sh 'node -p process.env'
                // sh "nvm use ${params.NODE_VERSION}"
            }
        }

        stage('Install Dependencies') {
            steps {
                // Disable strict SSL for npm
                sh 'npm config set strict-ssl false'
                withEnv(["NODE_TLS_REJECT_UNAUTHORIZED=${params.NODE_TLS_REJECT_UNAUTHORIZED}"]) {
                    echo 'Install dependencies'
                    sh 'npm install cypress --save-dev'
                    echo 'Install other dependencies'
                    sh 'apt-get update'
                    // sh 'apt-get -y curl'
                    sh 'apt-get -y install libgtk2.0-0'
                    sh 'apt-get -y install libgtk-3-0'
                    sh 'apt-get -y install libgbm-dev'
                    sh 'apt-get -y install libnotify-dev'
                    sh 'apt-get -y install libgconf-2-4'
                    sh 'apt-get -y install libnss3'
                    sh 'apt-get -y install libxss1'
                    sh 'apt-get -y install libasound2'
                    sh 'apt-get -y install libxtst6'
                    sh 'apt-get -y install xauth'
                    sh 'apt-get -y install xvfb'
                }
            }
        }

        // stage('Run Browser with Software Rendering') {
        //     steps {
        //         sh "${params.SOFTWARE_RENDERING} --disable-gpu"
        //     }
        // }

        stage('Run Cypress Tests') {
            steps {
                echo "CYPRESS_RECORD_KEY: ${params.CYPRESS_RECORD_KEY}"
                sh "npx cypress install"
                // sh "--browser ${params.CYPRESS_BROWSER}"
                // sh "npx cypress run --spec 'cypress/e2e/1-getting-started/todo.cy.js' ${params.CYPRESS_RECORD_KEY ? '--record --key ' + params.CYPRESS_RECORD_KEY : ''}"
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generating test report...'
                // sh 'npm run generate-report'
                // junit 'cypress/reports/junit.xml'
                // publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'cypress/reports', reportFiles: 'index.html', reportName: 'Cypress Test Report'])
            }
        }
    }
}