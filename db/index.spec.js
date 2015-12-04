import test from 'tape';
import { createPlaylist } from './index';

test('create playlist', (t) => {
    t.plan(1);

    let userId = 'mjhamm75';
    let playlistName = 'testingtesting'
    createPlaylist(userId, playlistName).then(res => {
        t.ok(true);
    })
})