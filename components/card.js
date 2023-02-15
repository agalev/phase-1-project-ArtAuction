import { countdown } from './countdown.js'
import { expandedView } from './expandedView.js'

export const card = (piece) => {
	const card = document.createElement('article')
	card.className = 'card m-2'
	card.style = 'width: 18rem;'
	card.addEventListener('mouseover', () => {
		card.className = 'card m-2 border border-warning'
	})
	card.addEventListener('mouseout', () => {
		card.className = 'card m-2'
	})
	card.innerHTML = `
  		<img src="${piece.image}" class="card-img" alt="${piece.title}">
			<span id="buyout-${
				piece.id
			}" class="fs-6 position-absolute top-0 start-50 m-2 translate-middle badge rounded-pill bg-danger">
				Buyout: $${piece.buyout.toLocaleString('en-US')}</span>
  		<div class="card-body">
    		<h5 class="card-title">${piece.title}</h5>
    		<p class="card-text">Artist: ${piece.artist}</p>
  		</div>
  		<ul class="list-group list-group-flush">
				<li class="list-group-item">Medium: ${piece.medium}</li>
				<li class="list-group-item">Dimensions: ${piece.dimensions}</li>
				<li class="list-group-item">Completed: ${piece.date}</li>
  		</ul>
			<span id="bid-${
				piece.id
			}" class="fs-5 text-warning d-flex justify-content-around my-2">Current Bid: $${piece.currentBid.toLocaleString(
		'en-US'
	)}</span>
			<form id="bidForm" class="input-group my-3">
					<span class="input-group-text">$</span>
					<input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
					<span class="input-group-text">.00</span>
					<button class="btn btn-outline-success">Bid</button>
					</form>`
	const bidForm = card.querySelector('#bidForm')
	bidForm.addEventListener('submit', (e) => {
		e.preventDefault()
		handleBid(e, piece)
	})
	const detailButton = document.createElement('button')
	detailButton.className = 'btn btn-outline-primary px-5 m-3 rounded-pill'
	detailButton.dataset.bsToggle = 'modal'
	detailButton.dataset.bsTarget = '#modal'
	detailButton.innerText = 'View Details'
	detailButton.addEventListener('click', () => {
		expandedView(piece)
	})
	card.append(detailButton)
	const span = document.createElement('span')
	span.id = `countdown-${piece.id}`
	span.className =
		'fs-6 position-relative top-0 start-50 translate-middle badge rounded-pill text-bg-warning'
	countdown(span, piece.timeLeft)
	card.append(span)
	container.append(card)
}

const handleBid = (e, piece) => {
	const bidSpan = document.getElementById(`bid-${piece.id}`)
	const buyoutPill = document.getElementById(`buyout-${piece.id}`)
	const countdown = document.getElementById(`countdown-${piece.id}`)
	const bid = parseInt(e.target[0].value)
	const currentBid = piece.currentBid
	const buyout = piece.buyout

	// console.log(localData)
	if (bid > buyout) {
		piece.currentBid = buyout
		bidSpan.className = 'fs-5 text-success d-flex justify-content-around my-2'
		bidSpan.innerText = `You won the auction!`
		buyoutPill.innerText = `SOLD!`
		countdown.remove()
	} else if (bid > currentBid) {
		piece.currentBid = bid
		bidSpan.className = 'fs-5 text-success d-flex justify-content-around my-2'
		bidSpan.innerText = `Your Bid: $${bid.toLocaleString('en-US')}`
	}
}
