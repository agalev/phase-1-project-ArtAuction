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
				development: data.objectEndDate - data.objectBeginDate
			}
			localData.push(Object)
			const image = document.createElement('img')
			image.src = data.primaryImage
			image.class = 'img-thumbnail'
			container.appendChild(image)
		})
}
console.log(localData)
