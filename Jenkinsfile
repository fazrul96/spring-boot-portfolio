pipeline {
    agent any

    parameters {
        string(name: 'NODE_TLS_REJECT_UNAUTHORIZED', defaultValue: '0', description: 'Remove SSL verification')
        string(name: 'CYPRESS_RECORD_KEY', defaultValue: '', description: '(Optional) Using cypress cloud will use the resource')
        string(name: 'CYPRESS_BROWSER', defaultValue: 'chrome', description: 'Optional')
    }

    environment {
        NODEJS_HOME = tool 'NodeJS' // This will automatically use the configured NodeJS tool
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Sync VCS [Github-Gitlab-Azure]') {
            steps {
                // Custom checkout if required specific requirement
                // script {
                //     git branch: "${GITHUB_BRANCH_NAME}", url: "https://github.com/${GITHUB_USERNAME}/spring-boot-portfolio.git"
                //     dir('spring-boot-portfolio') {
                //         sh "git config user.name ${GITHUB_USERNAME}"
                //         sh "git config user.email ${USER_EMAIL}"
                //         sh "git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}@github.com/${GITHUB_USERNAME}/spring-boot-portfolio.git"
                //         sh "git pull https://${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}@bitbucket.org/${BITBUCKET_USERNAME_LC}/spring-boot-portfolio.git"
                //         sh "git push origin HEAD:${GITHUB_BRANCH_NAME}"
                //     }
                // }

                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "${GITHUB_BRANCH_NAME}"]],
                        userRemoteConfigs: [[url: "https://${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}@github.com/${GITHUB_USERNAME}/spring-boot-portfolio.git"]]
                    ])
                    sh "git config user.name ${GITHUB_USERNAME}"
                    sh "git config user.email ${USER_EMAIL}"
                    sh "git pull https://${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}@bitbucket.org/${BITBUCKET_USERNAME_LC}/spring-boot-portfolio.git"
                    sh "git push origin HEAD:${GITHUB_BRANCH_NAME}"
                }

                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "${GITHUB_BRANCH_NAME}"]],
                        extensions: [],
                        userRemoteConfigs: [[
                            credentialsId: 'Gitlab-Credentials',
                            url: "https://${GITLAB_USERNAME}:${GITLAB_PERSONAL_ACCESS_TOKEN}@gitlab.com/${GITLAB_USERNAME}/spring-boot-portfolio.git"
                        ]]
                    ])
                    sh "git config user.name ${GITLAB_USERNAME}"
                    sh "git config user.email ${USER_EMAIL}"
                    sh "git pull https://${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}@bitbucket.org/${BITBUCKET_USERNAME_LC}/spring-boot-portfolio.git"
                    sh "git push origin ${GITHUB_BRANCH_NAME}"
                }

                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "${GITHUB_BRANCH_NAME}"]],
                        extensions: [],
                        userRemoteConfigs: [[
                            credentialsId: 'Azure-Credentials',
                            url: "https://${AZURE_USERNAME}:${AZURE_PERSONAL_ACCESS_TOKEN}@dev.azure.com/ACN-DevOpsMasters/ACN/_git/spring-boot-portfolio"
                        ]]
                    ])
                    sh "git config user.name ${AZURE_USERNAME}"
                    sh "git config user.email ${USER_EMAIL}"
                    sh "git pull https://${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}@bitbucket.org/${BITBUCKET_USERNAME_LC}/spring-boot-portfolio.git"
                    sh "git push origin ${GITHUB_BRANCH_NAME}"
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
                        sh "npx cypress run --config-file cypress.config.ts ${params.CYPRESS_RECORD_KEY ? '--record --key ' + params.CYPRESS_RECORD_KEY : ''}"
                    }
                }
            }
        }

        stage('Generate Report') {
            steps {
                dir('portfolio-portal') {
                    sh 'npm run report:generate'
                    junit 'cypress/reports/junit.xml'
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'cypress/reports', reportFiles: 'index.html', reportName: 'Cypress Test Report'])
                }
            }
        }
    }
}