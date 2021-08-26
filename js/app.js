
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

function Product(name, imgPath, id) {
  this.name = name;
  this.imgPath = imgPath;
  this.displayed = 0;
  this.votedFor = 0;
  this.id = id;
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
    addToLocalStorage();
    handleResults();
  } else {
    Product.renderProducts();
  }
}

Product.totalVotes = 0;
Product.votesToComplete = 25;
Product.products = [];
Product.copyProducts = [];



Product.renderProducts = function() {
  let productArray = this.getRandomProducts();
  let i = 1;
  for (let product of productArray) {
    product.renderProduct(i);
    i++;
  }
}

Product.checkIfEmpty = function() {
  if (Product.copyProducts.length === 0) {
    Product.copyProducts = Product.products.slice();
  }
  return Product.copyProducts;
}

Product.getRandomProducts = function() {
  let returnObjectArray = [];
  let copyProducts = Product.copyProducts;

  let index = randomProduct(0, (Product.copyProducts.length - 1));
  let currentProduct = Product.copyProducts[index];
  returnObjectArray.push(currentProduct);
  Product.copyProducts.splice(index, 1);
  Product.checkIfEmpty();

  index = randomProduct(0, (Product.copyProducts.length - 1));
  currentProduct = Product.copyProducts[index];
  returnObjectArray.push(currentProduct);
  copyProducts.splice(index, 1);
  Product.checkIfEmpty();

  index = randomProduct(0, (Product.copyProducts.length - 1));
  currentProduct = Product.copyProducts[index];
  returnObjectArray.push(currentProduct);
  Product.copyProducts.splice(index, 1);
  Product.checkIfEmpty();

  return returnObjectArray;
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
    pieButton.addEventListener('click', displayModal);
    barButton.addEventListener('click', displayModal);
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
    percentage = getPercentage(product);
  }
  let outputString = product.name + ": " + product.votedFor + " out of " + product.displayed + " shown. (" + percentage + "%)";
  return outputString;
}

function getPercentage(product) {
  let percentage = product.votedFor / product.displayed;
  percentage *= 100;
  percentage = round(percentage);
  return percentage;
}

function randomProduct(min, max, roundDown) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let round = max - min + 1;
  if (roundDown !== undefined) {
    round = max - min;
  }
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
  ["R2D2 Suitcase", "img/bag.jpg", "0"],
  ["Banana Slicer", "img/banana.jpg", "1"],
  ["Toilet Paper & Tablet Holder", "img/bathroom.jpg", "2"],
  ["Yellow Boots", "img/boots.jpg", "3"],
  ["Compact Breakfast Maker", "img/breakfast.jpg", "4"],
  ["Meatball Bubblegum", "img/bubblegum.jpg", "5"],
  ["Curved Seat Chair", "img/chair.jpg", "6"],
  ["Cthulhu Toy", "img/cthulhu.jpg", "7"],
  ["Dog Duckbill", "img/dog-duck.jpg", "8"],
  ["Canned Dragon Meat", "img/dragon.jpg", "9"],
  ["Pen Utensil Attachments", "img/pen.jpg", "10"],
  ["Pet Sweeping Boots", "img/pet-sweep.jpg", "11"],
  ["Pizza Scissors", "img/scissors.jpg", "12"],
  ["Shark Sleeping Bag", "img/shark.jpg", "13"],
  ["Child Sweeper Onesie", "img/sweep.png", "14"],
  ["Tauntaun Kids Sleeping Bag", "img/tauntaun.jpg", "15"],
  ["Canned Unicorn Meat", "img/unicorn.jpg", "16"],
  ["Bendable Water Can", "img/water-can.jpg", "17"],
  ["Covered Wine Glass", "img/wine-glass.jpg", "18"]
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

function createAProduct(name, imgPath, id) {
  let newProduct = new Product(name, imgPath, id)
  Product.products.push(newProduct);
  return newProduct;
}

// function generateProducts() {
//   for (let i = 0; i < newProducts.length; i++) {
//     let product = newProducts[i];
//     let name = product[0];
//     let url = product[1];
//     let id = product[2];
//     createAProduct(name, url, id);
//   }
// }

function generateProducts() {
  let oldProductArray = localStorage.getItem("productArray");
  let highest = 0;
  let containsOld = false;
  if (oldProductArray !== null) {
    oldProductArray = JSON.parse(oldProductArray);
    for (let product of oldProductArray) {
      product.id = parseInt(product.id);
      let currentProduct = createAProduct(product.name, product.imgPath, product.id);
      currentProduct.displayed = parseInt(product.displayed);
      currentProduct.votedFor = parseInt(product.votedFor);
      if (currentProduct.displayed > highest) {
        highest = product.displayed;
      }
    }
  }
  for (let i = 0; i < newProducts.length; i++) {
    let product = newProducts[i];
    let name = product[0];
    let imgPath = product[1];
    let id = product[2];
    id = parseInt(id);
    let exists = false;
    let productCount = Product.products.length;
    let j = 0;
    
    while (exists === false && j < productCount) {
      if (Product.products[j].id === id) {
        exists = true;
      }
      j++;
    }
    if (exists === false) {
      createAProduct(name, imgPath, id);
    } else {

    }
  }
  for (let product of Product.products) {
    if (product.displayed < highest || highest === 0) {
      Product.copyProducts.push(product);
    }
  }
  // Product.copyProducts = Product.products.slice();
  localStorage.setItem("productArray", JSON.stringify(Product.products));
}


// --- chart.js
function createSingleSetup(type, index) {
  let config = createDataConfig(type,index);
  return config;
}

function createAllSetup(type) {
  let config = createDataConfig(type);
  return config;
}

function createDataConfig(type, index) {
  let labelDataObject;
  let label;
  if (index === undefined) {
    labelDataObject = getAllLabelsAndData();
    label = "All Products";
  } else {
    labelDataObject = getSingleLabelAndData(index);
    label = Product.products[index].name;
  }
  const data = {
    labels: labelDataObject.labels,
    datasets: [{
      label: label,
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

function renderAllCharts(elementId, config) {
  if (canvasChart !== undefined) {
    canvasChart.destroy();
  }
  canvasChart = new Chart(
    document.getElementById(elementId).getContext('2d'),
    config
  );
}

function getSingleLabelAndData(index) {
  let product = Product.products[index];
  let percentageChosen = getPercentage(product);
  let percentageNotChosen = 100 - percentageChosen;
  let returnObject = {
    labels: ["Percent Chosen", "Percent Not Chosen"],
    data: [percentageChosen, percentageNotChosen]
  };
  return returnObject;
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


  // localStorage.setItem("test", 123);
  // let test = localStorage.getItem("test");
  // console.log(test);
  // localStorage.removeItem("test");
  // test = localStorage.getItem("test");
  // console.log(test);

  //for (let product of Product.products) {
    //   let prodName = product.name.toLowerCase();
    //   prodName = prodName.split(" ").join("-");
    //   prodName = prodName.split("&").join("and");
    //   prodName = "prod-" + prodName;
    //   let prodStorage = localStorage.getItem(prodName);
    //       if (prodStorage === null) {
    //     localStorage.setItem(prodName, [product.votedFor, product.displayed]);
    //   } else {
    //     let voteArray = prodStorage.split(",");
    //     voteArray[0] = parseInt(voteArray[0]);
    //     voteArray[1] = parseInt(voteArray[1]);
    //     voteArray[0] += product.votedFor;
    //     voteArray[1] += product.displayed;
    //     localStorage.setItem(prodName, voteArray);
    //     product.votedFor = voteArray[0];
    //     product.displayed = voteArray[1];
    //   }
    // }

    

function addToLocalStorage() {
  // let oldProductArray = localStorage.getItem("productArray");
  // if (oldProductArray !== null) {
  //   oldProductArray = JSON.parse(oldProductArray);
  //   for (let product of Product.products) {
  //     let isProduct = false;
  //     let i = 0;
  //     while (isProduct !== true) {
  //       if (product.id === parseInt(oldProductArray[i].id)) {
  //         product.votedFor += parseInt(oldProductArray[i].votedFor);
  //         product.displayed += parseInt(oldProductArray[i].votedFor);
  //         isProduct = true;
  //       }
  //       i++;
  //     }
  //   }
  // }
  localStorage.setItem("productArray", JSON.stringify(Product.products));
}



// --- modal

let allPieBtn = document.getElementById("view-pie");
let allBarBtn = document.getElementById("view-bar");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");
let cancelBtn = document.getElementById("cancel");
allPieBtn.onclick = function(){
  displayModal(null, "pie");
}
allBarBtn.onclick = function() {
  displayModal(null, "bar");
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

function displayModal(event, type) {
  modal.style.display = "block";
  let parentElem;
  let index;
  let target;
  let product;
  let title = document.getElementById("modal-h3");
  let productsChart = "productsChart";
  let config;

  if (event !== null) {
    target = event.target;
    parentElem = event.target.parentElement;
    index = parseInt(parentElem.id);
    product = Product.products[index];
  }

  if (type === "pie") {
    title.textContent = "Pie Chart (All Products)";
    config = createAllSetup("pie");
  } else if (type === "bar") {
    title.textContent = "Bar Graph (All Products)";
    config = createAllSetup("bar");
  } else if (target.textContent === "🥧") {
    title.textContent = "Pie Chart (" + product.name + ") in Perctanges";
    config = createSingleSetup("pie", index);
  } else if (target.textContent === "📊") {
    title.textContent = "Bar Graph (" + product.name + ") in Percentages";
    config = createSingleSetup("bar", index);
  }
  renderAllCharts(productsChart, config);
}




generateProducts();
Product.renderProducts();