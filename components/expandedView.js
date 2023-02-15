export const expandedView = (piece) => {
	// Get the modal's header, body, and footer
	const modalHeader = document.querySelector('.modal-header')
	const modalBody = document.querySelector('.modal-body')
	const modalFooter = document.querySelector('.modal-footer')
  
	// Update the modal's content based on the clicked card
	modalHeader.innerHTML = `<h4 class="card-title">Detailed information about "${piece.title}"</h4>`
	modalBody.innerHTML = `
    <div class="row g-0">
      <div class="col-md-6">
        <img src="${piece.image}" class="card-img" alt="${piece.title}">
      </div>
      <ul class="col-md-6 list-group list-group-flush">
        <li class="list-group-item">Artist: ${piece.artist}</li>
        <li class="list-group-item">Born: ${piece.artistBio}</li>
        <li class="list-group-item">Medium: ${piece.medium}</li>
        <li class="list-group-item">Dimensions: ${piece.dimensions}</li>
        <li class="list-group-item">Year Created: ${piece.date}</li>
        <li class="list-group-item">Credits: ${piece.credits}</li>
        <li class="list-group-item">Repository: ${piece.repository}</li>
        <li class="list-group-item">Department: ${piece.department}</li>
        <li class="list-group-item">Time in development: ${piece.development} years</li>
      </ul>
    </div>`
	modalFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`
}
