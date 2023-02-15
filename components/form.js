import { card } from './card.js'

export const form = (localData) => {
	// Initialize pointers to DOM elements
	const form = document.getElementById('form')
	const searchPiece = document.getElementById('byPieceName')
	const searchArtist = document.getElementById('byArtistName')
	const submitBtn = document.getElementById('submitButton')

	//Initializing query variable
	let query = 'artist'

	// adding event listeners to buttons
	searchPiece.addEventListener('click', () => {
		query = 'piece'
		submitBtn.textContent = 'Search by Piece Name'
	})
	searchArtist.addEventListener('click', () => {
		query = 'artist'
		submitBtn.textContent = 'Search by Artist Name'
	})
	
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
					container.innerHTML = '<h1>No results found. Please try again.</h1>'
				else result.forEach((piece) => card(piece))
				break
			case 'piece':
				container.innerHTML = ''
				result = localData.find(
					(piece) => piece.title.toLowerCase() === input.toLowerCase()
				)
				if (result === undefined)
					container.innerHTML = '<h1>No results found. Please try again.</h1>'
				else card(result)
				break
		}
	})
}
