const p = require('phin')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
app.engine('art', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

let status = {}
let endpoints = [
    'snap1.d.tube',
    'upldr1.d.tube',
    'upldr2.d.tube',
    'upldr3.d.tube',
    'upldr4.d.tube',
    'upldr5.d.tube',
    'upldrg1.d.tube',
    'upldrg2.d.tube',
    'upldrg3.d.tube',
    'upldrg4.d.tube',
]

app.get('/', function (req, res) {
    res.render('index.art', {
        status: status
    });
});

app.listen(port);

function getStatus(endpoint) {
    p('https://'+endpoint+'/getStatus?details=true', (err, res) => {
        if (!err) {
            try {
                status[endpoint] = JSON.parse(res.body)
            } catch(e) {
                status[endpoint] = null
            }
        }
            
    })
}
function getAllStatus() {
    console.log(Object.keys(status).length)
    for (let i = 0; i < endpoints.length; i++)
        getStatus(endpoints[i])
}

setInterval(getAllStatus, 10000)