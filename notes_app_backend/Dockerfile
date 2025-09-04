# Use a JDK image for the build stage
FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# Copy Maven wrapper and other project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Ensure mvnw has executable permissions
RUN chmod +x mvnw

# Build your application into a JAR
RUN ./mvnw clean package -DskipTests

# Use a lightweight JRE image for the final stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
