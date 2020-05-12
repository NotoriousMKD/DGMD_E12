// Unit used to calculate garden size in pixels, relative to feet
let unit = defaultUnit()

let weight = 4

let gardenWidthSelect, gardenHeightSelect, gardenXFeet, gardenYfeet;
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

  let step = weight + unit;

  rect(gardenXStart, gardenYStart, gardenWidth, gardenHeight);

  // Draw vertical lines
  for (let x = gardenXStart + step ; x < gardenXEnd; x += step) {
    line(x, gardenYStart, x, gardenYEnd);
  }

  // Draw horizontal lines
  for (let y = gardenYStart + step; y < gardenYEnd; y += step) {
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
  let info = plantList()[plant];
  plant = new Draggable(50, 200, info.width - weight/2, info.height - weight/2, plant);

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
  gardenXFeet = parseInt(gardenWidthSelect.value())
  gardenYFeet = parseInt(gardenHeightSelect.value())

  // reset the unit to the default
  unit = defaultUnit()

  // Change the unit size if the garden wont fit vertically
  let gardenWontFit = gardenYFeet * unit > window.innerHeight - 100;
  if (gardenWontFit) {
    unit = (window.innerHeight - 200) / (gardenYFeet);
  }
  garden.forEach(function(plant) {
    let info = plantList()[plant.plant];
    plant.w = info.width - weight/2
    plant.h = info.height - weight/2
  });

}

function plantList() {
  let plantList = {
    // object containing info about each plant's constraints
    arugula: { height: unit / 4, width: unit / 4 },
    beansBush: { height: unit / 2, width: unit / 2 },
    beansPole: { height: unit / 2, width: unit / 2 },
    brusselsSprouts: { height: unit, width: unit },
    cabbage: { height: unit, width: unit },
    carrots: { height: unit / 4, width: unit / 4 },
    cauliflower: { height: unit, width: unit },
    celery: { height: unit / 2, width: unit / 2 },
    cucumber: { height: unit, width: unit },
    eggplant: { height: unit, width: unit },
    garlic: { height: unit / 2, width: unit / 2 },
    kale: { height: unit / 2, width: unit / 2 },
    leeks: { height: unit / 6, width: unit / 6 },
    lettuce: { height: unit / 5, width: unit / 5 },
    onion: { height: unit / 9, width: unit / 9 },
    pepper: { height: unit, width: unit },
    spinach: { height: unit / 9, width: unit / 9 },
    squash: { height: unit, width: unit},
    tomato: { height: unit, width: unit},
  }
  return plantList
}
