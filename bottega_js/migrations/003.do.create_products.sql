CREATE TABLE products(
  id SERIAL,
  shop_id INTEGER REFERENCES shops(id),
  name VARCHAR(255),
  description TEXT,
  image VARCHAR(500),
  price INTEGER,
  um VARCHAR(255),
  tags VARCHAR(100)[],
  PRIMARY KEY (id)
)