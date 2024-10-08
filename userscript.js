// ==UserScript==
// @name         ReRozetked
// @namespace    https://kurilov.site/
// @version      2024.8.4
// @description  Make Rozetked Great Again
// @author       Anton Kurilov (kurilov.site)
// @match        https://rozetked.me/*
// @icon         https://www.google.com/s2/favicons?domain=rozetked.me
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

// redirect to post editing when Ctrl+E logged
let currentURL = window.location.href
if (
	currentURL.includes('articles/') ||
	currentURL.includes('news/') ||
	currentURL.includes('reviews/') ||
	currentURL.includes('posts/')
) {
	let postID = currentURL.match(/\b\d{5}\b/g)
	document.addEventListener('keydown', function (event) {
		if (event.code == 'KeyE' && (event.ctrlKey || event.metaKey)) {
			window.location.href =
				'https://rozetked.me/acp/post2/edit/' + postID
		}
	})
}

// add Open button to adminpanel
if (currentURL.includes('/acp/post/list')) {
	let tableNodes = document.getElementsByTagName('tr'),
		tgLinks = document.getElementsByClassName('tg_link')

	for (let i = 0; i < tgLinks.length; i++) {
		tgLinks[i].textContent = 'TG'
	}
	for (let i = 0; i < tableNodes.length; i++) {
		let link = tableNodes[i].querySelector('a')
		if (link) {
			let linkID = link.href.match(/\b\d{5}\b/)
			if (linkID) {
				let newCell = document.createElement('td')
				let newLink = document.createElement('a')
				newCell.classList.add('publink')
				newLink.href = 'https://rozetked.me/news/' + linkID[0]
				newLink.textContent = 'Открыть'
				newCell.appendChild(newLink)
				tableNodes[i].appendChild(newCell)
			}
		}
	}
}

// symbols counter
window.onload
if (currentURL.includes('/acp/post2/edit')) {
	window.onload = function () {
		let paragraphNodes = document.querySelector(
				'.codex-editor__redactor'
			).children,
			textContent = ''
		for (let i = 0; i < paragraphNodes.length; i++) {
			textContent += paragraphNodes[i].textContent
		}
		let textCounter = document.createElement('div')
		textCounter.classList.add('symbols-count')
		textCounter.textContent = 'Символов: ' + textContent.length + ''
		document
			.querySelector('.codex-editor')
			.insertAdjacentElement('beforebegin', textCounter)
	}
}
