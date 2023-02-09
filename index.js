// Initialize pointers to DOM elements
const container = document.querySelector('#container')

// Fetch data from the Met Museum API and log it to the console
// I found a bunch of good objects in sequence between 36500-36520+
// Change the number in the URL to see different objects
fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/36520')
	.then((response) => response.json())
	.then((data) => {
    console.log(data, data.primaryImage)
		const image = document.createElement('img')
		image.src = data.primaryImage
		container.appendChild(image)
	})
