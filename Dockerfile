FROM openjdk:9
RUN apt-get update
COPY ./target/inventorsoft-metrics.jar /
CMD ["./inventorsoft-metrics.jar"]
VOLUME /app