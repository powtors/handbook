CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github VARCHAR(39) UNIQUE NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  author UUID NOT NULL,
  title VARCHAR(128) UNIQUE NOT NULL,
  description VARCHAR(256),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP,
  CONSTRAINT fk_author FOREIGN KEY(author) REFERENCES authors(id)
);

CREATE FUNCTION update_timestamp()
  RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = now();
  return new;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER autoupdate_post_timestamp
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
