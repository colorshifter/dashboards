#!/bin/sh

$TERMINAL -e bash -c "cd node-server && npm start"&
$TERMINAL -e bash -c "cd angular2-client && npm start"&
