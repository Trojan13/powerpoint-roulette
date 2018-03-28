
var google = require('google');
var Bottleneck = require('bottleneck');
var limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 2000
});

const MAX_RESULTS = 25;
google.resultsPerPage = MAX_RESULTS;

let googleSearch = (keyword, cb) => {
    google('filetype:ppt ' + keyword, function (err, res) {
        if (err) cb(err)
        let tmpMax = MAX_RESULTS;
        if (MAX_RESULTS > res.links.length) {
            tmpMax = res.links.length
        }

        let rnd = Math.round(Math.random() * (tmpMax - 1) + 1);
        console.log(rnd);
        cb(null, res.links[rnd]);
    })

}


googleSearch("penis", (err, data) => {
    console.log(data);
});

/*
let buySkin = () => {
    return 0;
}
*/

//module.exports.buySkin = buySkin;
