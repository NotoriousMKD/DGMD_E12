// Unit used to calculate garden size in pixels, relative to feet
let unit = defaultUnit()

let weight = 4
let weightNess = weight * 1.5

// Static object containing info about each plant's constraints
let plantList = {
  arugula: { height: (unit / 4 - weightNess), width: (unit / 4 - weightNess) },
  beansBush: { height: (unit / 2 - weightNess), width: (unit / 2 - weightNess) },
  beansPole: { height: (unit / 2 - weightNess), width: (unit / 2 - weightNess) },
  brusselsSprouts: { height: (unit - weightNess), width: (unit - weightNess) },
  cabbage: { height: (unit - weightNess), width: (unit - weightNess) },
  carrots: { height: (unit / 4 - weightNess), width: (unit / 4 - weightNess) },
  cauliflower: { height: (unit - weightNess), width: (unit - weightNess) },
  celery: { height: (unit / 2 - weightNess), width: (unit / 2 - weightNess) },
  cucumber: { height: (unit - weightNess), width: (unit - weightNess) },
  eggplant: { height: (unit - weightNess), width: (unit - weightNess) },
  garlic: { height: (unit / 4 - weightNess), width: (unit / 4 - weightNess) },
  kale: { height: (unit / 2 - weightNess), width: (unit / 2 - weightNess) },
  leeks: { height: (unit / 6 - weightNess), width: (unit / 6 - weightNess) },
  lettuce: { height: (unit / 5 - weightNess), width: (unit / 5 - weightNess) },
  onion: { height: (unit / 9 - weightNess), width: (unit / 9 - weightNess) },
  parsnip: { height: (unit / 9 - weightNess), width: (unit / 9 - weightNess) },
  pepper: { height: (unit - weightNess), width: (unit - weightNess) },
  spinach: { height: (unit / 9 - weightNess), width: (unit / 9 - weightNess) },
  squash: { height: (unit - weightNess), width: (unit - weightNess)},
  tomato: { height: (unit - weightNess), width: (unit - weightNess)},
};


let bgImage, gardenWidthSelect, gardenHeightSelect, gardenXFeet, gardenYfeet;
let garden = [];

function setup() {
  // create full screen canvas
  createCanvas(windowWidth, windowHeight);

  // get the garden dimension data
  gardenWidthSelect = select("#gardenWidth");
  gardenHeightSelect = select("#gardenHeight");
  gardenXFeet = parseInt(gardenWidthSelect.value());
  gardenYFeet = parseInt(gardenHeightSelect.value());

  // when the user chooses a plant, add it to the garden
  select("#addPlantButton").mousePressed(function () {
    let plant = select("#selectPlant").value();

    if (plant) {
      addToGarden(plant);
    }
  });

  // change the size of the garden on page load and when new values are selected
  resizeGarden();
  gardenWidthSelect.changed(resizeGarden);
  gardenHeightSelect.changed(resizeGarden);

  bgImage = loadImage('./garden.jpg');
}

function draw() {
  background('#bfd1b8');

  // draw the garden area
  strokeWeight(weight);
  stroke(51);
  fill(255);

  let gardenWidth = (gardenXFeet * unit) + (gardenXFeet * weight);
  let gardenHeight = (gardenYFeet * unit) + (gardenYFeet * weight);

  let gardenXStart = (windowWidth - gardenWidth) / 2;
  let gardenXEnd = gardenXStart + gardenWidth;

  let gardenYStart = (windowHeight - gardenHeight) / 2;
  let gardenYEnd = gardenYStart + gardenHeight;

  rect(gardenXStart, gardenYStart, gardenWidth, gardenHeight);

  // Draw vertical lines
  for (let x = gardenXStart + unit; x < gardenXEnd; x += (unit + (weight * 2))) {
    line(x, gardenYStart, x, gardenYEnd);
  }

  // Draw horizontal lines
  for (let y = gardenYStart + unit; y < gardenYEnd; y += (unit + (weight * 2))) {
    line(gardenXStart, y, gardenXEnd, y);
  }

  // methods from Draggable
  garden.forEach(function (plant) {
    plant.over();
    plant.update();
    plant.show();
  });
}

function mousePressed() {
  garden.forEach(function (plant) {
    plant.pressed();
  });
}

function mouseReleased() {
  garden.forEach(function (plant) {
    plant.released();
  });
}

// add new plant chosen by user to the page
function addToGarden(plant) {
  let start = unit / 2;
  let info = plantList[plant];
  plant = new Draggable(start, start, info.width, info.height, plant);

  garden.push(plant);
}

function windowResized() {
  // when the window is resized, resize our canvas and garden with it
  resizeCanvas(windowWidth, windowHeight);
  resizeGarden();
}

function defaultUnit() {
  return window.innerWidth * 0.085 // roughly 100px at 1200px wide screen
}

function resizeGarden() {
  // reset the unit to the default
  unit = defaultUnit()

  // Change the unit size if the garden wont fit vertically
  let gardenWontFit = gardenYFeet * unit > window.innerHeight;
  if (gardenWontFit) {
    unit = window.innerHeight / (gardenYFeet + 2);
  }
}
