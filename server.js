import { generateRandomString } from './utils/random.utils.js';
import bodyParser from 'body-parser';
import { PORT, STATE_KEY } from './config';

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var app = new require('express')();
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

import { login } from './db';
app.get('/log-in', (req, res) => {
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

    callback(code).then(() => {
        res.redirect('/create');
    })
});

import { getTokens } from './db';
app.get('/tokens', (req, res) => {
    getTokens().then(tokens => {
        res.json(tokens);        
    });
});

import { refreshToken } from './db';
app.get('/refresh_token', (req, res) => {
    refreshToken(1).then(response => {
        res.json({
            created: true
        })
    });
});

import { createPlaylist } from './db';
app.post('/createPlaylist/:name', (req, res) => {
    createPlaylist(req.params.name, 1).then(playlist => {
        res.json({
            created: true
        });
    })
    .catch(err => {
        res.json({
            created: false
        })
    })
});

import { activatePlaylist } from './db';
app.post('/activate', (req, res) => {
    let playlistId = req.body.playlistId;
    activatePlaylist(playlistId, 1).then(playlists => {
        res.json({
            playlists
        })
    })
    .catch(err => {
        res.json({
            err
        })
    })
})

import { searchTracks } from './db';
app.post('/search-tracks', (req, res) => {
    searchTracks(req.body.term).then(response => res.json(response));
});

import { addTrack } from './db';
app.post('/add-track', (req, res) => {
    var trackId = req.body.trackId;
    addTrack(trackId, 1).then(response => {
        res.json(response)
    }).catch(err => {
        console.error('err', err);
    })
})

import { getPlaylist } from './db';
app.get('/playlist', (req, res) => {
    getPlaylist(1).then(response => {
        res.json(response);
    })
})

import { getPlaylists } from './db';
app.get('/playlists', (req, res) => {
    getPlaylists(1).then(playlists => {
        res.json(playlists);
    });
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, error => {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", PORT, PORT);
  }
});