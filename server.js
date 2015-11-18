var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

import { generateRandomString } from './utils/random.utils.js';
import bodyParser from 'body-parser';
import { PORT, STATE_KEY } from './config';

var app = new require('express')();

import request from 'request';
import axios from 'axios';

let tokens = {
    access_token: {},
    refresh_token: {}
};

let me = [];

let localPlaylist = {};

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

import { login } from './db';
app.get('/log-in', function(req, res) {
    var state = generateRandomString(16);
    res.cookie(STATE_KEY, state);
    let result = login(state);
    res.json({
        url: result
    });
})

import { callback } from './db';
app.get('/callback', (req, res) => {
    var code = req.query.code || null;
    res.clearCookie(STATE_KEY);

    callback(code, tokens, result => {
        res.redirect('/create');
    })
});

app.get('/tokens', (req, res) => {
  res.json(tokens);
});

import { refreshToken } from './db';
app.get('/refresh_token', (req, res) => {
    refreshToken();
});

import { createPlaylist } from './db';
app.post('/createPlaylist/:name', (req, res) => {
    createPlaylist('testtest', me).then(playlist => {
        localPlaylist = playlist;
        res.json(playlist);
    })
    .catch(err => {
        console.error(err);
    })
});

import { searchTracks } from './db';
app.post('/search-tracks', (req, res) => {
    searchTracks(req.body.term).then(response => res.json(response));
});

import { addTrack } from './db';
app.post('/add-track', (req, res) => {
    var trackId = req.body.trackId;
    var url = `https://api.spotify.com/v1/users/${me.id}/playlists/${localPlaylist.data.id}/tracks?uris=spotify:track:${trackId}`;
    axios({
        url: url,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        res.json(response)
    }).catch(err => {
        console.error(err)
    })
})

import { getPlaylist } from './db';
app.get('/playlist', (req, res) => {
    getPlaylist(tokens).then(response => {
        res.json(response)
    }).catch(err => console.log(err));
})

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", PORT, PORT);
  }
});