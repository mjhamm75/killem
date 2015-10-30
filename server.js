var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var querystring = require('querystring');
import { generateRandomString } from './utils/random.utils.js';
var stateKey = 'spotify_auth_state';
import bodyParser from 'body-parser';

var app = new require('express')();
var port = 8888;
var client_id = '3a40b9387b3c41b6847eefb37660f269';
var client_secret = 'ad92eee0fb2743ea8b5974ae2ab93db1';
var redirect_uri = 'http://localhost:8888/callback';

import request from 'request';
import axios from 'axios';

let tokens = {
    access_token: {},
    refresh_token: {}
};

let me = []; 

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

app.get('/log-in', function(req, res) {
	var state = generateRandomString(16);
    res.cookie(stateKey, state);

    var scope = 'user-read-private user-read-email playlist-modify-public';
    var result = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        });
    res.json({
        url: result
    });
})

app.get('/me', (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + tokens.access_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        if(error) {
            console.log(error);
        } else {
            me = response.body;
            res.json(response);            
        }
    });
})

app.get('/callback', (req, res) => {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

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

    request.post(authOptions, (error, response, body) => {
        tokens.access_token = body.access_token;
        tokens.refresh_token = body.refresh_token;
    });

    res.redirect('/create');
});

app.get('/tokens', (req, res) => {
  res.json(tokens);
});

app.get('/refresh_token', (req, res) => {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.post('/createPlaylist/:name', (req, res) => {
    console.log('creating playlist');
    
    var playlist = {
        name: 'TestList',
        public: true
    };

    axios({
            url: 'https://api.spotify.com/v1/users/' + me.id + '/playlists',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + tokens.access_token,
                'Content-Type': 'application/json'  
            },
            data: JSON.stringify(playlist)
        })
        .then(playlist => {
            console.log(playlist)
            res.json(playlist);
        });
});

app.post('/search-tracks', (req, res) => {
    var term = req.body.term;
    axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=artist,track`)
        .then(response => res.json(response));
});

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});