[![NPM](https://nodei.co/npm/nodedeploy.png)](https://npmjs.org/package/nodedeploy)

# node-ftp-deploy

A simple folder to folder deploy tools, some time just don't want to git push and run CI for small project ;D 

## How to use


`nodedeploy ftp_host username password folder_in_running_path remote_path`

> Example
> Your want to deploy `build` folder from `my_react_project` to remote ftp `html` folder
> `npm install -g node-ftp-deploy`
> `cd my_react_project` // enter the folder
> `nodedeploy example.io username password /build /html` // upload ./build 
