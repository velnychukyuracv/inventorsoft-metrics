/* This script cleans the embedded test database after execution of each test method */

DELETE FROM users;
DELETE FROM password_reset_tokens;
DELETE FROM data_source_representations;
DELETE FROM groups;

ALTER SEQUENCE hibernate_sequence RESTART WITH 1;