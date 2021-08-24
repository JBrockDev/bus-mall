
'use strict';
console.log("Initialized");

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
  toggleHidden("view-graph");
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


generateProducts();
Product.renderProducts();