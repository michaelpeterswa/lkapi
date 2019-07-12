#!/bin/bash

echo "testing the codebase..."
npx nyc --reporter=json-summary --reporter=text-summary mocha --exit