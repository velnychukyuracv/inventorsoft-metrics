CREATE TABLE IF NOT EXISTS data_source_representations (
  id serial NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  data_source_name VARCHAR UNIQUE NOT NULL,
  data_source_representation VARCHAR NOT NULL,

  PRIMARY KEY (id)
)