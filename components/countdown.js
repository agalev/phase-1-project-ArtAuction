// Timer Function (thanks chatGPT)
export const countdown = (element, minutes) => {
	let seconds = 0
	let time = minutes * 60
	let interval = setInterval(() => {
		let minutes = parseInt(time / 60, 10)
		let seconds = parseInt(time % 60, 10)

		minutes = minutes < 10 ? '0' + minutes : minutes
		seconds = seconds < 10 ? '0' + seconds : seconds

		element.textContent = `Time Left: ${minutes}:${seconds}`
		if (--time < 0) {
			time = 0
			clearInterval(interval)
			element.textContent = `Sold to the highest bidder!`
			element.className = `fs-6 position-relative top-0 start-50 translate-middle badge rounded-pill text-bg-success`
		}
	}, 1000)
}