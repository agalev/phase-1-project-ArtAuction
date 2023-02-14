export const expandedView = (piece) => {
    console.log(piece)
    const modal = document.getElementById('modal')
    modal.addEventListener('show.bs.modal', event => {
        // Update the modal's content.
        const modalHeader = modal.querySelector('.modal-header')
        const modalBody = modal.querySelector('.modal-body')
        const modalFooter = modal.querySelector('.modal-footer')

	modalHeader.innerHTML = `<h5 class="card-title">${piece.title}</h5>`
	modalBody.innerHTML = `
    <img src="${piece.image}" class="card-img" alt="${piece.title}">
    <span class="position-absolute top-0 start-50 m-2 translate-middle badge rounded-pill bg-danger">
      Buyout: $${piece.buyout.toLocaleString('en-US')}</span>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Artist: ${piece.artist}</li>
      <li class="list-group-item">Born: ${piece.artistBio}</li>
      <li class="list-group-item">Medium: ${piece.medium}</li>
      <li class="list-group-item">Dimensions: ${piece.dimensions}</li>
      <li class="list-group-item">Year Created: ${piece.date}</li>
      <li class="list-group-item">Credits: ${piece.credits}</li>
      <li class="list-group-item">Repository: ${piece.repository}</li>
      <li class="list-group-item">Department: ${piece.department}</li>
      <li class="list-group-item">Time Took to Create: ${
				piece.development
			} years</li>
    </ul>
    <div class="input-group w-75">
      <span class="input-group-text">$</span>
      <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
      <span class="input-group-text">.00</span>
      <button class="btn btn-outline-success" type="button">Bid</button>
      </div>
      <span id="${piece.id
            }" class="text-warning d-flex mt-2">Current Bid: $${piece.currentBid.toLocaleString(
                'en-US'
            )}</span>`


        modalFooter.innerHTML = `
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          `
    })
}