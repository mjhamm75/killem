export const CLIENT_ID = '3a40b9387b3c41b6847eefb37660f269';
export const CLIENT_SECRET = 'ad92eee0fb2743ea8b5974ae2ab93db1';
export const REDIRECT_URI = 'http://localhost:8888/callback';
export const SCOPE = 'user-read-private user-read-email playlist-modify-public';

export const PORT = 8888;

export function knexInit() {
	return require('knex')({
	    client: 'pg',
	    connection: 'postgres://killem:killem@localhost/killem'
	});	
}