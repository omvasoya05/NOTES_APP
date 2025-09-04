# Use a JDK image for the build stage
FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
# Build your application into a JAR
RUN ./mvnw clean package -DskipTests

# Use a lightweight JRE image for the final, smaller image
FROM openjdk:17-jre-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
