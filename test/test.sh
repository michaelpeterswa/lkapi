#!/bin/bash

echo "testing the codebase..."
npx nyc --reporter=json-summary mocha --exit