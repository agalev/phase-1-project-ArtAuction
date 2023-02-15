export const handleBid = (e, piece) => {
	const bidSpan = document.getElementById(`bid-${piece.id}`)
	const buyoutPill = document.getElementById(`buyout-${piece.id}`)
	const countdown = document.getElementById(`countdown-${piece.id}`)
	const bidForm = document.getElementById('bidForm')

	// creating error message
	const bidError = document.createElement('span')
	bidForm.append(bidError)

	// abstracting helper variables
	const bid = parseInt(e.target[0].value)
	const currentBid = piece.currentBid
	const buyout = piece.buyout

	// conditional logic for bid
	if (bid > buyout) {
		piece.currentBid = bid
		bidSpan.className = 'fs-6 text-success d-flex justify-content-around my-2'
		bidSpan.innerText = `You won the auction for $${bid.toLocaleString(
			'en-US'
		)}!`
		buyoutPill.innerText = `SOLD!`
		bidForm.remove()
		countdown.remove()
	} else if (bid > currentBid) {
		piece.currentBid = bid
		bidSpan.className = 'fs-6 text-success d-flex justify-content-around my-2'
		bidSpan.innerText = `Your Bid: $${bid.toLocaleString('en-US')}`
		bidForm[0].value = ''
	} else {
		bidError.className = 'fs-6 text-danger d-flex justify-content-around'
		bidError.innerText = `Your bid must be higher than the current bid!`
	}
}
