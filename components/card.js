import { countdown } from './countdown.js'
import { handleBid } from './handleBid.js'
import { expandedView } from './expandedView.js'

export const card = (piece) => {
	const container = document.querySelector('#container')
	const card = document.createElement('article')
	card.className = 'card m-2'
	card.style = 'width: 28rem;'

	// Add hover effect to cards
	card.addEventListener('mouseover', () => {
		card.className = 'card m-2 border border-warning'
	})
	card.addEventListener('mouseout', () => {
		card.className = 'card m-2'
	})

	// Add card content
	card.innerHTML = `
		<span id="buyout-${
			piece.id
		}" class="fs-6 position-absolute top-0 start-50 mt-2 translate-middle badge rounded-pill bg-danger">Buyout: $${piece.buyout.toLocaleString(
		'en-US'
	)}</span>
		<div class="row g-0 mt-2">
			<div class="col-md-6">
				<img src="${piece.image}" class="card-img" alt="${piece.title}">
				<span id="bid-${
					piece.id
				}" class="fs-6 text-warning d-flex justify-content-around my-2">Current Bid: $${piece.currentBid.toLocaleString(
		'en-US'
	)}</span>
			</div>
			<ul class="col-md-6 list-group list-group-flush mt-3">
				<li class="list-group-item"><h5>${piece.title}</h5></li>
				<li class="list-group-item">Artist: ${piece.artist}</li>
				<li class="list-group-item">Medium: ${piece.medium}</li>
				<li class="list-group-item">Dimensions: ${piece.dimensions}</li>
				<li class="list-group-item">Completed: ${piece.date}</li>
			</ul>
			<form id="bidForm" class="input-group my-3">
				<span class="input-group-text">$</span>
				<input type="text" class="form-control" placeholder="Enter your bid amount . . .">
				<span class="input-group-text">.00</span>
				<button class="btn btn-outline-success">Bid</button>
			</form>
		</div>`

	// Initialize pointers to DOM elements
	const bidForm = card.querySelector('#bidForm')
	const imageDiv = card.querySelector('div.col-md-6')
	const infoDiv = card.querySelector('ul.col-md-6')

	// Add event listener to bid form
	bidForm.addEventListener('submit', (e) => {
		e.preventDefault()
		handleBid(e, piece)
	})

	// detail button
	const detailButton = document.createElement('button')
	detailButton.className = ' btn btn-sm btn-outline-primary rounded-pill'
	detailButton.dataset.bsToggle = 'modal'
	detailButton.dataset.bsTarget = '#modal'
	detailButton.innerText = 'View Details'
	detailButton.addEventListener('click', () => {
		expandedView(piece)
	})
	infoDiv.append(detailButton)

	// countdown span
	const countdownspan = document.createElement('span')
	countdownspan.id = `countdown-${piece.id}`
	countdownspan.className =
		'fs-6 position-relative top-0 start-50 translate-middle badge rounded-pill text-bg-warning mt-1'
	countdown(countdownspan, piece.timeLeft)
	imageDiv.append(countdownspan)
	
	// Add card to DOM
	container.append(card)
}
