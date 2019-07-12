#!/bin/bash

echo "testing the codebase..."
npx nyc --reporter=json-summary --reporter=html --reporter=cobertura --reporter=text-summary mocha --exit