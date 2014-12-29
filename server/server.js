var express = require('express');
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var request = require('request');

var app = express();

var client_id = '3a40b9387b3c41b6847eefb37660f269';
var client_secret = 'ad92eee0fb2743ea8b5974ae2ab93db1';
var port = 7000;
var redirect_uri = 'http://localhost:' + port + '/callback';
var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'));

app.get('/login', function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', function(req, res) {

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    var result = {
        code: req.query.code,
        state: req.query.state
    };

    res.clearCookie(stateKey);
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        var result = {
            access_token: body.access_token,
            refresh_token: body.refresh_token
        };
        res.json(result);
        // if (!error && response.statusCode === 200) {

        //     var access_token = body.access_token,
        //         refresh_token = body.refresh_token;

        //     var options = {
        //         url: 'https://api.spotify.com/v1/me',
        //         headers: {
        //             'Authorization': 'Bearer ' + access_token
        //         },
        //         json: true
        //     };

        //     // use the access token to access the Spotify Web API
        //     request.get(options, function(error, response, body) {
        //         console.log(body);
        //     });

        //     // we can also pass the token to the browser to make requests from there
        //     res.redirect('/#' + querystring.stringify({
        //         access_token: access_token,
        //         refresh_token: refresh_token
        //     }));
        // } else {
        //     res.redirect('/#' + querystring.stringify({
        //         error: 'invalid_token'
        //     }));
        // }
    });
});

app.listen(port, function() {
    console.log('running on port: ' + port);
});

var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
