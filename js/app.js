
'use strict';
console.log("Initialized");


function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.displayed = 0;
  this.votedFor = 0;
}

Product.products = [];

Product.getRandomProducts = function() {
  let returnArray = [];
  let randomIndexArray = [];
  let productArray = Product.products;
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

Product.prototype.renderProduct = function() {
  // render this product
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
  ["AAA", "url1"],
  ["BBB", "url2"],
  ["CCC", "url3"]
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
Product.getRandomProducts();