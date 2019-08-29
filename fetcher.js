const request = require('request');
const fs = require('fs');

const input = process.argv;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = (url, localPath) => {
  fs.readFile(localPath, (err, data) => {
    if (err) {
      console.log('Error :' + err);
      rl.close();
      return;
    }
    // If local path is empty
    if (data.length === 0) {
      downloadToPath(url, localPath);
      rl.close();
    } else {
      rl.question('File is not empty. If you want to over write it type in Y? Else just type enter', (answer) => {
        // If user answer yes
        if (answer === 'Y') {
          downloadToPath(url, localPath);
        } else {
          console.log("The url content wasn't saved");
        }
        rl.close();
      });
    }
  });


};

const writeToFile = function(localPath, body) {
  fs.writeFile(localPath, body, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Downloaded and saved " + body.length + " bytes to " + localPath);
    }
  });
};

const downloadToPath = function(url, localPath) {
  request(url, (error, _, body) => {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
    } else {
      writeToFile(localPath, body);
    }
  });
};

fetcher(input[2], input[3]);