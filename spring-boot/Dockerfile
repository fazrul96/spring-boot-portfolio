# Use an official OpenJDK runtime as a parent image
FROM openjdk:17
LABEL authors="Fazrul"

# Set the working directory in the container
WORKDIR /app

# Copy the specific JAR file into the container at the specified working directory
COPY build/libs/demo-0.0.1-SNAPSHOT.jar .
COPY build/libs/demo-0.0.1-SNAPSHOT-plain.jar .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run your application
CMD ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]