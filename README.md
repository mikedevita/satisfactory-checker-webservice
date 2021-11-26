# satisfactory-checker-webservice
A nodejs expressjs web api service wrapped around [dopeghoti\SF-Tools](https://github.com/dopeghoti/SF-Tools)\sfcheck.py package

# Intended Purpose
Is to be ran on the localhost only, and called using another service that has authentication mechanisims built-in, i.e; a next.js web app.

## How-to use

1. clone this repository `git@github.com:mikedevita/satisfactory-checker-webservice.git`
2. cd into the directory and install nodejs packages (expressjs) `cd satisfactory-checker-webservice && npm i`
3. start the app by running `npm start` or `node index.js`
    * **Note** By default, the web-service will run on localhost, port 3010
4. Issue an HTTP POST call to the `http://localhost:3010/statuscheck` URL, providing the ipAddressm, and optionally the port of the server to check

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ipAddress":"xxx.xxx.xxx.xxx"}' \
  http://localhost:3010/statuscheck
```

The service will return a JSON object containing the:

* IP Address
* Port number
* Response Time in Miliseconds
* Server State (status, idle, Preparing world, Live)
* Server Version

```json
{
    "ipAddress": "192.168.10.25",
    "port": 15777,
    "responseTimeInMsec": "0.38",
    "serverState": "Live",
    "serverVersion": "174005"
}
```