CREATE TABLE IF NOT EXISTS token_db_representation (
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  jwt_token VARCHAR NOT NULL,
  expiration_token VARCHAR NOT NULL,

  PRIMARY KEY (user_id),

  CONSTRAINT PASSWORD_RESET_TOKEN_FK
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE
);