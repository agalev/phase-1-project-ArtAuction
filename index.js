// External imports
import { card } from './components/card.js'
import { expandedView } from './components/expandedView.js'
// Initialize pointers to DOM elements
const container = document.getElementById('container')
const form = document.getElementById('form')
const searchPiece = document.getElementById('byPieceName')
const searchArtist = document.getElementById('byArtistName')
const submitBtn = document.getElementById('submitButton')

// adding event listeners to buttons
searchPiece.addEventListener('click', () => {
	query = 'piece'
	submitBtn.textContent = 'Search by Piece Name'
})
searchArtist.addEventListener('click', () => {
	query = 'artist'
	submitBtn.textContent = 'Search by Artist Name'
})

// Fetch data from the Met Museum API
// Good objects in sequence between 10462-10474 or 11264-11276
// We are using a 12 object range, which is a good sample data for the app
// Change the number in the URL to see different objects

// Initializing local state
let localData = []

//Initializing query variable
let query = 'artist'

for (let index = 11264; index < 11276; index++) {
	fetch(
		`https://collectionapi.metmuseum.org/public/collection/v1/objects/${index}`
	)
		.then((response) => response.json())
		.then((data) => {
			const cardData = {
				id: data.objectID,
				title: data.title,
				artist: data.artistDisplayName,
				artistBio: data.artistDisplayBio,
				image: data.primaryImage,
				medium: data.medium,
				date: data.objectDate,
				credits: data.creditLine,
				dimensions: data.dimensions,
				repository: data.repository,
				department: data.department,
				development: data.objectEndDate - data.objectBeginDate,
				timeLeft: Math.floor(Math.random() * 60),
				buyout: Math.floor(Math.random() * 10000000),
				get currentBid() {
					return Math.floor(this.buyout / 2)
				}
			}
			card(cardData)
			expandedView(cardData)
			localData.push(cardData)
		})
}

// Adding event listener to form and handling query
form.addEventListener('submit', (e) => {
	e.preventDefault()
	const input = document.querySelector('input').value
	let result
	switch (query) {
		case 'artist':
			container.innerHTML = ''
			result = localData.filter(
				(piece) => piece.artist.toLowerCase() === input.toLowerCase()
			)
			if (result.length === 0)
				container.innerHTML = '<h1>No results found. Try again?</h1>'
			else result.forEach((piece) => card(piece))
			break
		case 'piece':
			container.innerHTML = ''
			result = localData.find(
				(piece) => piece.title.toLowerCase() === input.toLowerCase()
			)
			if (result === undefined)
				container.innerHTML = '<h1>No results found. Try again?</h1>'
			else card(result)
			break
	}
})
