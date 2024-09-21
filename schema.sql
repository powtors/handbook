CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  author INTEGER NOT NULL,
  title VARCHAR(128) UNIQUE NOT NULL,
  description VARCHAR(256),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP
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
