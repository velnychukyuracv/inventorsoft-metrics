CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL NOT NULL,
  token VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  is_used BOOLEAN NOT NULL,
  expire_time TIMESTAMP NOT NULL,

  PRIMARY KEY (id),

  CONSTRAINT PASSWORD_RESET_TOKEN_FK
  FOREIGN KEY (id)
  REFERENCES users (id)
  ON DELETE CASCADE
);