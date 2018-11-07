'use strict';
//Collaborated with Andrew, Ryna, Ray, Alistair, Deziree, and Guru
//use global variables:
var totalClicks = 0;
var allProducts = [];
var previousImgShown = [];

var firstImg = document.getElementById('first');
var secondImg = document.getElementById('second');
var thirdImg = document.getElementById('third');

var results = document.getElementById('results');


function Product(name, imgPath, altTxt){
  this.name = name;
  this.imgPath = imgPath;
  this.altTxt = altTxt;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

new Product('bag', './img/bag.jpg' , 'bag');
new Product('banana', './img/banana.jpg' , 'banana');
new Product('bathroom', './img/bathroom.jpg' , 'bathroom');
new Product('boots', './img/boots.jpg' , 'boots');
new Product('breakfast', './img/breakfast.jpg' , 'breakfast');
new Product('bubblegum', './img/bubblegum.jpg' , 'bubblegum');
new Product('chair', './img/chair.jpg' , 'chair');
new Product('cthulhu', './img/cthulhu.jpg' , 'cthulhu');
new Product('dog-duck', './img/dog-duck.jpg' , 'dog-duck');
new Product('dragon' , './img/dragon.jpg' , 'dragon');
new Product('pen' , './img/pen.jpg' , 'pen');
new Product('pet-sweep' , './img/pet-sweep.jpg' , 'pet-sweep');
new Product('scissors' , './img/scissors.jpg' , 'scissors');
new Product('shark' , './img/shark.jpg' , 'shark');


function randomImage() {
  var firstRandom = Math.floor(Math.random() * allProducts.length);
  var secondRandom = Math.floor(Math.random() * allProducts.length);
  var thirdRandom = Math.floor(Math.random() * allProducts.length);

  while( firstRandom === secondRandom
     || firstRandom === thirdRandom 
     || secondRandom === thirdRandom 
     || previousImgShown.includes(firstRandom)
     || previousImgShown.includes(secondRandom)
     || previousImgShown.includes(thirdRandom))
     {  
    firstRandom = Math.floor(Math.random() * allProducts.length);
    secondRandom = Math.floor(Math.random() * allProducts.length);
    thirdRandom = Math.floor(Math.random() * allProducts.length);
    
  }
    previousImgShown[0] = firstRandom;
    previousImgShown[1] = secondRandom;
    previousImgShown[2] = thirdRandom;

    firstImg.src = allProducts[firstRandom].imgPath;
    secondImg.src = allProducts[secondRandom].imgPath;
    thirdImg.src = allProducts[thirdRandom].imgPath;

    firstImg.alt = allProducts[firstRandom].altTxt;
    secondImg.alt = allProducts[secondRandom].altTxt;
    thirdImg.alt = allProducts[thirdRandom].altTxt;

    allProducts[firstRandom].views++;
    allProducts[secondRandom].views++;
    allProducts[secondRandom].views++;

    totalClicks++;

  if (totalClicks === 25){
    firstImg.removeEventListener('click' , handleImageClick);
    secondImg.removeEventListener('click' , handleImageClick);
    thirdImg.removeEventListener('click' , handleImageClick);
    displayResults();
  }
}

function handleImageClick(event){
  randomImage();

  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
}

function displayResults(){
  for (var i = 0; i < allProducts.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].votes + ' votes for the ' + allProducts[i].name + ' and ' + allProducts[i].views + ' views .';
    results.appendChild(liEl);
  }
}

randomImage();

firstImg.addEventListener('click', handleImageClick);
secondImg.addEventListener('click', handleImageClick);
thirdImg.addEventListener('click', handleImageClick);

// Array for collecting all of the colors
var colors = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

// HTMLElement 'hook' to the document
var colorsEl = document.getElementById('colors-container');

// Loop for the length of colors
// Create a p tag, give it content, and append it to the DOM
for (var i = 0; i < colors.length; i++) {
  var pEl = document.createElement('p');
  pEl.textContent = colors[i];

  pEl.style.color = colors[i];
  pEl.id = colors[i];

  colorsEl.appendChild(pEl);
}


var ctx = document.getElementById("myChart").getContext('2d');

var chartConfig = {
  type: 'bar',
  data: {
    labels: colors,
    datasets: [{
      label: '# of Votes',
      data: new Array(colors.length).fill(0),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
};


var myChart = new Chart(ctx, chartConfig);

colorsEl.addEventListener('click', function(event) {
  // validate the target as a p tag
  // get the id of the target p tag
  // use the id to get the index location for what data point to increment in data

  var pId = event.target.id;
  var idx = colors.indexOf(pId);

  if (idx !== -1) {
    myChart.data.datasets[0].data[idx] += 1;
    console.log(myChart.data.datasets[0].data);
    myChart.update();
  }
})