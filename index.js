// Initialize pointers to DOM elements
const container = document.querySelector('#container')

// Fetch data from the Met Museum API
// Good objects in sequence between 10462-10474 or 11264-11276
// We are using a 12 object range, which is a good sample data for the app
// Change the number in the URL to see different objects

// Initializing local state
let localData = []

for (let index = 11264; index < 11276; index++) {
	fetch(
		`https://collectionapi.metmuseum.org/public/collection/v1/objects/${index}`
	)
		.then((response) => response.json())
		.then((data) => {
			const Object = {
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
				buyout: Math.floor(Math.random() * 10000000)
			}
			card(Object)
			localData.push(Object)
		})
}

const card = (piece) => {
	const card = document.createElement('article')
	card.addEventListener('click', () => {
		expandedView(piece)
	})
	card.innerHTML = `
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
	container.append(card)
}

const expandedView = (piece) => {
	console.log(piece)
	// 	container.innerHTML = ''
}
