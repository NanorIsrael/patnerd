#!/bin/bash

cat migrations/db.sql | psql -hlocalhost -Upostgres -dpatnerd