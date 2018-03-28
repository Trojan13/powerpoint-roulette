var google = require('google');
var Bottleneck = require('bottleneck');
var limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 2000
});

const MAX_RESULTS = process.env.MAX_RESULTS || 50;
google.resultsPerPage = MAX_RESULTS;

const TOPICS = ["swinging","Mercury (the chemical element)","Sixty Minutes (TV show)","carbon pollution","cookies","ice","obstruction of justice","Saturn (the Roman god)","taxing the middle class","artificial joints","electric cars","Sabbath","oldest mosque in the US","restraint","voter ID laws","Letting the chips fall where they may","Eastern Christianity","missing people","artificial limbs","figs","government waste","tracking","Black history","signs","JetBlue","solar energy","submarines","Rhodes Scholarship","sequestration","most expensive store in a country of your choice","opposites","pauses","self-pity","noise","homosexuality","Linux","marathons","birds","nagging","debate","weirdest US presidents","dipping toes in the water","largest prison in a country of your choice","sports cards","self-worth","medieval foods","CPR (Cardiopulmonary resuscitation)","Calvin Coolidge","first monument in the world","Alcatraz Island","model airplanes","democratization of the Middle East","attention deficit hyperactivity disorder (ADHD)","most expensive bridge in the world","what vegetable would you be?","blessings","swearing in public","zoos","tea","stroke","largest rodeo in the world","semiconductors","San Quentin prison","passwords","longest roller coaster in the US","most expensive house in a country of your choice","smoke detectors","losers","cowardice","practicing what you preach","nail polish","retirement homes","oldest building in a country of your choice","jokes","organ","scooters","substance abuse","telemarketing","originality","tallest cathedral in the US","holistic medicine","troubleshooting","moodiness","superstition","quadriplegia","eyes bigger than stomach","dark horse","Silvio Berlusconi","spreadsheets","Johannes Gutenberg","wedding planning","largest restaurant in the US","nervousness","Costco","genocide","BBC (British Broadcasting Corporation)","values","bifocal glasses","coming clean","first bridge in a country of your choice","largest restaurant in the world","grabbing the bull by its horn","Edmund Kean (19th century English actor)","mosques","soccer","apathy","race-based Affirmative Action","painting","customs","festivals","comets","sound bites","leadership versus management","memorials","miss World","world's smallest countries","London","original sin","oldest orphanage in the US","biting off more than we can chew","Warren Buffett","orthopedic surgery","Yellowstone National Park","tourism industry","lip service","sexual abuse","emergency preparedness","sharing","wishful thinking","dream cruises","predictability","aquariums","nails","birth defects","interest","economic inequality","pumpkin carving","first hotel in the US","oldest theater in the US","red meat","mobs","Wi-Fi","melodrama","oppressive regimes","first shrine in a country of your choice","penguins","arenas (indoor stadiums)","perspective","Florence Nightingale (founder of modern nursing)","bumper stickers","violence in schools","prison overcrowding","most expensive monument in a country of your choice","productivity","Persian Gulf region and states","academic performance","personality","sensuality","detachment parenting","neutrality"];

/**
 * GET /
 */
exports.appPost = function (req, res) {
    req.assert('keyword', 'Keyword cannot be blank').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        req.flash('error', errors);
        return res.redirect('/');
    }

    google('filetype:ppt ' + req.body.keyword, function (err, data) {
        if (errors) {
            req.flash('error', errors);
            return res.redirect('/');
        } else if (data.links.length <= 1) {
            req.flash('error',  { param: 'keyword', msg: 'No results found!', value: '' });
            return res.redirect('/');
        }

        let tmpMax = MAX_RESULTS;
        
        if (MAX_RESULTS => data.links.length) {
            tmpMax = data.links.length;
        }
        let rnd = Math.round(Math.random() * (tmpMax - 1) + 1);
        res.render('result', {
            title: 'Result',
            link: data.links[rnd]
        });
    });
};

/**
 * GET /
 */
exports.luckyPost = function (req, res) {
    var errors = req.validationErrors();
    var topic = TOPICS[Math.round(Math.random() * (TOPICS.length - 0) + 0)];

    if (errors) {
        req.flash('error', errors);
        return res.redirect('/');
    }

    google('filetype:ppt ' + topic, function (err, data) {
        if (errors) {
            req.flash('error', errors);
            return res.redirect('/');
        } else if (data.links.length <= 0) {
            req.flash('error',  { param: 'keyword', msg: 'No results found!', value: '' });
            return res.redirect('/');
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