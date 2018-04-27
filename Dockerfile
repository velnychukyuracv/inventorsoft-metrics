FROM openjdk:9
RUN apt-get update
COPY ./target/inventorsoft-matrics.jar /
CMD ["./inventorsoft-matrics.jar"]
VOLUME /app