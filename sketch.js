let x;
let y;
let R = 100;
let vNumber = 20;
let smoothness = 0.5;
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
}

function draw() {
    background(0);
    noStroke();
    push();
    translate(width / 2, height / 2);
    rotate(sin(frameCount * 0.01));
    beginShape();
    for (let i = 0; i < TWO_PI; i += TWO_PI / vNumber) {
        let offset = noise(
            smoothness * sin(i),
            smoothness * cos(i),
            frameCount * 0.01
        );
        offset = map(offset, 0, 1, -R * 0.2, R * 0.2);
        let radius = R + offset;
        x = radius * cos(i);
        y = radius * sin(i);
        curveVertex(x, y);
        // fill(255);
        // noStroke();
        //circle(x,y, 5);
    }
    endShape(CLOSE);
    pop();
}


