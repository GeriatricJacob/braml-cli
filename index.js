#! /usr/bin/env node

var jetpack = require('fs-jetpack');
var compile = require('./compile.js');
var braml = require('braml');

var userArgs = process.argv.slice(2);
var exit = false;
var cont = false;
var param = [];
var command = [];
var exist = false;

for (var i = 0; i < userArgs.length; i++) {
  var arg = userArgs[i];
  if (arg.charAt(0) == '-') {
    cont = true;
    param.push(arg);
  }
  else {
    command.push(arg);
  }
}

if (userArgs[0] == 'compile') {
  if (cont) {
    cont = false;
    for (var i = 0; i < param.length; i++) {
      if (param[i] == '-o') {
        cont = true;
      }
    }
    if (cont) {
      cont = false;
      if (jetpack.exists(command[1])) {
        if (jetpack.exists(command[2]) && param.indexOf('-f') == 1) {
          compile(command[1], command[2]);
        }
        else if (!jetpack.exists(command[2])) {
          compile(command[1], command[2]);
        }
        else {
          console.error(`'${command[2]}' already exists. Try using '-f' to force overwrite.`);
        }
      }
      else {
        console.error(`'${command[1]}' does not exist.`);
      }
    }
    else {
      console.error(`'${param}' are not any of the expected parameters for the compile command.`);
    }
  }
  else {
    console.error('No parameters were recieved.');
  }
}
else if (userArgs[0] == 'parse') {
  if (jetpack.exists(command[1])) {
    console.log(braml(jetpack.read(command[1]))[1]);
  }
  else {
    console.error(`'${command[1]}' does not exist.`);
  }
}
else if (userArgs[0] == 'help') {
  console.log(
`Commands:
  Compile -- Takes in a braml file and spits out an html file.
  Help    -- Displays this command and parameters definition.

Parameters:
  -o -- Tells the command where to ouput. e.g 'braml compile index.html -o index.braml'
  -f -- Tells the command to execute no matter what.`);
}
else if (command[0] == null) {
  console.error('Command Was not Passed.');
  console.log("Try using the 'help' command.");
}
else {
    console.error(`'${userArgs[0]}' is not a braml-cli command.`);
}
