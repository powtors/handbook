#!/bin/bash

source .env

function sql {
  docker compose exec db psql -aqtc "$@" $DB_NAME $DB_USER
}

case $1 in
  add)
    if [ -n "$2" ]; then
      sql "INSERT INTO authors (github) VALUES ('$2')"
      exit
    fi;;
  del)
    if [ -n "$2" ]; then
      sql "DELETE FROM authors WHERE github = '$2'"
      exit
    fi;;
  ls)
    sql "SELECT * FROM authors"
    exit;;
esac

echo "Usage: $0 <command>"
echo "Commands:"
echo "  add <github>"
echo "  del <github>"
echo "  ls"
