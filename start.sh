#!/bin/sh

set -e

echo "set environment"
cp .env.example .env
source .env

echo "install npm packages"
npm install

echo "run linter"
npm run lint

echo "run prettier"
npm run prettier

echo "run unit tests"
npm run test:ci

echo "$@"
