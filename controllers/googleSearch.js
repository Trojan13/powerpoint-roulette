var google = require('google');
var Bottleneck = require('bottleneck');
var limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 2000
});

const MAX_RESULTS = 50;
google.resultsPerPage = MAX_RESULTS;

/**
 * GET /
 */
exports.appPost = function (req, res) {
    req.assert('keyword', 'Keyword cannot be blank').notEmpty();
    console.log(req.body);
    console.log(res.body);
    var errors = req.validationErrors();

    if (errors) {
        req.flash('error', errors);
        return res.redirect('/');
    }

    google('filetype:ppt ' + req.body.keyword, function (err, data) {
        if (errors || data.links.length <= 0) {
            req.flash('error', errors);
            return data.redirect('/');
        }
        let tmpMax = MAX_RESULTS;
        if (MAX_RESULTS > data.links.length) {
            tmpMax = data.links.length
        }
        let rnd = Math.round(Math.random() * (tmpMax - 1) + 1);
        res.render('result', {
            title: 'Result',
            link: data.links[rnd]
        });
    });
};
