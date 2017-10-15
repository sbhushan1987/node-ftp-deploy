const Client = require('ftp');
const path = require('path');
const fs = require('fs');
// In newer Node.js versions where process is already global this isn't necessary.
const process = require('process');

const fullPath = __dirname;
const totalFile = 0;
const finishedFile = 0;

const c = new Client();

class nodeFtpDeploy {

	constructor(fbToken) {
		// e.g. '/httpdocs';
    var remoteFullPath = 'REMOTE_FOLDER';

    c.connect({
      host: 'FTP_HOST',
      user: 'FTP_USERNAME',
      password: 'FTP_PASSWORD',
    });

    c.on('ready', function() {

      console.log('Remember to build before upload');
			// e.g. '/build';
      redDir('LOCAL_FOLDER');

    });
  }


  loopFolderFiles(files, subPath) {
    files.forEach( function( file, index ) {
        if (fs.lstatSync(fullPath + subPath + '/' + file).isDirectory()) {
          redDir(subPath + '/' + file);
        } else {

          totalFile++;
          process.stdout.write('  ' + finishedFile + '/' + totalFile + '\r');

          // Must call after ready
					// e.g. '/httpdocs';
          c.mkdir('REMOTE_FOLDER' + subPath, true, function() {
            c.put(fullPath + subPath + '/' + file, remoteFullPath + subPath + '/' + file, function(err) {
              if (err) {
                throw err;
              }
              finishedFile++;
              process.stdout.write('  ' + finishedFile + '/' + totalFile + '\r');
              if (finishedFile === totalFile) {
                process.stdout.write('upload finished\n');
                c.end();
              }
            })
          })
        }
    });
  }

  redDir(subPath) {
    fs.readdir( fullPath + subPath, function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        }

        loopFolderFiles(files, subPath);
    });
  }

}

module.exports = exports = nodeFtpDeploy;
