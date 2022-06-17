const bars_container = document.getElementById("bars-container");

// set default count of bars while global context is created
var DEFAULT_BARS_COUNT = localStorage.getItem("bars_count");
let randomNumber = [];
var isGenerated = false;
var inputBoxFired = false;

// change width via input
function changeWidth(e) {
  getVal = localStorage.getItem("bars_count");

  // if localstorage is Emapty will return null
  if (getVal != null) {
    localStorage.removeItem("bars_count");
  }

  // check is value is greater than 100
  if (e.target.value > 150) {
    alert("Please enter value less than 100 by default value would be 25");
    localStorage.setItem("bars_count", 25);
    return;
  }

  // storting value on local storage
  localStorage.setItem("bars_count", e.target.value);
}

// Reder bars over the browser while doucment loaded first
function randomGenerator(DEFAULT_BARS_COUNT) {
  if (isGenerated) {
    randomNumber = [];
    isGenerated = false;
    location.reload();
  } else {
    for (let i = 0; i < DEFAULT_BARS_COUNT; i++) {
      randomNumber.push(
        Math.max(5, Math.floor(Math.random() * DEFAULT_BARS_COUNT))
      );
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
var PRIMARY_COLOR = "lightpink";
var SECONDARY_COLOR = "darkpink";
var SORTED_COLOR = "green";
var DEFAULT = "blueviolet";



// bubble sort
function bubbleSort() {
  for (let j = 0; j < randomNumber.length - 1; j++) {
    setTimeout(function () {
      for (let i = 0; i < randomNumber.length - j - 1; i++) {
        setTimeout(function () {
          if (randomNumber[i + 1] < randomNumber[i]) {
            bars[i].style.backgroundColor = PRIMARY_COLOR;
            bars[i+1].style.backgroundColor = SECONDARY_COLOR;  
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
            bars[i+1].style.backgroundColor = DEFAULT;
          }, 1);
        }, i * 100);
      }
    }, j * 500);
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
            bars[j + 1].style.backgroundColor = SECONDARY_COLOR;
            bars[j].style.height = temp + "px";
          }

          //  Removing background
          setTimeout(function () {
            bars[j + 1].style.backgroundColor = DEFAULT;
          }, 75);
        }, k * 150);
      }

      // remove PRIMARY backgroundColor backgroundColor
      setTimeout(function () {
        bars[i].style.backgroundColor = DEFAULT;
      }, i * 250);
    }, i * 500);
  }
}

// Seclection Sort
function selectionSort() {
  for (let i = 0; i < randomNumber.length - 1; i++) {
    setTimeout(function () {
      let min = i;
      for (let j = i + 1; j < randomNumber.length; j++) {
        setTimeout(function () {
          if (randomNumber[j] < randomNumber[min]) {
            min = j;
          }
        }, 100);
      }

      setTimeout(function () {
        bars[min].style.backgroundColor = PRIMARY_COLOR;
        bars[i].style.backgroundColor = SECONDARY_COLOR;
        setTimeout(function () {
          //  swaping
          var temp = randomNumber[min];
          randomNumber[min] = randomNumber[i];
          //  updating height: ;
          bars[min].style.height = randomNumber[min] + "px";
          bars[min].firstChild.innerHTML = randomNumber[min];

          //  updatign innretext height
          randomNumber[i] = temp;
          bars[i].firstChild.innerHTML = randomNumber[i];
          bars[i].style.height = randomNumber[i] + "px";
        }, 100);
        setTimeout(function () {
          bars[min].style.backgroundColor = DEFAULT;
          bars[i].style.backgroundColor = DEFAULT;
        }, 100);
      }, 100);
    }, i * 250);
  }
}



// merge sort Helper
function mergeSortHelper(){
  var animations = [];
  mergeSort(randomNumber , 0 , randomNumber.length - 1 , animations);
  console.log(animations);
 
 for(let i = 0; i < animations.length; i++) {
    var array_bars = document.querySelectorAll('.bars');
    const isColorChange = i % 3 !== 2;
    if(isColorChange) {
      const [oneIdx  , twoIdx] = animations[i];
      const oneIdxStyle = array_bars[oneIdx].style;
      const twoIdxStyle = array_bars[twoIdx].style;
      const color = i % 3 !== 0 ? SECONDARY_COLOR : DEFAULT;
       
      setTimeout(function () {
        oneIdxStyle.backgroundColor = color;
        twoIdxStyle.backgroundColor = color;
      }, i * 10)
    }
    else {
       setTimeout(function () {
        const [barIdx   , barHeight] = animations[i];
        const barOneStyle = array_bars[barIdx].style;
        barOneStyle.height = barHeight + 'px';
       },i * 10)
    } 
 }
}


// Merge sorting Algorithms
function mergeSort(arr, low, high,animations) {
  if (low < high) {
    var mid = Math.floor((low + high) / 2);
    mergeSort(arr, low, mid,animations);
    mergeSort(arr, mid + 1, high,animations);
    // Mergin two sorted  arrays
    merge(arr, low, high, mid,animations);
  }
  return arr;
}

function merge(arr, low, high, mid,animations) {
  var i = low;
  var j = mid + 1;
  var k = i;
  
  // auxillary arr for storing sorted element
  var ans = [];
  while (i <= mid && j <= high) {
    // These are the value that we are comparint;
    // to change their color
    animations.push([i , j]);

    // These are the value that we are comparint;
    // to revert their color
    animations.push([i , j]);
    if (arr[i] < arr[j]) {

      // we overwrite the value of index k in original array with the
      // value at index i in the auxillary array
      animations.push([k , arr[i]]);
      ans[k++] = arr[i++];
    } else {

      // we overwrite the value of index k in original array with the
      // value at index i in the auxillary array
      animations.push([k , arr[j]]);
      ans[k++] = arr[j++];
    }
  }

  //    if first half arr has an elements
    while (i <= mid) {
      // These are the value that we are comparint;
     // to change their color
      animations.push([i , i]);

      // These are the value that we are comparint;
    // to revert their color
      animations.push([i , i]);

      // we overwrite the value of index k in original array with the
      // value at index i in the auxillary array
      animations.push([k , arr[i]]);
      ans[k++] = arr[i++];
    }

    // if second  half arr has an elements
    while (j <= high) {
      // These are the value that we are comparint;
     // to change their color
      animations.push([j , j]);

       // These are the value that we are comparint;
     // to revert their color
      animations.push([j , j]);
      
        // we overwrite the value of index k in original array with the
      // value at index i in the auxillary array
      animations.push([k , arr[j]]);
      ans[k++] = arr[j++];
    }
 
    //  coping Array element form auxillary arr to original array
    for (let k = low; k <= high; k++) {
        arr[k] = ans[k];
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
widthInput.setAttribute("value", localStorage.getItem("bars_count"));

document
  .getElementById("generator-button")
  .addEventListener("click", randomGenerator);
document
  .getElementById("bubble-sort-button")
  .addEventListener("click", bubbleSort);
document
  .getElementById("insertion-sort-button")
  .addEventListener("click", insertionSort);
document
  .getElementById("selection-sort-button")
  .addEventListener("click", selectionSort);

document
  .getElementById("merge-sort-button")
  .addEventListener("click", mergeSortHelper);