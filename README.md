[![NPM](https://nodei.co/npm/node-ftp-deploy.png)](https://npmjs.org/package/node-ftp-deploy)

# node-ftp-deploy

A simple folder to folder deploy tools, some time just don't want to git push and run CI for small project ;D

## How to use

`npm install -g node-ftp-deploy`

```nodedeploy ftp_host username password folder_in_running_path remote_path```

> Example

> Your want to deploy `build` folder from `my_react_project` to remote ftp `html` folder

> `cd my_react_project`

> `nodedeploy example.io username password /build /html`

## Args

| Argument | Description |
| ------ | ------ |
| ftp_host | Your remote FTP host |
| username | Your remote FTP username |
| password | Your remote FTP password |
| folder_in_running_path | Folder you want to upload |
| remote_path | Folder you want to received on FTP host |
- temp not support sftp
