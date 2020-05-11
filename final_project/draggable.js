// The logic of this code came from "Click and Drag an object" written by Daniel Shiffman <http://www.shiffman.net>
// I extended it in some ways for the purpose of my project

class Draggable {
  constructor(x, y, w, h, plant) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.plantImg = loadImage('icons/' + plant + '.svg'); //make the draggable object an image
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(200);
    strokeWeight(1);
    // Different fill based on state
    if (this.dragging) {
      fill(200);
    } else if (this.rollover) {
      fill(225);
    } else {
      noFill();
    }

    rect(this.x, this.y, this.w, this.h);
    image(this.plantImg, this.x, this.y, this.w, this.h)
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}
