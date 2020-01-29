exports.handler = function (event, context, callback) {
    // Dependencies
    const fs = require("fs");
    const converter = require("/opt/odv_converter");
    const rsa = require("node-rsa");
    const encryption = require("/opt/encryption");

    //read consumer-key, -secret and application secret
    const access_rawdata = fs.readFileSync("/opt/access.json");
    const access = JSON.parse(access_rawdata);

    var AWS = require("aws-sdk");
    AWS.config.update({region: "eu-central-1"});
    var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"}); //initialize database

    //initial values to be replaced with the actual parameters
    var mail = "empty";
    var pwhash = "empty";

    if (event.body) {  //check, if data was received at all
        var postData = event.body.split("*");
        if (postData.length >= 5) { //check, if there are enough parameters given, read parameters, check secret-value
            mail = postData[1];
            pwhash = postData[3];
            if (postData[5] !== access.app_secret) { //check secret-value
                console.log("wrong secret");
                return;
            }
        }
    }

    //parameters to read password hash and userID from database
    var params = {
        TableName: "UserData",
        Key: {
            "Mail": {
                S: mail
            }
        }
    };

    //read password hash and user access token from database
    ddb.getItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            if (data.Item.PWHash.S === pwhash) {

                var params;

                if (data.Item.UserID) {//check if the user already has an userID to query for data
                    const userId = data.Item.UserID.S;

                    params = {
                        TableName: "FitnessData",
                        KeyConditionExpression: "UserID = :key",
                        ExpressionAttributeValues: {
                            ":key": {"S": userId}
                        }
                    };


                    //read all entries for the given userID
                    ddb.query(params, function (err, data) {
                        if (err) {
                            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                        } else {
                            const userData = data.Items;
                            var fileData = "{\"title\": \"ODV JSON export\", \"data\":["; //TODO

                            if (userData) { //convert all entries to the OpenDataVault-format and append them to the fileData
                                userData.forEach(function (item) {
                                    let entries = converter.odvConverter(JSON.parse(encryption.encryption(item.data.S, access.dataEncPW, true)), item.sumType.S); //decrypt the fitness data and give it to the odv_converter
                                    entries.forEach(function (entry) {
                                        fileData += JSON.stringify((entry.Item.vaultEntry)) + ",";
                                    });
                                });

                                //cut off last ","
                                fileData = fileData.substring(0, fileData.length - 1);
                                fileData += "]}";

                                if (fileData === "{\"title\": \"ODV JSON export\", \"data\":]}") {//check, if no fitness data was found
                                    //create response, telling the website that no data was found
                                    const res = {
                                        "statusCode": 401,
                                        "headers": {
                                            "Content-Type": "text/plain",
                                        },
                                        "body": "no data"
                                    };
                                    //send response
                                    callback(null, res);
                                } else {

                                    //initialize rsa and import the public key from access.json
                                    let key = new rsa();
                                    key.importKey(access.pubKey, "pkcs1-public");
                                    //encrypt the data to be sent to the website
                                    let encrypted = key.encrypt(fileData, "base64");

                                    const res = {
                                        "statusCode": 200,
                                        "headers": {
                                            "Content-Type": "text/plain",
                                        },
                                        "body": encrypted
                                    };

                                    //send response
                                    callback(null, res);
                                }
                            }
                        }
                    });
                } else {
                    //create response, telling the website that no data was found
                    const res = {
                        "statusCode": 401,
                        "headers": {
                            "Content-Type": "text/plain",
                        },
                        "body": "no data"
                    };
                    //send response
                    callback(null, res);
                }
            } else {
                //create response, telling the user that the given password is incorrect
                const res = {
                    "statusCode": 401,
                    "headers": {
                        "Content-Type": "text/plain",
                    },
                    "body": "error with login"
                };
                //send response
                callback(null, res);
            }
        }
    });
};