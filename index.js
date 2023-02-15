// External imports
import { card } from './components/card.js'
import { form } from './components/form.js'

// Initializing local state -> needed for the form component
let localData = []

// Fetch data from the Met Museum API
// Good objects in sequence between 10462-10474 or 11264-11276
// We are using a 12 object range, which is a good sample data for the app
// Change the number in the URL to see different objects

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
				},
				set currentBid(newBid) {
					this._currentBid = newBid
				}
			}
			card(cardData)
			localData.push(cardData)
		})
}
form(localData)
