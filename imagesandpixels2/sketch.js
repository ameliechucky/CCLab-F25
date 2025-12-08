let cam;
let threshold = 10;
let cx = 0;
let cy = 0;
let firstPixel = false;
function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
  colorToTrack = color(0, 0, 0);
}

function draw() {
  image(cam, 0, 0);
  firstPixel = findColor(cam, colorToTrack, threshold);
  if (firstPixel != undefined) {
    fill(colorToTrack);
    strokeWeight(2);
    stroke(255);
    circle(cx, cy, 30);
  }
  console.log(firstPixel);
}
function mousePressed() {
  loadPixels();
  colorToTrack = cam.get(mouseX, mouseY);
}

function findColor(input, c, t) {
  let cr = c[0];
  let cg = c[1];
  let cb = c[2];
  input.loadPixels();

  for (let x = 0; x < input.width; x++) {
    for (let y = 0; y < input.height; y++) {
      let i = (x + y * input.width) * 4;
      let r = input.pixels[i + 0];
      let g = input.pixels[i + 1];
      let b = input.pixels[i + 2];
      if (
        r > cr - t && r < cr + t &&
        g > cg - t && g < cg + t &&
        b > cb - t && b < cb + t
      ) {
        cx = lerp(cx, x, 0.1);
        cy = lerp(cy, y, 0.1);
        return true;
      }
    }
  }
}
