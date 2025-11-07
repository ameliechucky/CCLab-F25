console.log("[a]: add a random dancer at mouseX, Y")
console.log("[d]: delete the oldest dancer")
console.log("[s]: switches on smoke")
console.log("[l]: switches on strobe light")

// If you're looking for all the dancer
// classes: those are in dancers.js.
// (Click the ">" icon next to "sketch.js"
//  above to see all files that make up this
//  sketch.)

// Add the name of all dancer classes in here:
let dancerClasses = [PumpkinMan, BunBun, Jellyfish, VioletTorch, dancingjohn, Chau, AAA, kirby, OldMan, EyeDancer];


let dancers = [];
let dancersUnsorted = [];
let floorY;
let nextDancerIndex = 0;
let smoke = [];
let strobe = false;
let strobePeriod = 4;

let gif;

function preload() {
  gif = loadImage("discoball.gif");
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  floorY = height * 0.6;
  dancerClasses = shuffle(dancerClasses);

}

function draw() {
  background(0);

  drawFloor();
  drawDancers();
  drawDiscoBall();
  drawLights();
  drawSmoke();

  if (keyIsPressed) {
    if (key == 's') {  // smoke machine
      smoke.push(new Smoke(width, height));
      if (200 < smoke.length) {
        smoke.shift();
      }
    }
  }
}

function keyPressed() {
  if (key == 'a') {  // add a new dancer
    //let newDancer = new dancerClasses[nextDancerIndex](random(150, width-150), random(floorY, height));
    let newDancer = new dancerClasses[nextDancerIndex](mouseX, mouseY);
    console.log(newDancer.constructor.name + " entered!");
    dancers.push(newDancer);
    dancersUnsorted.push(newDancer);
    nextDancerIndex = (nextDancerIndex + 1) % dancerClasses.length;
    sortDancersByY();
  } else if (key == 'd') {  // delete the oldest dancer
    if (0 < dancers.length) {
      let oldestDancer = dancersUnsorted.shift();
      console.log(oldestDancer.constructor.name + " left");
      // also delete the dancer from our sorted list of dancers
      for (let i = 0; i < dancers.length; i++) {
        if (dancers[i] == oldestDancer) {
          dancers.splice(i, 1);
          break;
        }
      }
    }
  } else if (key == 'l') {  // toggle the lights
    strobe = !strobe;
  } else if (keyCode == DOWN_ARROW) {  // slower strobe
    strobePeriod += 1;
  } else if (keyCode == UP_ARROW) {  // faster strobe
    if (strobePeriod > 2) {
      strobePeriod -= 1;
    }
  }
}

function drawFloor() {
  push();
  let perspY = height * 0.3;
  let tileW = width / 30;

  for (let x = -150; x <= width + 150; x += tileW) {
    stroke(255);
    line(width / 2, perspY, x, height);
  }
  let dy = 5;
  let y = floorY;
  while (y <= height) {
    line(0, y, width, y);
    dy *= 1.05;
    y += dy;
  }

  fill(0);
  noStroke();
  beginShape();
  vertex(-151, height);
  vertex(width / 2, perspY);
  vertex(-151, perspY);
  endShape();
  beginShape();
  vertex(width + 151, height);
  vertex(width / 2 + 1, perspY);
  vertex(width + 151, perspY);
  endShape();
  rect(0, 0, width, floorY);
  pop();
}

function drawDancers() {
  for (let i = 0; i < dancers.length; i++) {
    push();
    dancers[i].update();
    dancers[i].display();
    // HACK: this is for push() without
    // a matching pop() in dancers
    while (0 < this._styles.length) {
      pop();
    }
    // reset any angleMode() to the default
    angleMode(RADIANS);
    // reset colorMode()
    colorMode(RGB);
  }
}

function drawLights() {
  push();
  if (strobe && frameCount % strobePeriod == 0) {
    fill(255, 127);
    rect(0, 0, width, height);
  }
  pop();
}

function drawSmoke() {
  push();
  for (let i = 0; i < smoke.length; i++) {
    smoke[i].update();
    smoke[i].display();
  }
  pop();
}
function drawDiscoBall() {
  push();
  imageMode(CENTER);
  translate(width / 2, 70);
  scale(0.5);
  image(gif, 0, 0);
  pop();
}


class Smoke {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speedX = random(-1, -10);
    this.speedY = random(0, -4);
    this.size = random(20, 100);
    this.opacity = random(25, 128);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.99;
    this.speedY *= 0.99;
    this.opacity -= 0.1;
  }
  display() {
    if (this.opacity <= 0) {
      return;
    }
    fill(255, this.opacity);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

function sortDancersByY() {
  dancers = dancers.sort(function (a, b) {
    if (a.y < b.y) {
      return -1
    } else {
      return 1;
    }
  });
}

