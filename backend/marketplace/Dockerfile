# Stage 1: Build the backend

FROM maven:3.9.9-sapmachine-22 AS build
WORKDIR /home/app
COPY pom.xml ./
COPY backend/marketplace/src ./src
RUN mvn -f backend/marketplace/pom.xml clean package -DskipTests


# Stage 2: Create the final image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /home/app

# Copy the backend JAR from the build stage
COPY --from=build /home/app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]