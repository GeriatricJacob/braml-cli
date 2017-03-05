function compile(fileIn, fileOut) {
  var jetpack = require('fs-jetpack');
  var parse = require('braml');

  var fileContents = jetpack.read(fileIn);

  var ret = parse(fileContents);

  if (ret[0] == true) {
    jetpack.write(fileOut, ret[1]);
    console.log(`Compiled ${fileIn} to ${fileOut}`);
  }
  else {
    console.log('Was not compiled due to errors.');
  }
}
module.exports = compile;
