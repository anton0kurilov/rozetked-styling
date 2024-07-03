// ==UserScript==
// @name         ReRozetked
// @namespace    https://kurilov.site/
// @version      2024.7.4
// @description  Make Rozetked Great Again
// @author       Anton Kurilov (kurilov.site)
// @match        https://rozetked.me/*
// @icon         https://www.google.com/s2/favicons?domain=rozetked.me
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

// redirect to post editing when Ctrl+E logged
let currentURl = document.URL
if (
	currentURl.includes('articles/') ||
	currentURl.includes('news/') ||
	currentURl.includes('reviews/') ||
	currentURl.includes('posts/')
) {
	let postURl = currentURl.match(/\b\d{5}\b/g)
	document.addEventListener('keydown', function (event) {
		if (event.code == 'KeyE' && (event.ctrlKey || event.metaKey)) {
			window.location.href =
				'https://rozetked.me/acp/post2/edit/' + postURl
		}
	})
}
