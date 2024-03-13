pipeline {
    agent any

    parameters {
        string(name: 'NODE_TLS_REJECT_UNAUTHORIZED', defaultValue: '0', description: 'Remove SSL verification')
    }

    environment {
        NODEJS_HOME = tool 'NodeJS' // This will automatically use the configured NodeJS tool
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Sync GitHub Repositories') {
            steps {
                script {
                    git branch: "${GITHUB_BRANCH_NAME}", credentialsId: 'GitHub Credentials', url: "https://github.com/${GITHUB_USERNAME}/spring-boot-portfolio.git"
                    dir('spring-boot-portfolio') {
                        sh "git config user.name ${GITHUB_USERNAME}"
                        sh "git config user.email ${USER_EMAIL}"
                        sh "git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}@github.com/${GITHUB_USERNAME}/spring-boot-portfolio.git"
                        sh "git pull https://${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}@bitbucket.org/${BITBUCKET_USERNAME_LC}/spring-boot-portfolio.git"
                        sh "git push origin HEAD:${GITHUB_BRANCH_NAME}"
                    }
                }
            }
        }

        stage('Sync GitLab Repositories') {
            steps {
                script {
                    // Clone GitLab repository
                    git branch: "${GITHUB_BRANCH_NAME}", credentialsId: 'GitLab Credentials', url: "https://gitlab.com/${GITLAB_USERNAME}/spring-boot-portfolio.git"
                    dir('spring-boot-portfolio') {
                        // Configure Git user
                        sh "git config user.name ${GITLAB_USERNAME}"
                        sh "git config user.email ${USER_EMAIL}"
                        // Set GitLab remote URL
                        sh "git remote set-url origin https://gitlab-ci-token:${GITLAB_PERSONAL_ACCESS_TOKEN}@gitlab.com/${GITLAB_USERNAME}/spring-boot-portfolio.git"
                        // Pull changes from GitLab repository
                        sh "git pull"
                        // Push changes to GitLab repository
                        sh "git push origin HEAD:${GITHUB_BRANCH_NAME}"
                    }
                }
            }
        }

        stage('Sync Azure Repositories') {
            steps {
                script {
                    // Clone Azure repository
                    git branch: "${BRANCH_NAME}", credentialsId: 'Azure Credentials', url: "https://azure.com/${AZURE_USERNAME}/spring-boot-portfolio.git"
                    dir('spring-boot-portfolio') {
                        // Configure Git user
                        sh "git config user.name ${AZURE_USERNAME}"
                        sh "git config user.email ${USER_EMAIL}"
                        // Set Azure remote URL
                        sh "git remote set-url origin https://${AZURE_USERNAME}:${AZURE_PERSONAL_ACCESS_TOKEN}@azure.com/${AZURE_USERNAME}/spring-boot-portfolio.git"
                        // Pull changes from Azure repository
                        sh "git pull"
                        // Push changes to Azure repository
                        sh "git push origin HEAD:${GITHUB_BRANCH_NAME}"
                    }
                }
            }
        }

        stage('Cypress CI') {
            steps {
                sh 'npm config set strict-ssl false'
                withEnv(["NODE_TLS_REJECT_UNAUTHORIZED=${params.NODE_TLS_REJECT_UNAUTHORIZED}"]) {
                    sh 'npm install cypress --save-dev'
                    sh 'apt-get update'
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

                    sh "npx cypress install"
                    dir('portfolio-portal') {
                        script {
                            try {
                                sh "./node_modules/.bin/tsc cypress.config.ts"
                            } catch (compileErr) {
                                echo "TypeScript compilation failed: ${compileErr}"
                            }
                        }
                        script {
                            try {
                                sh "npx cypress run --config-file 'cypress.json' --spec 'cypress/e2e/scan/scan.cy.js' ${params.CYPRESS_RECORD_KEY ? '--record --key ' + params.CYPRESS_RECORD_KEY : ''}"
                            } catch (testErr) {
                                echo "Cypress tests execution failed: ${testErr}"
                            }
                        }
                    }
                }
            }
        }

        stage('Generate Report') {
            steps {
                dir('portfolio-portal') {
                    script {
                        try {
                            sh 'npm run report:generate'
                            junit 'cypress/reports/junit.xml'
                            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'cypress/reports', reportFiles: 'index.html', reportName: 'Cypress Test Report'])
                        } catch (compileErr) {
                            echo "Report compilation failed: ${compileErr}"
                        }
                    }
                }
            }
        }
    }
}