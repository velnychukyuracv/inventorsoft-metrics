/* This script fills the embedded test database with valid data */

/* ATTENTION!!! If you need to add some specific data for your purposes, please, do it according to
existing constraints and entity relationships. Do not change existing scripts, unless database structure
was changed. Inconsistent data may affect results of other tests */



/* This piece of code fills the "uses" table with valid data which has relationships in other tables */
INSERT INTO users (id, created_at, updated_at, first_name, last_name, email, password, status, last_sign_in)
VALUES((SELECT nextval('hibernate_sequence')), '2018-04-20 00:00:01', '2018-04-20 00:00:01', 'Petia', 'Petrov', 'bogden1979@yahoo.com', '$2a$10$AFqQiawMXrgiwGMwOyKeKO717AU9FkWTCBmaAI5Hd1Czc45oPxBqW', 'ACTIVE', '2018-04-20 00:00:01');



/* This piece of code fills the "password_reset_tokens" table with valid data which has relationships in other tables */
INSERT INTO password_reset_tokens (user_id, token, created_at, updated_at, is_used, expire_time)
VALUES (1, 'fc2fc4b2-adec-4816-bcaf-f71e87ba87d1', '2018-04-20 00:00:01', '2018-04-20 00:00:01', FALSE, '2018-04-20 00:00:01');