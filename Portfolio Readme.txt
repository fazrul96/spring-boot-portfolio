Portfolio

Port:
npx kill-port 3000

Frontend
npx create-react-app portfolio-portal
npm install react-bootstrap bootstrap

Backend
Install Java

Instead using official java (https://www.oracle.com/java/technologies/downloads/#jdk20-windows), recommend using https://bell-sw.com/pages/downloads/

Generate Java
https://start.spring.io/

Open terminal run this command
./gradlew bootRun (Recommended)
./mvnw spring-boot:run

Tutorial
https://spring.io/guides/tutorials/react-and-spring-data-rest/

Run docker image
docker build -t portfolio-portal-app:latest .
docker run --name portfolio-portal-app -p 3000:3000 portfolio-protal-app:latest

docker build -t spring-boot-app:latest .
docker run --name spring-boot-app  -p 8080:8080 spring-boot-app:latest