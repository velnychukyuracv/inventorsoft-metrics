CREATE TABLE IF NOT EXISTS groups (
  id serial NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  uuid VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  materialIcon VARCHAR NOT NULL,
  order_field VARCHAR NOT NULL,

  PRIMARY KEY (id)
)