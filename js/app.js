
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
  toggleHidden("show-results");
  toggleHidden("title");
  toggleHidden("result-ul");
  Product.renderResults();
}

function handleResults() {
  toggleHidden("show-results");
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

Product.renderProducts = function() {
  let productArray = this.getRandomProducts();
  let i = 1;
  for (let product of productArray) {
    product.displayed++;
    let productName = document.getElementById("prod-" + i + "-name");
    let productImg = document.getElementById("prod-" + i + "-img");
    productName.textContent = product.name;
    productImg.setAttribute("src", product.imgPath);
    productImg.addEventListener('click', handleClick);
    productName.parentElement.id = product.id;
    i++;
  }
}

Product.getRandomProducts = function() {
  let returnArray = [];
  let randomIndexArray = [];
  let productArray = this.products;
  for (let i = 0; i < 3; i++) {
    let exists = true;
    while(exists) {
      let index = randomProduct(0, productArray.length - 1);
      if (!randomIndexArray.includes(index)) {
        exists = false;
        randomIndexArray.push(index);
        returnArray.push(productArray[index]);
      }
    }
  }
  return returnArray;
}

Product.renderResults = function() {
  sortArray(this.products);
  let ulElem = document.getElementById("result-ul");
  toggleHidden("result-ul");
  for (let product of this.products) {
    let newLi = _createElement("li", ulElem);
    let percentage;
    if (product.displayed === 0) {
      percentage = 0;
    } else {
      percentage = product.votedFor / product.displayed;
      percentage *= 100;
      percentage = round(percentage);
    }
    newLi.textContent = product.name + ": " + product.votedFor + " out of " + product.displayed + " shown. (" + percentage + "%)";
  }
}

Product.prototype.incrementDisplay = function() {
  this.displayed++;
}

Product.prototype.votedFor = function() {
  this.votedFor++;
}

function randomProduct(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let newProducts = [
  ["Bag", "img/bag.jpg"],
  ["Banana", "img/banana.jpg"],
  ["Bathroom", "img/bathroom.jpg"],
  ["Boots", "img/boots.jpg"],
  ["Breakfast", "img/breakfast.jpg"],
  ["Bubblegum", "img/bubblegum.jpg"],
  ["Chair", "img/chair.jpg"],
  ["Cthulhu", "img/cthulhu.jpg"],
  ["Dog Duck", "img/dog-duck.jpg"],
  ["Dragon", "img/dragon.jpg"],
  ["Pen", "img/pen.jpg"],
  ["Pet Sweep", "img/pet-sweep.jpg"],
  ["Scissors", "img/scissors.jpg"],
  ["Shark", "img/shark.jpg"],
  ["Sweep", "img/sweep.png"],
  ["Tauntaun", "img/tauntaun.jpg"],
  ["Unicorn", "img/unicorn.jpg"],
  ["Water Can", "img/water-can.jpg"],
  ["Wine Glass", "img/wine-glass.jpg"],
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