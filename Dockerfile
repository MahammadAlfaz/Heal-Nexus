# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY backend/pom.xml backend/pom.xml
COPY backend/mvnw backend/mvnw
COPY backend/.mvn backend/.mvn

# Copy the source code
COPY backend/src backend/src

# Copy tessdata for OCR
COPY backend/tessdata backend/tessdata

# Make the Maven wrapper executable
RUN chmod +x backend/mvnw

# Build the application
RUN cd backend && ./mvnw clean package -DskipTests

# Expose the port the app runs on
EXPOSE 8083

# Run the jar file
CMD ["java", "-jar", "backend/target/healthcare-backend-0.0.1-SNAPSHOT.jar"]
