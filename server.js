//integrate New Relic in to the application
require('newrelic');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const Window = require('window');
var _ = require('lodash');
var session = require('express-session');
var cookieSession = require('cookie-session')
var storage = require('sessionstorage')
var passport = require('passport');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var intersect = require('intersect');
var https = require('https');
var settings = require('./settings.js');

var app = express();

// work around intermediate CA issue
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const window = new Window();

//createServer() section is run only for local environment
if (process.env.APP_ENV != "dev" && process.env.APP_ENV != "test" && process.env.APP_ENV != "prod") {
    https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app).listen(9443);
}

app.use(cookieParser());
app.use(cookieSession({
    name: "session",
    keys: ['key1', 'key2']
}));
//app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'keyboard cat'}));

app.use(function (req, res, next) {
    next();
});

app.use(passport.initialize());
app.use(passport.session());

var OpenIDConnectStrategy = require('passport-idaas-openidconnect').IDaaSOIDCStrategy;
var Strategy = new OpenIDConnectStrategy({
        authorizationURL: settings.authorization_url,
        tokenURL: settings.token_url,
        clientID: settings.client_id,
        scope: 'openid',
        response_type: 'code',
        clientSecret: settings.client_secret,
        callbackURL: settings.callback_url,
        skipUserProfile: true,
        issuer: settings.issuer_id,
        addCACert: true,
        CACertPathList: [settings.cert, "/DigiCertGlobalRootCA.crt", "/DigiCertSHA2SecureServerCA.crt"]
    },

    function (iss, sub, profile, accessToken, refreshToken, params, done) {
        process.nextTick(function () {
            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
            done(null, profile);
        })
    }
);

passport.use('openidconnect', Strategy);

passport.serializeUser(function (user, done) {
    //console.log("Serialize user token = ",token);
    console.log("User Blue groups:" + user['_json'].blueGroups);
    var userGroups;
    userGroups = user['_json'].blueGroups;
    storage.setItem('userlastname', user['_json'].lastName);
    storage.setItem('userfirstname', user['_json'].firstName);
    
    var appGroups = settings.appAccess.split(",");
    console.log(" App groups:" + appGroups);
    user['_json'].blueGroups = intersect(userGroups, appGroups);
    console.log("Required User groups:" + user['_json'].blueGroups);
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    //console.log("Deserialize user token = ",user);
    done(null, user);
});

// Get our API routes

app.get('/login', passport.authenticate('openidconnect', function (err, user) {
    if (err) {
        console.log('Unable to login via OpenID err=', err);
    }
    // if (!user) { return res.redirect('/login'); }
}));

function ensureAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.originalUrl = req.originalUrl;
        res.redirect('/login');
    } else {
        console.log("req user.id = " + req.user.id)
        var bGroups = req.user._json.blueGroups;
        var arrGrps = settings.appAccess.split(",");
        if (arrGrps.some(function (element) {
                return (bGroups.indexOf(element) != -1)
            })) {
            console.log("Bluegroup authentication success");
            return next();
        } else {
            console.log("Bluegroup authentication Failure");
            res.send('<p style="margin-top:25px; margin-left:25px; font-size:25px">' +
                '<i>You are not authorized to access this page!!!</i></p>'
            );
        }
    }
}

// handle callback, if authentication succeeds redirect to original requested url, otherwise go to /failure
app.get('/auth/sso/callback', function (req, res, next) {
    var redirect_url = req.session.originalUrl;
    console.log("redirect url = " + redirect_url);
    passport.authenticate('openidconnect', {
        successRedirect: redirect_url,
        failureRedirect: '/failure',
        failureFlash: true
    })(req, res, next);
});

app.get('/api/getuser', function (req, res) {
    var user = req.user['_json'];
    res.json(req.user);
});

app.get('/logout', function (req, res) {
    req.logout();
    req.user = null
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        }
        req.session = null; // destroy session data
    });
});

const api = require('./server/routes/api');

// Parsers for POST data -- limit has been extended to 20mb to take care of sending search results mail
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
    limit: '20mb'
}));
app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true
}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist'), {
    index: false
}));

// Set our api routes
app.use('/api', ensureAuthenticated, api, function (req, res, next) {
    next();
});

app.get('*', ensureAuthenticated, (req, res) => {
    console.log("req.originalUrl = ", req.originalUrl);
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

//Create HTTP server
const server = http.createServer(app);

//Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`API running on localhost:${port}`));