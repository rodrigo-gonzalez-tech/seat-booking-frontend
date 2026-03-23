// DOM elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seatCount = document.getElementById("seat-count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

// Save selected movie index and price to local storage
function setMovie(index, price) {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", price);
}

// Update seats
function updateSeats() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  seatCount.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeatsIndexes = JSON.parse(
    localStorage.getItem("selectedSeats"),
  );

  if (selectedSeatsIndexes !== null && selectedSeatsIndexes.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatsIndexes.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Select movie event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  setMovie(e.target.selectedIndex, e.target.value);
  updateSeats();
});

// Select seats event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSeats();
  }
});

updateSeats();
