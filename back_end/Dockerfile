FROM openjdk:8
RUN apt-get update
RUN apt-get install sudo
COPY ./target/inventorsoft-metrics.jar /
CMD ["sudo", "java", "-jar", "-Dspring.profiles.active=prod", "-Dspring.config.location=file:/app/application-prod.yml,classpath:application.yml", "/inventorsoft-metrics.jar"]
VOLUME /app