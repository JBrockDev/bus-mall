
'use strict';
console.log("Initialized");

let canvasChart;

function round(value) {
  var multiplier = Math.pow(10, 1);
  return Math.round(value * multiplier) / multiplier;
}

function _createElement(element, parent) {
  let newElement = document.createElement(element);
  parent.appendChild(newElement);
  return newElement;
}

function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.displayed = 0;
  this.votedFor = 0;
  this.id = Product.nextId;
  Product.nextId++;
}

function sortArray(array) {
  array.sort(function(a,b) {
    let aAvg = a.votedFor / a.displayed;
    let bAvg = b.votedFor / b.displayed;
    return bAvg - aAvg;
  });
}

function toggleHidden(id) {
  let element = document.getElementById(id);
  element.classList.toggle("hidden");
}

function handleResultClick() {
  toggleHidden("title");
  toggleHidden("view-pie")
  toggleHidden("view-bar");
  toggleHidden("show-results");
  toggleHidden("result-ul");
  Product.renderResults();
}

function handleResults() {
  toggleHidden("show-results");
  toggleHidden("results-head-div");
  let button = document.getElementById("show-results");
  button.addEventListener('click', handleResultClick);
}

function handleClick() {
  let productId = this.parentElement.id;
  productId = parseInt(productId);
  let images = document.getElementsByClassName("prod-img");
  for (let i = 0; i < Product.products.length; i++) {
    if (Product.products[i].id === productId) {
      Product.products[i].votedFor++;
      i = Product.products.length;
    }
  }
  for (let image of images) {
    image.removeEventListener('click', handleClick);
  }
  Product.totalVotes++;
  if (Product.totalVotes === Product.votesToComplete) {
    handleResults();
  } else {
    Product.renderProducts();
  }
}

Product.nextId = 0;
Product.totalVotes = 0;
Product.votesToComplete = 25;
Product.products = [];
Product.lastViewedIndexes = [];



Product.renderProducts = function() {
  let indexArray = this.getRandomProducts();
  let i = 1;
  for (let index of indexArray) {
    Product.products[index].renderProduct(i);
    i++;
  }
}

Product.getRandomProducts = function() {
  let returnArray = [];
  let productArray = this.products;
  for (let i = 0; i < 3; i++) {
    let exists = true;
    while(exists) {
      let index = randomProduct(0, productArray.length - 1);
      if (!returnArray.includes(index) && !Product.lastViewedIndexes.includes(index)) {
        exists = false;
        returnArray.push(index);
      }
    }
  }
  Product.lastViewedIndexes = [...returnArray];
  return returnArray;
}

Product.renderResults = function() {
  sortArray(this.products);
  let ulElem = document.getElementById("result-ul");
  toggleHidden("result-ul");
  let i = 0;
  for (let product of this.products) {
    let newLi = _createElement("li", ulElem);
    newLi.id = i;
    newLi.textContent = getOutputString(product);
    let pieButton = _createElement("button", newLi);
    pieButton.textContent = "🥧";
    let barButton = _createElement("button", newLi);
    barButton.textContent = "📊";
    i++;
  }
}


Product.prototype.incrementDisplay = function() {
  this.displayed++;
}

Product.prototype.votedFor = function() {
  this.votedFor++;
}

function getOutputString(product) {
  let percentage;
  if (product.displayed === 0) {
    percentage = 0;
  } else {
    percentage = product.votedFor / product.displayed;
    percentage *= 100;
    percentage = round(percentage);
  }
  let outputString = product.name + ": " + product.votedFor + " out of " + product.displayed + " shown. (" + percentage + "%)";
  return outputString;
}

function randomProduct(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Product.prototype.renderProduct = function(index) {
  this.displayed++;
  let productName = document.getElementById("prod-" + index + "-name");
  let productImg = document.getElementById("prod-" + index + "-img");
  productName.textContent = this.name;
  productImg.setAttribute("src", this.imgPath);
  productImg.addEventListener('click', handleClick);
  productName.parentElement.id = this.id;
}

let newProducts = [
  ["R2D2 Suitcase", "img/bag.jpg"],
  ["Banana Slicer", "img/banana.jpg"],
  ["Toilet Paper & Tablet Holder", "img/bathroom.jpg"],
  ["Yellow Boots", "img/boots.jpg"],
  ["Compact Breakfast Maker", "img/breakfast.jpg"],
  ["Meatball Bubblegum", "img/bubblegum.jpg"],
  ["Curved Seat Chair", "img/chair.jpg"],
  ["Cthulhu Toy", "img/cthulhu.jpg"],
  ["Dog Duckbill", "img/dog-duck.jpg"],
  ["Canned Dragon Meat", "img/dragon.jpg"],
  ["Pen Utensil Attachments", "img/pen.jpg"],
  ["Pet Sweeping Boots", "img/pet-sweep.jpg"],
  ["Pizza Scissors", "img/scissors.jpg"],
  ["Shark Sleeping Bag", "img/shark.jpg"],
  ["Child Sweeper Onesie", "img/sweep.png"],
  ["Tauntaun Kids Sleeping Bag", "img/tauntaun.jpg"],
  ["Canned Unicorn Meat", "img/unicorn.jpg"],
  ["Bendable Water Can", "img/water-can.jpg"],
  ["Covered Wine Glass", "img/wine-glass.jpg"]
];

let backgroundColours = [
  "rgb(128, 0, 0)", "rgb(230, 25, 75)", "rgb(250, 190, 212)", "rgb(154, 99, 36)", "rgb(245, 130, 49)", 
  "rgb(255, 216, 177)", "rgb(128, 128, 0)", "rgb(255, 225, 25)", "rgb(255, 250, 200)", "rgb(191, 239, 69)", 
  "rgb(60, 180, 75)", "rgb(170, 255, 195)", "rgb(70, 153, 144)", "rgb(66, 212, 244)", "rgb(0, 0, 117)", 
  "rgb(67, 99, 216)", "rgb(145, 30, 180)", "rgb(220, 190, 255)", "rgb(240, 50, 230)", "#000000", "#ffffff"
];

let borderColours = [
  "rgb(128, 0, 0, 0.2)", "rgb(230, 25, 75, 0.2)", "rgb(250, 190, 212, 0.2)", "rgb(154, 99, 36, 0.2)", 
  "rgb(245, 130, 49, 0.2)", "rgb(255, 216, 177, 0.2)", "rgb(128, 128, 0, 0.2)", "rgb(255, 225, 25, 0.2)", 
  "rgb(255, 250, 200, 0.2)", "rgb(191, 239, 69, 0.2)", "rgb(60, 180, 75, 0.2)", "rgb(170, 255, 195, 0.2)", 
  "rgb(70, 153, 144, 0.2)", "rgb(66, 212, 244, 0.2)", "rgb(0, 0, 117, 0.2)", "rgb(67, 99, 216, 0.2)", 
  "rgb(145, 30, 180, 0.2)", "rgb(220, 190, 255, 0.2)", "rgb(240, 50, 230, 0.2)", "#000000", "#ffffff"
];

function createAProduct(name, url) {
  Product.products.push(new Product(name, url));
}

function generateProducts() {
  for (let i = 0; i < newProducts.length; i++) {
    let product = newProducts[i];
    let name = product[0];
    let url = product[1];
    createAProduct(name, url);
  }
}


// --- chart.js
function createAllSetup(type) {
  let labelDataObject = getAllLabelsAndData();
  const data = {
    labels: labelDataObject.labels,
    datasets: [{
      label: "All Products",
      data: labelDataObject.data,
      backgroundColor: backgroundColours
    }]
  }
  const config = {};

  if (type === "pie") {
    config.type = "pie";
    data.datasets[0].hoverOffset = 4;
  } else if (type === "bar") {
    config.type = "bar";
    config.options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
    data.datasets[0].borderWidth = 1;
    data.datasets[0].borderColor = borderColours;
  }
  config.data = data;
  return config;
}

function renderAllChart(elementId, config) {
  console.log(elementId);
  console.log(config);
  if (canvasChart !== undefined) {
    canvasChart.destroy();
  }
  canvasChart = new Chart(
    document.getElementById(elementId).getContext('2d'),
    config
  );
}

function getAllLabelsAndData() {
  let returnObject = {
    labels: [],
    data: []
  }
  for (let product of Product.products) {
    returnObject.labels.push(product.name);
    returnObject.data.push(product.votedFor);
  }
  return returnObject;
}





// --- modal

let allPieBtn = document.getElementById("view-pie");
let allBarBtn = document.getElementById("view-bar");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");
let cancelBtn = document.getElementById("cancel");
allPieBtn.onclick = function(){
  displayModal("pie");
}
allBarBtn.onclick = function() {
  displayModal("bar");
}
closeBtn.onclick = function(){
  handleClose();
}
cancelBtn.onclick = function() {
  handleClose();
}
window.onclick = function(e){
  if(e.target == modal){
    handleClose();
  }
}

function handleClose() {
  modal.style.display = "none";
}

function displayModal(type, data) {
  modal.style.display = "block";
  let title = document.getElementById("modal-h3");
  let productsChart = "productsChart";
  let config;
  if (type === "pie") {
    console.log("Pie");
    title.textContent = "Pie Chart (All Products)";
    config = createAllSetup("pie");
  } else if (type === "bar") {
    title.textContent = "Bar Chart (All Products)";
    config = createAllSetup("bar");
  }
  renderAllChart(productsChart, config)
}




generateProducts();
Product.renderProducts();