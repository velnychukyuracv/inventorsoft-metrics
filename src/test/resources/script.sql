/* This script fills the embedded test database with valid data */

/* ATTENTION!!! If you need to add some specific data for your purposes, please, do it according to
existing constraints and entity relationships. Do not change existing scripts, unless database structure
was changed. Inconsistent data may affect results of other tests */



/* This piece of code fills the "uses" table with valid data which has relationships in other tables */
INSERT INTO users (id, created_at, updated_at, first_name, last_name, email, password, status, last_sign_in)
VALUES((SELECT nextval('hibernate_sequence')), '2018-04-20 00:00:01', '2018-04-20 00:00:01', 'Petia', 'Petrov', 'bogden1979@yahoo.com', '$2a$10$eSHpNUbGG9YBeda8RkgtjOnCPg0HqIIT5MGqIFvn1PAkDnfoskpui', 'ACTIVE', '2018-04-20 00:00:01');