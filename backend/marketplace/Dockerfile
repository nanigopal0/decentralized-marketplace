# Stage 1: Build the backend


FROM maven:3.9.8-sapmachine-22 AS build
WORKDIR /home/app
COPY pom.xml ./
COPY backend/marketplace/src ./src
RUN mvn -f backend/marketplace/pom.xml clean package -DskipTests
#COPY src ./src
#RUN mvn clean package -DskipTests

# Stage 3: Create the final image
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy backend JAR
COPY --from=backend-build /app/backend/marketplace/target/marketplace-*.jar app.jar

# Copy frontend build
COPY --from=frontend-build /app/build ./frontend

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]