const container=document.querySelector('.container');
const seats= document.querySelectorAll('.row .seat:not(.occupied)');
const count= document.getElementById('count');
const total= document.getElementById('total');
let movieSelect= document.getElementById('movie');
let ticketPrice= +movieSelect.value;

populateUI();

function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelcetedCount(){
  const selectedSeats= document.querySelectorAll('.row .seat.selected');
  const seatsIndex= [...selectedSeats].map((seat)=>[...seats].indexOf(seat));
 localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selcectedSeatCount= selectedSeats.length;
 
  count.innerText = selcectedSeatCount;
  price.innerText= selcectedSeatCount * ticketPrice;
}

function populateUI(){
  const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);
  if(selectedSeats !== null && selectedSeats.length>0){
    seats.forEach((seat, index)=>{
      if (selectedSeats.indexOf(index) >-1){
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex= localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null){
    movieSelect.seatsIndex= selectedMovieIndex;
    console.log(movieSelect.value);
  }
}

movieSelect.addEventListener('change', e=>{
  ticketPrice= +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelcetedCount();
})


container.addEventListener('click',  (e)=> {
  if(e.target.classList.contains('seat') &&
   !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');

    updateSelcetedCount();
  }
})

updateSelcetedCount();
