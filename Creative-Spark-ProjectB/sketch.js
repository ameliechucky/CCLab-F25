let handPose;
let video
let hands = [];
let indexTip = 0;
let thumbTip = 0;
let midTip = 0;
let ringTip = 0;
let pinkyTip = 0;
let wrist = 0;

let paintbrush = 1
let mic
let flower = []
let rectangle = []
let pointer = []
let n = 0;
let pitch
let flowersize
let rectanglesizer = 0
let life = 15000
let handnumber = 1

let shape = rectangle;
let dragRect = false;
let rx, ry;
let a = 0;

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  // keep these 3 lines as they are
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");

  //use camera and hide image
  mic = new p5.AudioIn();
  mic.start();
  // fft = new p5.FFT();
  // fft.setInput(mic);

  //use videoera and hide image
  video = createCapture(VIDEO)
  video.size((640 / 800) * windowWidth, (480 / 500) * windowHeight)
  video.hide()

  ry = (300 / 500) * windowHeight + 100 - rectanglesizer;
  rx = (720 / 800) * windowWidth;
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function HandSignals() {
  for (let i = 0; i < hands.length; i++) {

    //keypoints
    indexTip = hands[i].keypoints[8];
    wrist = hands[i].keypoints[0];
    thumbTip = hands[i].keypoints[4];
    midTip = hands[i].keypoints[12];
    ringTip = hands[i].keypoints[16];
    pinkyTip = hands[i].keypoints[20];

    //keydistances
    let d1 = dist(indexTip.x, indexTip.y, wrist.x, wrist.y);
    let d2 = dist(midTip.x, midTip.y, wrist.x, wrist.y);
    let d3 = dist(ringTip.x, ringTip.y, wrist.x, wrist.y);

    //check handsignal for 1
    if (
      indexTip.y < thumbTip.y &&
      indexTip.y < midTip.y &&
      d1 > 120 &&
      abs(thumbTip.x - indexTip.x) < 30
    ) {
      handnumber = 1
      push()
      colorMode(HSB, 100)
      textSize(60);
      stroke(145, 220, 255)
      text("1", video.width - indexTip.x, indexTip.y);
      pop()
    }
    //check handsignal for 2
    if (
      indexTip.y < thumbTip.y &&
      indexTip.y > midTip.y &&
      abs(thumbTip.x - pinkyTip.x) < 30 &&
      abs(pinkyTip.y - ringTip.y) < 30 &&
      d1 > 120 &&
      d2 > 120
    ) {
      handnumber = 2
      push()
      colorMode(HSB, 100)
      textSize(60);
      stroke(145, 220, 255)
      text("2", video.width - indexTip.x, indexTip.y);
      pop()
    }

    //check handsignal for 3
    if (
      indexTip.y < thumbTip.y &&
      indexTip.y > midTip.y &&
      abs(thumbTip.x - pinkyTip.x) < 30 &&
      d1 > 120 &&
      d2 > 120 &&
      d3 > 120
    ) {
      handnumber = 3
      push()
      colorMode(HSB, 100)
      textSize(60);
      stroke(145, 220, 255)
      text("3", video.width - indexTip.x, indexTip.y);
      pop()
    }
  }
}

function drawShape(shape, a) {
  for (let i = a; i < shape.length; i++) {
    shape[i].display();
    shape[i].update();
  }
  for (let i = shape.length - 1; i >= 0; i--) {
    if (shape[i].murder()) {
      shape.splice(i, 1)
    }
  }
}
function mousePressed() {
  a = shape.length;
  fft = new p5.FFT();
  fft.setInput(mic);
}
function mouseReleased() {
  dragRect = false;
}

function draw() {

  //frequency indicator
  let spectrum = fft.analyze();
  n++;
  if (n > spectrum.length - 1) {
    n = 0;
  }
  pitch = spectrum[n];
  console.log(spectrum[n]);
  let rectpitch = map(spectrum[n], 0, 255, 0, 200);

  push()
  translate(video.width, 0)
  scale(-1, 1)
  image(video, 0, 0);
  filter(GRAY)
  pop()

  //setting arrayed for loops for rectangle, flower, and then pointy brush
  for (let i = rectangle.length - 1; i >= 0; i--) {
    rectangle[i].display()
    rectangle[i].update()
    if (rectangle[i].murder()) {
      rectangle.splice(i, 1)
    }
  }

  for (let i = pointer.length - 1; i >= 0; i--) {
    pointer[i].display()
    pointer[i].update()
    if (pointer[i].murder()) {
      pointer.splice(i, 1)
    }
  }

  for (let i = flower.length - 1; i >= 0; i--) {
    flower[i].display()
    if (flower[i].murder()) {
      flower.splice(i, 1)
    }
  }

  //nested if statement to actually draw and splice and objects
  if (mouseIsPressed) {
    //rectangle brush
    if (paintbrush == 1) {
      let rctsize = map(ry, (300 / 500) * windowHeight - 100, (300 / 500) * windowHeight + 100, 75, 10)
      rectangle.push(new brush1(mouseX, mouseY, rctsize))
      shape = rectangle;
    }
    //flower brush
    if (paintbrush == 2) {
      flowersize = map(pitch, 0, 255, 20, 200);
      flower.push(new brush2(mouseX, mouseY, flowersize))
      shape = flower;
    }
    //triangle brush
    if (paintbrush == 3) {
      let trisize
      if (handnumber == 1) { trisize = 10 }
      if (handnumber == 2) { trisize = 15 }
      if (handnumber == 3) { trisize = 25 }
      pointer.push(new brush3(mouseX, mouseY, trisize))
      shape = pointer;
    }

  }

  drawShape(shape, a);

  //screen frame
  noStroke()
  fill(0)
  //horizontal
  rect(0, (24 / 25) * height, width, height)
  //vertical
  rect((4 / 5) * width, 0, width, height)

  //brush buttons
  push()
  rectMode(CENTER)
  //hover interaction
  let scaler1 = 0
  let scaler2 = 0
  let scaler3 = 0

  //button 1
  if (mouseX > (660 / 800) * windowWidth && mouseX < (680 / 800) * windowWidth && mouseY > (20 / 500) * windowHeight && mouseY < (40 / 500) * windowHeight) { scaler1 = 10 }
  //button 2
  if (mouseX > (660 / 800) * windowWidth && mouseX < (680 / 800) * windowWidth && mouseY > (70 / 500) * windowHeight && mouseY < (90 / 500) * windowHeight) { scaler2 = 10 }
  //button 3
  if (mouseX > (660 / 800) * windowWidth && mouseX < (680 / 800) * windowWidth && mouseY > (120 / 500) * windowHeight && mouseY < (140 / 500) * windowHeight) { scaler3 = 10 }
  //click interaction
  if (mouseX > (660 / 800) * windowWidth && mouseX < (680 / 800) * windowWidth && mouseY > (20 / 500) * windowHeight && mouseY < (40 / 500) * windowHeight && mouseIsPressed) {
    scaler1 = 0
    paintbrush = 1
  }
  if (mouseX > (660 / 800) * windowWidth && mouseX < (680 / 800) * windowWidth && mouseY > (70 / 500) * windowHeight && mouseY < (90 / 500) * windowHeight && mouseIsPressed) {
    scaler2 = 0
    paintbrush = 2
  }
  if (mouseX > (660 / 800) * windowWidth && mouseX < (680 / 800) * windowWidth && mouseY > (120 / 500) * windowHeight && mouseY < (140 / 500) * windowHeight && mouseIsPressed) {
    scaler3 = 0
    paintbrush = 3
  }
  //actual buttons
  let rectstroke = 0
  let flowerstroke = 0
  let trianglestroke = 0
  if (paintbrush == 1) { rectstroke = 5 } else { rectstroke = 0 }
  if (paintbrush == 2) { flowerstroke = 5 } else { flowerstroke = 0 }
  if (paintbrush == 3) { trianglestroke = 5 } else { trianglestroke = 0 }

  //rectangle
  fill(255)
  stroke(236, 246, 148)
  strokeWeight(rectstroke)
  rect((670 / 800) * windowWidth, (30 / 500) * windowHeight, scaler1 + 20, scaler1 + 20)

  //flower
  stroke(255, 131, 175)
  strokeWeight(flowerstroke)
  rect((670 / 800) * windowWidth, (80 / 500) * windowHeight, scaler2 + 20, scaler2 + 20)

  //triangle
  stroke(145, 220, 255)
  strokeWeight(trianglestroke)
  rect((670 / 800) * windowWidth, (130 / 500) * windowHeight, scaler3 + 20, scaler3 + 20)
  pop()

  //brush button text
  fill(255)
  text("Flat Brush", (695 / 800) * windowWidth, (35 / 500) * windowHeight)
  text("Flower Brush", (695 / 800) * windowWidth, (85 / 500) * windowHeight)
  text("Sharp Brush", (695 / 800) * windowWidth, (135 / 500) * windowHeight)

  //flower sizing scale
  push()
  textAlign(CENTER, CENTER)
  text("voice", (670 / 800) * windowWidth, (210 / 500) * windowHeight - 30)
  pop()
  push()
  rectMode(CENTER)
  fill(255)
  rect((670 / 800) * windowWidth, (300 / 500) * windowHeight, 10, 200)

  fill(255, 131, 175)
  rect((670 / 800) * windowWidth, (300 / 500) * windowHeight + 100 - rectpitch, 40, 15);
  pop()

  //rectangle brush size scale
  push()
  textAlign(CENTER, CENTER)
  text("mouse", (720 / 800) * windowWidth, (210 / 500) * windowHeight - 30)
  pop()
  rectanglesizer = constrain(rectanglesizer, 0, ((3 / 5) * windowHeight + 200) - ((3 / 5) * windowHeight - 200))

  //ry = (300 / 500) * windowHeight + 100 - rectanglesizer;
  if (dragRect) {
    ry = mouseY
    ry = constrain(ry, (300 / 500) * windowHeight - 100, (300 / 500) * windowHeight + 100)
  }
  if (mouseIsPressed && mouseX > rx - 20 && mouseX < rx + 20 && mouseY > ry - (15 / 2) && mouseY < ry + 15 / 2) {
    dragRect = true;
  }
  push()
  rectMode(CENTER)
  rect((720 / 800) * windowWidth, (300 / 500) * windowHeight, 10, 200)

  fill(236, 246, 148)
  rect(rx, ry, 40, 15);
  pop()

  //triangle sizer
  push()
  textAlign(CENTER, CENTER)
  rectMode(CENTER)
  let strokesize1 = 0
  let strokesize2 = 0
  let strokesize3 = 0
  if (handnumber == 1) { strokesize1 = 5 } else { strokesize1 = 0 }
  if (handnumber == 2) { strokesize2 = 5 } else { strokesize2 = 0 }
  if (handnumber == 3) { strokesize3 = 5 } else { strokesize3 = 0 }

  //handsign indicators 1, 2, 3
  push()
  textAlign(CENTER)
  text("hand signals", (770 / 800) * windowWidth, (210 / 500) * windowHeight - 30)
  pop()
  strokeWeight(strokesize1)
  stroke(145, 220, 255)
  fill(255)
  rect((770 / 800) * windowWidth, (210 / 500) * windowHeight, 20, 20)
  noStroke()
  fill(0)
  textSize(15)
  text("1", (770 / 800) * windowWidth, (210 / 500) * windowHeight)

  strokeWeight(strokesize2)
  stroke(145, 220, 255)
  fill(255)
  rect((770 / 800) * windowWidth, (300 / 500) * windowHeight, 20, 20)
  noStroke()
  fill(0)
  textSize(15)
  text("2", (770 / 800) * windowWidth, (300 / 500) * windowHeight)

  strokeWeight(strokesize3)
  stroke(145, 220, 255)
  fill(255)
  rect((770 / 800) * windowWidth, (390 / 500) * windowHeight, 20, 20)
  noStroke()
  fill(0)
  textSize(15)
  text("3", (770 / 800) * windowWidth, (390 / 500) * windowHeight)
  pop()

  //clear sketch button
  push()
  rectMode(CENTER)
  //hover interaction
  let scaler4 = 0
  if (mouseX > (650 / 800) * windowWidth && mouseX < (740 / 800) * windowWidth && mouseY > (440 / 500) * windowHeight && mouseY < (480 / 500) * windowHeight) {
    scaler4 = 10
  }
  //click interaction
  if (mouseX > (650 / 800) * windowWidth && mouseX < (740 / 800) * windowWidth && mouseY > (440 / 500) * windowHeight && mouseY < (480 / 500) * windowHeight && mouseIsPressed) {
    scaler4 = 0
  }
  //actual clear button
  fill(255, 0, 0)
  rect((695 / 800) * windowWidth, (460 / 500) * windowHeight, scaler4 + 90, scaler4 + 40)
  fill(255)
  textAlign(CENTER, CENTER)
  let scaler5 = 15
  if (scaler4 == 10) { scaler5 = 20 }
  textSize(scaler5)
  text("CLEAR SKETCH", (695 / 800) * windowWidth, (460 / 500) * windowHeight, scaler4 + 90, scaler4 + 40)
  pop()

  //clear function
  if (mouseX > (650 / 800) * windowWidth && mouseX < (740 / 800) * windowWidth && mouseY > (440 / 500) * windowHeight && mouseY < (480 / 500) * windowHeight && mouseIsPressed) {
    life = 0
  } else { life = 15000 }

  //info button
  push()
  rectMode(CENTER)
  textAlign(CENTER, CENTER)
  colorMode(HSB, 100)
  noFill()
  stroke(255, 0, 100)
  rect((775 / 800) * windowWidth, (470 / 500) * windowHeight, 40, 20)
  text("info", (775 / 800) * windowWidth, (470 / 500) * windowHeight)

  //info hover
  if (mouseX > (775 / 800) * windowWidth - 20 && mouseX < (775 / 800) * windowWidth + 20 && mouseY > (470 / 500) * windowHeight - 10 && mouseY < (470 / 500) * windowHeight + 10) {
    for (let x = (1 / 5) * windowWidth; x <= (3 / 5) * windowWidth; x += 5) {
      let color = map(x, (1 / 5) * windowWidth, (3 / 5) * windowWidth, 0, 100)
      fill(color, 50, 100)
      noStroke()
      rect(x, (12 / 25) * windowHeight, 5, 100)
    }
    //rect(640 / 2, 480 / 2, 500, 100)
    fill(0)
    text("You all have lost touch with what it means to be human. Creation comes from you. Reclaim your humanity. You are connected to the art you create, don't worry about perfection or skill, just put something on the page and bring back color and vibrance into your lives. Each brush has its own color coresponding sizer, use your voice to change the flower, use your mouse to drag the yellow scale to change the rectanlge, and make numbers 1,2, or 3 with your hand to alternate triangle brush sizes.", (2 / 5) * windowWidth, (12 / 25) * windowHeight, 500, 100)
  }
  pop()
  //console.log(handnumber)
  HandSignals()
}

//rectangle brush
class brush1 {
  constructor(x, y, w) {
    this.x = x
    this.y = y
    this.w = w
    this.color = video.get(video.width - mouseX, mouseY);
    this.var = dist(mouseX, mouseY, width / 2, height / 2)
    this.hyp = dist(width / 2, height / 2, 0, 0)
    this.angle = map(this.var, 0, this.hyp, 0, 10 * PI)
    this.born = millis()
  }
  display() {
    push()
    angleMode(RADIANS);
    translate(this.x, this.y)
    rectMode(CENTER)
    rotate(this.angle)
    noStroke()
    fill(this.color)
    rect(0, 0, this.w, this.w)
    pop()
  }
  update() {
    this.w = this.w + sin(0.1 * frameCount)
  }
  murder() {
    return millis() - this.born > life
  }
}

//flower brush
class brush2 {
  constructor(x, y, s) {
    this.x = x
    this.y = y
    this.c = video.get(video.width - mouseX, mouseY);
    this.s = s
    this.born = millis()
  }
  display() {

    push();
    angleMode(RADIANS);
    translate(this.x, this.y);
    noFill()
    stroke(this.c)
    beginShape();
    for (let angle = 0; angle < 2 * PI; angle += PI / 50) {
      push();
      rotate(angle);
      let R = 0 + map(sin(frameCount * 0.1 + angle / 0.05), -1, 1, 0, this.s);
      let xc = R * cos(angle);
      let yc = R * sin(angle);
      curveVertex(xc, yc);
      pop();
    }
    endShape(CLOSE);
    pop();
  }
  update() {

  }
  murder() {
    return millis() - this.born > life
  }
}

//triangle brush
class brush3 {

  constructor(x, y, hyp) {
    this.x = x
    this.y = y
    this.hyp = hyp
    this.angle = 0
    this.anglebaby = 0
    this.color = video.get(video.width - mouseX, mouseY);
    this.born = millis()
  }
  display() {
    push()
    angleMode(DEGREES)
    translate(this.x, this.y)
    rotate(this.angle)
    noStroke()
    fill(this.color)
    triangle(-this.hyp * cos(30), this.hyp * sin(30), this.hyp * cos(30), this.hyp * sin(30), 0, -this.hyp)

    //top baby triangle
    push()
    translate(0, -this.hyp)
    rotate(this.anglebaby)
    triangle(-this.hyp * cos(30), this.hyp * sin(30), this.hyp * cos(30), this.hyp * sin(30), 0, -this.hyp)
    pop()

    //left baby triangle
    push()
    translate(-this.hyp * cos(30), this.hyp * sin(30))
    rotate(this.anglebaby)
    triangle(-this.hyp * cos(30), this.hyp * sin(30), this.hyp * cos(30), this.hyp * sin(30), 0, -this.hyp)
    pop()

    //right baby triangle
    push()
    translate(this.hyp * cos(30), this.hyp * sin(30))
    rotate(this.anglebaby)
    triangle(-this.hyp * cos(30), this.hyp * sin(30), this.hyp * cos(30), this.hyp * sin(30), 0, -this.hyp)
    pop()

    pop()

  }
  update() {
    this.angle++
    this.anglebaby -= 1.75
  }
  murder() {
    return millis() - this.born > life
  }
}