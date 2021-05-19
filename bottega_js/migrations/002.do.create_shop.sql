CREATE TABLE shops(
  id SERIAL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255),
  description TEXT,
  address JSONB,
  tags VARCHAR(100)[],
  PRIMARY KEY (id)
)