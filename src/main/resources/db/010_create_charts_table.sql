CREATE TABLE IF NOT EXISTS charts (
  id SERIAL NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  name VARCHAR NOT NULL,
  query VARCHAR NOT NULL,
  filter_columns VARCHAR DEFAULT NULL,
  visible_columns VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  order_field INT NOT NULL,
  attributes VARCHAR NOT NULL,
  data_source_id BIGINT NOT NULL,

  PRIMARY KEY (id),

  CONSTRAINT DATA_SOURCE_FK
  FOREIGN KEY (data_source_id)
  REFERENCES data_source_representations (id)
  ON DELETE CASCADE
);