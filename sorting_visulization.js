const bars_container = document.getElementById("bars-container");



var DEFAULT_BARS_COUNT = localStorage.getItem('bars_count');
let randomNumber = [];
var isGenerated = false;
var inputBoxFired = false;

// change width via input
function changeWidth(e) {
    getVal = localStorage.getItem('bars_count');
    if(getVal != null) {
       localStorage.removeItem("bars_count");
    }
    localStorage.setItem('bars_count' , e.target.value);
}

// Reder bars over the browser while doucment loaded first
function randomGenerator(DEFAULT_BARS_COUNT) {
  if (isGenerated) {
    randomNumber = [];
    isGenerated = false;
    location.reload();
    
  } else {
    for (let i = 0; i < DEFAULT_BARS_COUNT; i++) {
      randomNumber.push(Math.max(5, Math.floor(Math.random() * DEFAULT_BARS_COUNT)));
    }
    isGenerated = true;
  }
  createBars(randomNumber);
}

// Random generator invoke
randomGenerator(DEFAULT_BARS_COUNT);

// Render bars to Html page
function createBars(heights) {
  for (var i = 0; i < heights.length; i++) {
    var random = Math.floor(Math.random() * heights.length);
    const div = document.createElement("div");
    div.innerHTML = `<p style="font-size:.5rem" class="heights">${heights[random]}</p>`;
    div.style.height = `${heights[random]}px`;
    div.classList.add("bars");
    bars_container.append(div);
  }
}

const bars = document.querySelectorAll(".bars");
// bars color context
var PRIMARY_COLOR = "red";
var SECONDARY_COLOR = "blue";
var SORTED_COLOR = "green";
var DEFAULT = "blueviolet";
var ANIMATION_SPEED = 100;
var REVMOVE_SPEED = 1;

// bubble sort
function bubbleSort() {
  for (let j = 0; j < randomNumber.length - 1; j++) {
    setTimeout(function () {
      for (let i = 0; i < randomNumber.length - j - 1; i++) {
        setTimeout(function () {
          if (randomNumber[i + 1] < randomNumber[i]) {
            bars[i].style.backgroundColor = PRIMARY_COLOR;

            //  swappin values
            swap(randomNumber, i, i + 1);
            var height1 = randomNumber[i];
            var height2 = randomNumber[i + 1];
            bars[i].style.height = height1 + "px";
            bars[i].firstChild.innerHTML = height1;
            bars[i + 1].style.height = height2 + "px";
            bars[i + 1].firstChild.innerHTML = height2;
          }

          //  reseting background color after comparing them
          setTimeout(function () {
            bars[i].style.backgroundColor = DEFAULT;
          }, REVMOVE_SPEED);
        }, i * ANIMATION_SPEED);
      }
    }, j * 1000);
  }
}

//  inserton sorting
function insertionSort() {
  for (let i = 1; i < randomNumber.length; i++) {
    setTimeout(function () {
      let temp = randomNumber[i];
      // color change to temprory val
      bars[i].style.backgroundColor = PRIMARY_COLOR;
      for (let j = i - 1, k = 0; j >= 0; j--, k++) {
        setTimeout(function () {
          //  searching right place
          if (temp < randomNumber[j]) {
            randomNumber[j + 1] = randomNumber[j];

            // set hight into inside top of the bars

            bars[j + 1].firstChild.innerHTML = randomNumber[j + 1];

            // updating heights to bars
            bars[j + 1].style.height = randomNumber[j] + "px";

            // set hight into inner html of bars
            bars[j].firstChild.innerHTML = temp;

            randomNumber[j] = temp;
            bars[j + 1].style.backgroundColor = SORTED_COLOR;
            bars[j].style.height = temp + "px";
          }

          //  Removing background
          setTimeout(function () {
            bars[j + 1].style.backgroundColor = DEFAULT;
          }, 100);
        }, k * 250);
      }

      // remove PRIMARY backgroundColor backgroundColor
      setTimeout(function () {
        bars[i].style.backgroundColor = DEFAULT;
      }, i * 500);
    }, i * 1000);
  }
}

//  Swaping
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


// Event Listeners
var widthInput = document.getElementById("width-input-box");
widthInput.addEventListener("change", changeWidth);

// change attribute value
widthInput.setAttribute("value", localStorage.getItem("bars_count"))

document
  .getElementById("generator-button")
  .addEventListener("click", randomGenerator);
document
  .getElementById("bubble-sort-button")
  .addEventListener("click", bubbleSort);
document
  .getElementById("insertion-sort-button")
  .addEventListener("click", insertionSort);
