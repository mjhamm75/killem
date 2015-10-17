import fetch  from 'isomorphic-fetch';

export function isoFetch(url) {
	return fetch(url).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
}