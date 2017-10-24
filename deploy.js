const Client = require('ftp');
const path = require('path');
const fs = require('fs');
// In newer Node.js versions where process is already global this isn't necessary.
const process = require('process');

const fullPath = __dirname;
let totalFile = 0;
let finishedFile = 0;

const c = new Client();

class NodeFtpDeploy {

	constructor(host, username, password, localFolder, remoteFolder) {
		// e.g. '/httpdocs';
    this.remoteFullPath = remoteFolder;
		this.localFolder = localFolder;

    c.connect({
      host: host,
      user: username,
      password: password,
    });

    c.on('ready', function() {
      console.log('Remember to build before upload');
			// e.g. '/build';
      this.redDir(localFolder);
    }.bind(this));

		this.loopFolderFiles = this.loopFolderFiles.bind(this);
		this.redDir = this.redDir.bind(this);
  }


  loopFolderFiles(files, subPath) {
    files.forEach( function( file, index ) {
        if (fs.lstatSync(subPath + '/' + file).isDirectory()) {
          this.redDir(subPath + '/' + file);
        } else {

          totalFile++;
          process.stdout.write('  ' + finishedFile + '/' + totalFile + '\r');

          // Must call after ready
					// e.g. '/httpdocs';

					c.mkdir(this.remoteFullPath + subPath.substr(this.localFolder.length), true, function() {
            c.put(subPath + '/' + file, this.remoteFullPath + subPath.substr(this.localFolder.length) + '/' + file, function(err) {
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
          }.bind(this))
        }
    }.bind(this));
  }

  redDir(subPath) {
    fs.readdir( subPath, function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        }

        this.loopFolderFiles(files, subPath);
    }.bind(this));
  }

}

module.exports = exports = NodeFtpDeploy;
