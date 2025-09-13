-- migrate:up
CREATE TABLE todos (
  id text PRIMARY KEY,
  title text NOT NULL,
  completed boolean NOT NULL DEFAULT FALSE
);

-- migrate:down
DROP TABLE todos;
