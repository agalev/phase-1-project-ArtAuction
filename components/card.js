import { countdown } from './countdown.js'

export const card = (piece) => {
	const card = document.createElement('article')
	card.className = 'm-2 card'
	card.style = 'width: 18rem;'
	card.addEventListener('click', () => {
		expandedView(piece)
	})
	card.innerHTML = `
  		<img src="${piece.image}" class="card-img" alt="${piece.title}">
			<span class="position-absolute top-0 start-50 m-2 translate-middle badge rounded-pill bg-danger">
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
			<span id="${
				piece.id
			}" class="text-warning d-flex justify-content-around">Current Bid: $${piece.currentBid.toLocaleString(
		'en-US'
	)}</span>
			<div class="input-group mb-3">
					<span class="input-group-text">$</span>
					<input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
					<span class="input-group-text">.00</span>
					<button class="btn btn-outline-success" type="button">Bid</button>
				</div>
`
	const span = document.createElement('span')
	span.id = `span-${piece.id}`
	span.className =
		'position-relative top-0 start-50 translate-middle badge rounded-pill text-bg-warning'
	countdown(span, piece.timeLeft)
	card.append(span)
	container.append(card)
}
