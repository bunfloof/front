#!/bin/bash
RANDOM_CHARS=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 4 | head -n 1)
DATETIME=$(date +"%Y-%m-%d-%H%M%S")
FILENAME="out-${RANDOM_CHARS}-${DATETIME}.zip"

(cd ./out && zip -r "../${FILENAME}" .)

echo "Created: ${FILENAME}"