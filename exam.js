const http = require("http");
const fs = require("fs");
const { parse } = require("csv-parse");

let url = "https://shopify.dev/api/admin-rest/2022-04/resources/customer";

// we can get customers from shopify using csv's data
async function getCustomersFromShopify(){
    // Step 1: Handle to get the customer's information from shopify API
    https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            // do something with JSON
        } catch (error) {
            console.error(error.message);
        };
    });

    // Step 3: Return error in here.
    }).on("error", (error) => {
        console.error(error.message);
    });
}

// we can get customer_ids from csv file
async function readCsv() {
    // Step 1: Call to getCustomersFromShopify()
    const data = this.getCustomersFromShopify();
    var csvData = [];
    
    // Step 2: Read Csv file from saved path in local
    fs.createReadStream("D:\\data\\customer.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        console.log(row);
        csvData.push(row);
    })
}

// we want to save customers data to db
async function saveToDB() {
    // Step 1: Connect to db: mysql, postgresql, mongodb

    // Step 2: Read data from readCsv()

    // Step 3: Save result into db
}
