/* This script cleans the embedded test database after execution of each test method */

DELETE FROM users WHERE id = 1;
DELETE FROM password_reset_tokens WHERE user_id = 1;

ALTER SEQUENCE hibernate_sequence RESTART WITH 1;