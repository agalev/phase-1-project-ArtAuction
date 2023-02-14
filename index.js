// External imports
import { card } from './components/card.js'
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
			localData.push(cardData)
		})
}

const card = (piece) => { 
	const cardElement = document.createElement('article') //dont declare variables with the same name as the function
	// console.log(card)
	cardElement.addEventListener('click', (event) => {
		event.preventDefault()
		expandedView(piece)
	})

	//describes what the card element should look like:
	cardElement.innerHTML = ` 
		<div class="card h-100 w-75 mt-2">
  		<img src="${piece.image}" class="card-img" alt="${piece.title}">
			<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
				Buyout: $${piece.buyout.toLocaleString('en-US')}</span>
  		<div class="card-body">
    		<h5 class="card-title">${piece.title}</h5>
    		<p class="card-text">Artist: ${piece.artistBio}</p>
  		</div>
  		<ul class="list-group list-group-flush">
				<li class="list-group-item">Medium: ${piece.medium}</li>
				<li class="list-group-item">Dimensions: ${piece.dimensions}</li>
				<li class="list-group-item">Completed: ${piece.date}</li>
  		</ul>
  		<div class="card-body">
				<div class="input-group mb-3">
					<span class="input-group-text">$</span>
					<input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
					<span class="input-group-text">.00</span>
					<button class="btn btn-outline-success" type="button">Bid</button>
				</div>
  		</div>
		</div>
`
	container.append(cardElement) //adds it to the screen 
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

const expandedView = (piece) => {
	
	// 	container.innerHTML = ''
}
