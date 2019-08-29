const request = require('request');
const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = (page, localPath) => {
  fs.readFile(localPath, (err, data) => {
    if (err) {
      console.log('Error :' + err);
      return;
    }
    // If local path is empty
    if (data.length === 0) {
      req(page, localPath);
    } else {
      rl.question('File is not empty. If you want to over write it type in Y? Else just type enter', (answer) => {
        // If user answer yes
        if (answer === 'Y') {
          req(page, localPath);
        } else {
          console.log("The page wasn't saved");
          rl.close();
          return;
        }
      });
    }
  });
};

const writer = function(localPath, body) {
  fs.writeFile(localPath, body, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Downloaded and saved " + body.length + " bytes to " + localPath);
  });
};

const req = function(page, localPath) {
  request(page, (error, _, body) => {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
      return;
    } else {
      writer(localPath, body);
      rl.close();
    }
  });
};

fetcher('http://www.example.com', './index.html');