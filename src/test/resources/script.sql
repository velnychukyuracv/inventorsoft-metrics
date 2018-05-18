/* This script fills the embedded test database with valid data */

/* ATTENTION!!! If you need to add some specific data for your purposes, please, do it according to
existing constraints and entity relationships. Do not change existing scripts, unless database structure
was changed. Inconsistent data may affect results of other tests */



/* This piece of code fills the "uses" table with valid data which has relationships in other tables */
INSERT INTO users (id, created_at, updated_at, first_name, last_name, email, password, last_sign_in)
VALUES((SELECT nextval('hibernate_sequence')), '2018-04-20 00:00:01', '2018-04-20 00:00:01', 'Petia', 'Petrov', 'vasyl.pahomenko2018@gmail.com', '$2a$10$eSHpNUbGG9YBeda8RkgtjOnCPg0HqIIT5MGqIFvn1PAkDnfoskpui', '2018-04-20 00:00:01');

INSERT INTO users (id, created_at, updated_at, first_name, last_name, email, password, last_sign_in)
VALUES((SELECT nextval('hibernate_sequence')), '2018-04-20 00:00:01', '2018-04-20 00:00:01', 'Vitia', 'Grishin', 'test2018@gmail.com', '$2a$10$eSHpNUbGG9YBeda8RkgtjOnCPg0HqIIT5MGqIFvn1PAkDnfoskpui', '2018-04-20 00:00:01');



/* This piece of code fills the "uses" table with valid data which has relationships in other tables */
INSERT INTO data_source_representations (id, created_at, updated_at, data_source_name, data_source_representation)
VALUES((SELECT nextval('hibernate_sequence')), '2018-04-20 00:00:01', '2018-04-20 00:00:01', 'TEST_H2_1', 'J/YG1F3XuVEczNgZMWFVUJ6b1OplzPBGBK3Dl3D5ZLBqxHM9rxPK5y2XdcaXZIH3rLipX47cM9GBPGDV9BmTrj9rterxACFihPAxqtiyMBFfF5LrocTmIDvXT3bj2iVoYTPeWgyXNfmLw85D7HKisJYTtfuCTZ22dv2IpMGFkaN58fBS5tHiYZwJyVB3Fsd5qkRWj8zA0uC6FFulOnacpua9H34frxYNH0L5X9bKaTQW5zf5Ymv3wEHuWn7zyL01');

