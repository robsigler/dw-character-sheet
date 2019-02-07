#!/bin/bash

aws s3 cp index.html s3://robsiglerstatic/index.html
aws s3 cp dist/bundle.js s3://robsiglerstatic/dist/bundle.js
aws s3 cp dist/bundle.js.map s3://robsiglerstatic/dist/bundle.js.map
aws s3 cp node_modules/react/umd/react.development.js s3://robsiglerstatic/node_modules/react/umd/react.development.js
aws s3 cp node_modules/react-dom/umd/react-dom.development.js s3://robsiglerstatic/node_modules/react-dom/umd/react-dom.development.js
