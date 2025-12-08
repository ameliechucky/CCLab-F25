class Misheel {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.speed = 0.005;
    this.radius = 70;
    this.count = 8;
    this.speedAngle = 0.02;
  }
  display() {
    push();
    translate(this.x - 200, this.y - 200);

    // --- base triangle ---
    beginShape();
    fill(255, 255, 0, 100);
    stroke(253, 216, 8);
    strokeWeight(2);
    vertex(180, 200);
    vertex(220, 200);
    vertex(240, 330);
    vertex(160, 330);
    endShape(CLOSE);

    beginShape();
    fill(255, 255, 0, 200);
    noStroke();
    vertex(190, 200);
    vertex(210, 200);
    vertex(220, 300);
    vertex(180, 300);
    endShape(CLOSE);

    // --- body ---
    fill(128, 128, 128);
    stroke(0);
    strokeWeight(1);
    arc(200, 200, 140, 50, 0, TWO_PI);

    push();
    noFill();
    stroke(0);
    translate(200, 200);

    for (let i = 0; i < this.count; i++) {
      let a = this.angle + (TWO_PI / this.count) * i;
      let cx = this.radius * 0.8 * cos(a);
      let cy = this.radius * 0.28 * sin(a);
      fill(255, 0, 0);
      circle(cx, cy, 4);
    }
    for (let i = 0; i < this.count; i++) {
      let a = this.angle + (TWO_PI / this.count) * i;
      let cx = this.radius * 0.8 * cos(a);
      let cy = this.radius * 0.33 * sin(a);
      fill(0);
      line(cx, cy, 0, 0);
    }
    pop();

    // --- face ---
    fill(0, 255, 255, 180);
    arc(200, 200, 60, 80, PI, 0);
    strokeWeight(5);
    stroke(0, 0, 255);
    arc(200, 200, 60, 10, 0, PI);
    fill(0);
    circle(200, 158, 1);

    // --- head pop ---
    push();
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    let steps = 40;
    for (let i = 0; i <= 1; i += 1 / steps) {
      let x = lerp(200, 200, i);
      let y = lerp(158, 128, i);
      let v = 3 * sin(frameCount * 0.2 - i * 15);
      vertex(x + v, y);
    }
    endShape();
    fill(255, 0, 0);
    circle(200, 128, 8);
    pop();

    // --- eyes ---
    stroke(0);
    strokeWeight(1);
    fill(255);
    arc(200 - 7, 200 - 20, 12, 15, 0, TWO_PI);
    arc(200 + 7, 200 - 20, 12, 15, 0, TWO_PI);
    fill(0);
    circle(200 + 7, 200 - 20, 2);
    circle(200 - 7, 200 - 20, 2);

    // --- small mouth dot ---
    arc(200, 190, 5, 5, 0, PI);

    pop();
  }
  update() {
    this.x = noise(frameCount * this.speed) * width;
    this.y = noise(frameCount * this.speed + 1000) * height; // offset for independent Y
    this.angle += this.speedAngle;

  }
}

//Helena
class Stanley {
  constructor(startX, startY) {
    this.baseX = startX;
    this.baseY = startY;
    this.baseScale = 1.00;

    this.colWhite = "#fffbf0";
    this.colBrown = "#c6b6ac"
    this.colRed = "#fb3310"

    this.armsY = [0, 0, 22, 22]
    this.armsScaleX = [1, -1, 1, -1]
    //left upper arm, right upper arm, left bottom arm, right bottom arm


    this.legSwingSpeed = 1
    this.armSwingSpeed = 1
    this.blinkTimer = 0;
    this.t = 0
    this.heartSize = 10
    this.moveSpeed = 0

  }


  upperPaws() {
    fill("#c6b6ac");
    for (let angle = PI / 6; angle < PI; angle += PI / 3) {
      const x = 9 * cos(angle);
      const y = 9 * sin(angle);
      circle(x, y, 7);
    }
    circle(0, 0, 10)
  }

  bottomPaws() {
    fill("#c6b6ac");
    for (let angle = PI / 6; angle < PI; angle += PI / 3) {
      const x = 9 * cos(angle);
      const y = 9 * sin(angle);
      circle(x, y, 8);
    }
    circle(0, 0, 10)

  }

  upperArms(a = 0) {
    //left upper arm
    stroke(this.colWhite);
    strokeWeight(8);
    fill(this.colWhite)
    push()
    rotate(-PI / 8 + a);
    ellipse(-23, 5, 20, 3);
    rotate(PI / 4 + a * 0.2);
    ellipse(-33, 28, 25, 5);

    //let upper paw
    noStroke()
    fill(this.colBrown)
    push();
    translate(-45, 28);
    rotate(PI / 1.5);
    this.upperPaws();
    pop();

    pop()
  }

  bottomArms(a = 0) {
    //left bottom arm
    stroke(this.colWhite);
    strokeWeight(8);
    fill(this.colWhite)
    push()
    rotate(-PI / 8 + a);
    ellipse(-30, 3, 30, 4);
    rotate(PI / 4 + a * 0.2);
    ellipse(-45, 33, 35, 5);

    //left bottom paw
    noStroke()
    fill(this.colBrown)
    push();
    translate(-60, 33);
    rotate(PI / 1.5);
    this.bottomPaws();
    pop();

    pop()
  }




  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    scale(this.s)

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    //Main body
    noStroke();
    fill(this.colWhite);
    rect(-5, -10, 10, 20)
    ellipse(0, 24, 25, 55);//body

    //Head

    push()
    translate(0, -15);
    rotate(this.headSwing);
    translate(0, 15);
    if (mouseIsPressed) {
      colorMode(HSB, 100)
      const h = map(sin(this.t * 0.5), -1, 1, 0, 100)
      fill(h, 80, 100)
    } else {
      fill(this.colRed)
    }

    beginShape();
    curveVertex(0, -15);
    curveVertex(12, -8);
    curveVertex(48, -15);
    curveVertex(35, -70);
    curveVertex(0, -90);
    curveVertex(-35, -70);
    curveVertex(-48, -15);
    curveVertex(-12, -8);
    curveVertex(0, -15);
    endShape();

    //eyes
    noStroke()
    fill(255)
    if (!this.blink) {
      ellipse(-10, -30, 6, 12);
      ellipse(10, -30, 8, 15);
    } else {
      noFill()
      stroke(255)
      strokeWeight(3)
      arc(-10, -30, 6, 12, -PI, 0,);
      arc(10, -30, 8, 15, -PI, 0);
    }

    //Patten on head
    fill(255)
    noStroke()
    push()
    translate(10, -65)
    rotate(PI / 6)
    ellipse(0, 0, 15, 12);
    pop()

    push()
    translate(-18, -70)
    rotate(-PI / 4.5)
    ellipse(0, 0, 45, 25);
    pop()

    push()
    translate(25, -73)
    rotate(PI / 4)
    ellipse(0, 0, 30, 10);
    pop()


    pop()

    //upper arms
    for (let i = 0; i < 2; i++) {
      const sx = this.armsScaleX[i]
      const a = this.upperArmsSwing;
      push();
      scale(sx, 1)
      this.upperArms(a);
      pop();
    }

    //bottom arms
    for (let i = 2; i < 4; i++) {
      const y = this.armsY[i]
      const sx = this.armsScaleX[i]
      const a = this.bottomArmsSwing;
      push();
      translate(0, y);
      scale(sx, 1)
      this.bottomArms(a);
      pop();
    }


    //left leg
    noStroke();
    fill(this.colWhite);
    push();
    translate(-8, 55);
    rotate(-1 * this.leftLegSwing);
    this.leftLength = map(sin(this.t * 5), -1, 1, 62, 52)
    ellipse(0, 10, 16, this.leftLength);
    pop();

    //right leg
    noStroke();
    fill(this.colWhite);
    push();
    translate(8, 55);
    rotate(this.rightLegSwing);
    this.rightLength = map(sin(this.t * 5), -1, 1, 52, 62)
    ellipse(0, 10, 16, this.rightLength);
    pop();


    //Heart
    if (mouseIsPressed) {
      colorMode(HSB, 100)
      const h = map(sin(this.t * 0.5), -1, 1, 0, 100)
      fill(h, 80, 100)
    } else {
      fill(this.colRed)
    }
    arc(-3, 12, 4 + this.heartSize, 4 + this.heartSize, 3 * PI / 4, 7 * PI / 4)
    arc(3, 12, 4 + this.heartSize, 4 + this.heartSize, 5 * PI / 4, PI / 4)
    push()
    translate(0, 15)
    rotate(PI / 4)
    rectMode(CENTER)
    rect(0, 0, 4 + this.heartSize, 4 + this.heartSize)
    pop()

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    //this.drawReferenceShapes()

    pop();
  }

  // drawReferenceShapes() {
  //   noFill();
  //   strokeWeight(1)
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }


  update() {
    this.t += 0.03

    //leg
    if (keyIsPressed) {
      this.legSwingSpeed = 5
    } else {
      this.legSwingSpeed = 1
    }
    this.leftLegSwing = 0.2 * sin(this.legSwingSpeed * this.t + 5
    );
    this.rightLegSwing = 0.2 * sin(this.legSwingSpeed * this.t
    )
    //arm
    if (keyIsPressed) {
      this.armSwingSpeed = 5
    } else {
      this.armSwingSpeed = 1
    }
    this.upperArmsSwing = 0.4 * sin(this.armSwingSpeed * this.t);
    this.bottomArmsSwing = 0.2 * sin(this.armSwingSpeed * this.t);
    this.headSwing = 0.18 * sin(this.t * 1.2);

    //blink
    this.blinkTimer = (this.blinkTimer + 1) % 110;//the frequency of blinking
    this.blink = (this.blinkTimer < 30);
    //the real blinking time

    this.heartSize = map(sin(this.t), -1, 1, 5, 9)


    //overall
    if (keyIsPressed) {
      this.moveSpeed = 5
    } else {
      this.moveSpeed = 1
    }
    this.x = this.baseX + 30 * sin(this.moveSpeed * this.t * 0.6);
    this.y = this.baseY + 15 * sin(this.moveSpeed * this.t * 1.2 + PI / 2);
    this.s = this.baseScale + -0.3 * sin(this.t * 1.1);

  }
  // update properties here to achieve
  // your dancer's desired moves and behaviour
}
//jahangir
class EyeDancer {
  constructor(startX, startY) {
    this.rect_x = startX
    this.rect_y = startY
    this.rect_start_y = startY
    this.rect_w = 56 * random(0.3, 1.8)
    this.rect_h = 56 * random(0.3, 1.8)
    this.rect_y_s = 0
    this.rect_x_s = 0
    this.rect_x_scale = 1.0
    this.rect_y_scale = 1.0
    this.rect_stage = 0
    this.eye_x = 0
    this.eye_y = 0

  }
  update() {
    //stage 0 rect is preparing to jump x scale is increasing 
    if (this.rect_stage == 0 && this.rect_x_scale < 1.2) {
      this.rect_x_scale += 0.03
      this.rect_y_scale = 2 - this.rect_x_scale
    }
    if (this.rect_stage == 0 && this.rect_x_scale >= 1.2) {
      this.rect_stage = 1
    }
    if (this.rect_stage == 1) {
      this.rect_stage = 2
      this.rect_y_scale = 0.1 + this.rect_x_scale
      this.rect_x_scale = 2 - this.rect_y_scale
      this.rect_y_s = -1 / 2 * (this.rect_h * this.rect_y_scale - this.rect_h)

    } else if (this.rect_stage == 2) {
      //stage 1 rect is jumping x is converted to y and calculating speed
      this.rect_y_s += 1
      if (this.rect_y + this.rect_h * this.rect_y_scale * 1 / 2 + this.rect_y_s <= this.rect_start_y + this.rect_h * this.rect_y_scale * 1 / 2) {
        this.rect_y += this.rect_y_s
      } else {
        this.rect_y = this.rect_start_y
        this.rect_stage = 3
      }
      if (this.rect_y_s < 0) {
        this.eye_y = 5
      } else {
        this.eye_y = -5
      }
    }
    if (this.rect_stage == 3) {
      if (this.rect_y_scale > 1) {
        this.rect_y_scale += -0.001
        this.rect_y_scale += - 0.6 * pow((1 - this.rect_y_scale), 2)
      } if (this.rect_y_scale < 1) {
        this.rect_y_scale += 0.001
        this.rect_y_scale += 0.5 * pow((1 - rect_y_scale), 2)
      }
      this.rect_x_scale = 2 - this.rect_y_scale

      if (this.rect_y_scale <= 1.01 && this.rect_y_scale >= 0.99) {
        this.rect_stage = 0
      }
      this.eye_y = 0
    }
  }
  m_rect(x, y, w, h, s_w, s_h) {
    rectMode(CENTER)
    noStroke()
    y += -1 / 2 * (h * s_h - h)
    rect(x, y, w * s_w, h * s_h)
  }
  display() {
    fill(255)
    this.m_rect(this.rect_x, this.rect_y, this.rect_w, this.rect_h, this.rect_x_scale, this.rect_y_scale)
    fill(0)


    this.eye_x = noise(frameCount * 0.05) * 1 + sin(frameCount * 0.05) * 1

    this.m_rect(this.rect_x + this.eye_x, this.rect_y, 20, 20, this.rect_x_scale, this.rect_y_scale)
  }
}
//siyu
class OldMan {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.s = 40
    this.z = this.x * 1;
    this.z1 = this.y * 1;
    this.x1 = startX; //I fixed this
    this.x2 = startY;//I fixed this
    this.x0 = startX;//I fixed this
    this.y0 = startY;//I fixed this

  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.y = sin(frameCount * 0.1) * 1 + this.y0;//I fixed this
    this.x2 = -sin(frameCount * 0.1) * 3 + this.x0;//I fixed this
    this.x = sin(frameCount * 0.1) * 15 + this.x0;//I fixed this
    this.x1 = sin(frameCount * 0.1) * 3 + this.y0;//I fixed this
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    //head+neck
    noStroke()
    fill(240, 216, 202)
    circle(0, 0 - this.s * 0.4, this.s * 0.9)
    rectMode(CENTER);
    rect(0, 0 + this.s * 0.1, this.s * 0.1, this.s * 0.2)
    //hands
    push();
    translate(-this.x, -this.y);
    stroke(940, 216, 202)
    strokeWeight(4);
    line(this.x - this.s * 0.3, this.y + this.s * 0.15, this.x - this.s * 0.8, this.y + this.s * 0.15)
    line(this.x - this.s * 0.8, this.y + this.s * 0.15, this.z - this.s * 0.8, this.z1 + this.s * 0.65)
    line(this.x + this.s * 0.3, this.y + this.s * 0.15, this.x + this.s * 0.8, this.y + this.s * 0.15)
    line(this.x + this.s * 0.8, this.y + this.s * 0.15, this.z + this.s * 0.8, this.z1 + this.s * 0.65)
    //legs
    line(this.z - this.s * 0.2, this.z1 + this.s, this.x - this.s * 0.5, this.y + this.s * 1.3);
    line(this.x - this.s * 0.5, this.y + this.s * 1.3, this.z - this.s * 0.5, this.z1 + this.s * 1.6);
    line(this.z + this.s * 0.2, this.z1 + this.s, this.x2 + this.s * 0.5, this.y + this.s * 1.3);
    line(this.x2 + this.s * 0.5, this.y + this.s * 1.3, this.z + this.s * 0.5, this.z1 + this.s * 1.6)
    //clothes
    noStroke()
    fill(233, 215, 192)
    //rect(x,y+s*0.6,s*0.6,s*0.96)
    beginShape()
    vertex(this.x - this.s * 0.3, this.y + this.s * 0.1)
    vertex(this.x + this.s * 0.3, this.y + this.s * 0.1)
    vertex(this.z + this.s * 0.3, this.z1 + this.s * 0.96)
    vertex(this.z - this.s * 0.3, this.z1 + this.s * 1)
    endShape(CLOSE)
    //baojie

    fill(255, 130, 0)
    stroke(255, 130, 0)
    strokeWeight(1)
    beginShape();
    vertex(this.x - this.s * 0.3, this.y + this.s * 0.13)
    vertex(this.x - this.s * 0.16, this.y + this.s * 0.13)
    vertex(this.x - this.s * 0.05, this.y + this.s * 0.4)
    vertex(this.z - this.s * 0.05, this.z1 + this.s * 1)
    vertex(this.z - this.s * 0.3, this.z1 + this.s)
    endShape(CLOSE)
    beginShape()
    vertex(this.x + this.s * 0.3, this.y + this.s * 0.13)
    vertex(this.x + this.s * 0.16, this.y + this.s * 0.13)
    vertex(this.x + this.s * 0.05, this.y + this.s * 0.4)
    vertex(this.z + this.s * 0.05, this.z1 + this.s * 1)
    vertex(this.z + this.s * 0.3, this.z1 + this.s)
    endShape(CLOSE);
    //green

    stroke(166, 255, 0);
    strokeWeight(3)
    fill(255, 232, 0)
    rectMode(CENTER);
    rect(this.x - this.s * 0.23 * 1.4 + this.s * 0.16, this.y + this.s * 0.7, this.s * 0.23, this.s * 0.1)
    rect(this.x + this.s * 0.23 * 1.4 - this.s * 0.16, this.y + this.s * 0.7, this.s * 0.23, this.s * 0.1)

    pop();



    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    //rectMode(CORNER);
    //this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}

//ujin
class kirby {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.armSwing = 0;
    this.size = 200;
  }
  update() {
    this.y = noise(frameCount * 0.01) * height;
    this.armSwing = sin(frameCount * 0.1) * 20;
  }
  display() {
    push();
    translate(this.x, this.y);

    noStroke();

    // feet
    fill(235, 52, 137);
    ellipse(70, 90, 110, 70);
    ellipse(-70, 90, 110, 70);

    // arms
    fill(250, 137, 190);
    ellipse(70, -10 + this.armSwing, 150, 80);
    ellipse(-70, -10 - this.armSwing, 150, 80);

    // body
    fill(255, 182, 193);
    circle(0, 0, this.size);

    // mouth
    fill(250, 105, 134);
    arc(0, 0, this.size * 0.09, this.size * 0.2, 0, PI);

    // blush
    fill(250, 87, 177);
    ellipse(45, 0, 30, 20);
    ellipse(-45, 0, 30, 20);

    // eyes
    fill(5, 83, 230);
    ellipse(20, -40, 20, 50);
    ellipse(-20, -40, 20, 50);

    // sparkles
    fill(255);
    ellipse(20, -55, 8, 12);
    ellipse(-20, -55, 8, 12);
    // this.drawReferenceShapes();

    pop();
  }
  // drawReferenceShapes() {
  //   noFill();
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }
}
//alan
class AAA {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.baseR = 200;
    this.baseG = 100;
    this.baseB = 255;
    this.headR = 255;
    this.headG = 220;
    this.headB = 180;
    this.angle = 0;
    this.armAngle = 0;
    this.dir = 1;
    this.jump = 0;
    this.spin = 0;
    this.cShift = 0;
    this.eyeBlink = 1;
    this.mouthOpen = 10;
  }

  update() {
    this.armAngle += 2 * this.dir;
    if (this.armAngle > 30 || this.armAngle < -30) {
      this.dir *= -1;
    }
    this.jump = sin(frameCount * 0.08) * 20;
    this.spin = sin(frameCount * 0.02) * 15;
    this.cShift = (sin(frameCount * 0.05) + 1) / 2 * 100;
    this.eyeBlink = (sin(frameCount * 0.3) + 1) / 2;
    this.eyeBlink = max(0.2, this.eyeBlink);


    this.mouthOpen = 10 + sin(frameCount * 0.2) * 5;
  }

  display() {
    push();
    translate(this.x, this.y - this.jump);
    rotate(radians(this.spin));

    // ⬇️ draw your dancer from here ⬇️

    fill(this.baseR, this.baseG + this.cShift, this.baseB - this.cShift);
    rectMode(CENTER);
    rect(0, 40, 30, 80, 10);

    fill(this.headR, this.headG, this.headB);
    ellipse(0, -20, 40, 40);
    push();
    fill(0);
    ellipse(-10, -25, 6, 6 * this.eyeBlink);
    ellipse(10, -25, 6, 6 * this.eyeBlink);


    fill(0);
    ellipse(0, -10, 10, this.mouthOpen);
    pop();


    push();
    rotate(radians(this.armAngle));
    rect(-25, 40, 15, 50, 10);
    pop();

    push();
    rotate(radians(-this.armAngle));
    rect(25, 40, 15, 50, 10);
    pop();

    fill(150, 100, 255);
    rect(-10, 90, 10, 40, 5);
    rect(10, 90, 10, 40, 5);

    // ⬆️ draw your dancer above ⬆️

    // this.drawReferenceShapes();
    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
  }
}

//chau
class Chau {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.s = 100;
    this.angle = 0;
    this.speed = 2;
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    //arms
    //push();
    stroke(255);
    strokeWeight(3);
    line(
      -this.s * 0.25,
      this.s * 0.9,
      -this.s * 0.7,
      this.s * 0.6 + 20 * sin(frameCount * 0.05)
    );
    line(
      this.s * 0.25,
      this.s * 0.9,
      this.s * 0.7,
      this.s * 0.6 + 20 * sin(frameCount * 0.05)
    );
    //pop();

    push();
    fill(255);
    translate(-this.s * 0.7, this.s * 0.6);
    circle(0, 0 + 20 * sin(frameCount * 0.05), this.s * 0.1);
    pop();

    push();
    fill(255);
    translate(this.s * 0.7, this.s * 0.6);
    circle(0, 0 + 20 * sin(frameCount * 0.05), this.s * 0.1);
    pop();

    //pop();

    //leg
    //push();

    fill(255);
    strokeWeight(3);
    stroke(255);

    this.angle = sin(frameCount * 0.05);
    this.angle = map(this.angle, -1, 1, -PI / 10, PI / 3);

    line(-this.s * 0.15, this.s * 1.1, -this.s * 0.15, this.s * 1.5);

    push();
    translate(-this.s * 0.15, this.s * 1.5);
    rotate(this.angle);
    line(0, 0, this.s * 0.15, this.s * 0.1);
    // circle (0,150,10)
    circle(this.s * 0.15, this.s * 0.1, this.s * 0.1);
    pop();

    line(this.s * 0.15, this.s * 1.1, this.s * 0.15, this.s * 1.5);

    push();
    translate(this.s * 0.15, this.s * 1.5);
    rotate(-this.angle);
    line(0, 0, this.s * 0.15, this.s * 0.1);
    circle(this.s * 0.15, this.s * 0.1, this.s * 0.1);
    pop();

    //pop();

    //body
    fill(255, 179, 0);
    noStroke();
    arc(0, this.s * 1.2, this.s * 0.7, this.s * 2, PI, 0);

    //head
    push();
    this.angle = 2 * sin(frameCount * 0.05);
    // angle = map(angle, -1, 1, -PI / 10, PI / 10);
    rotate(this.angle);
    noStroke();
    fill(254, 27, 28);

    for (let a = 0; a < 2 * PI; a += PI / 8) {
      push();
      rotate(a);
      circle(this.s * 0.5, 0, this.s * 0.5);
      pop();
    }

    circle(0, 0, this.s);

    pop();

    //face
    // push();
    fill(255);
    noStroke();
    ellipse(this.s * -0.2, 0, this.s * 0.4, this.s * 0.6);
    ellipse(this.s * 0.2, 0, this.s * 0.4, this.s * 0.6);
    //pop();

    fill(0);
    let eye = 15 * sin(frameCount * 0.05);
    let y_eye = constrain(eye, -this.s * 0.15, this.s * 0.15);
    circle(-this.s * 0.2, y_eye, this.s * 0.3);
    circle(this.s * 0.2, y_eye, this.s * 0.3);

    noFill();
    strokeWeight(2);
    stroke(0);
    arc(0, this.s * 0.4, this.s * 0.2, this.s * 0.3, 0, PI);

    pop();

    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  update() {
    this.angle = sin(frameCount * 0.05);
    this.angle = map(this.angle, -1, 1, -PI / 10, PI / 20);
    // push();
    // translate(this.x, this.y)
    //rotate(a);

    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.

    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes();

    pop();
  }

  //background
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}

//joe
class dancingjohn {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.arm = 0;
  }

  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.x = this.x + 2;
    this.y = this.y - 1;
    this.arm += -cos(frameCount * 0.25) * 0.3;
  }
  move() {
    this.y = height / 2 + 30 * sin(frameCount * 0.1);
    this.x = width / 2 + 30 * cos(frameCount * 0.1);
  }

  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    // TORSO
    fill(128, 50, 128);
    rect(-35, -51, 70, 78, 8);

    // LEFT ARM
    push();
    translate(-36, -35);
    rotate(this.arm);
    fill(226, 163, 121);
    ellipse(0, 20, 20, 55);
    ellipse(0, 50, 16, 16);
    pop();

    // RIGHT ARM
    push();
    translate(37, -35);
    rotate(this.arm);
    fill(226, 163, 121);
    ellipse(0, 20, 20, 55);
    ellipse(0, 50, 16, 16);
    pop();

    // LEGS
    push();
    translate(0, 40);

    // LEFT LEG
    push();
    translate(-15, 0);
    rotate(sin(frameCount * 0.25) * 0.5);
    fill(165, 42, 42);
    rect(-19, -12, 31, 70, 10);
    fill(105, 105, 105);
    rect(-19, 55, 30, 15, 5);
    pop();

    // RIGHT LEG
    push();
    translate(15, 0);
    rotate(-sin(frameCount * 0.25) * 0.5);
    fill(165, 42, 42);
    rect(-9, -12, 31, 70, 10);
    fill(105, 105, 105);
    rect(-8, 55, 30, 15, 5);
    pop();

    pop();

    // HEAD
    push();
    translate(this.head / 5, this.head / 3);
    fill(226, 163, 121);
    ellipse(0, -80, 60, 65);

    // HAIR
    fill(42, 26, 10);
    arc(0, -95, 70, 60, PI, 0);

    // EYES
    fill(255);
    ellipse(-12, -80, 12, 8);
    ellipse(12, -80, 12, 8);
    fill(40, 80, 200);
    ellipse(-12, -80, 5, 5);
    ellipse(12, -80, 5, 5);

    // NOSE
    fill(226, 163, 121);
    triangle(-3, -75, 0, -70, 3, -75);

    // MOUTH
    noFill();
    stroke(120, 40, 40);
    strokeWeight(2);
    arc(0, -65, 25, 15, 0, PI);
    noStroke();

    pop();
  }
  // move() {
  //   this.y = width / 1 + 30 * sin(frameCount * .25);
  //   this.x = height / 3 + 30 * cos(frameCount * 0.1);
  // }
}
//victoria
class VioletTorch {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.x0 = startX;
    this.y0 = startY;
  }
  update() {
    this.x = this.x0 + 20 * cos(frameCount * 0.05);
    this.y = this.y0 + 15 + 30 * sin(frameCount * 0.08);
  }

  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ⬇️ draw your dancer from here ⬇️
    let cycle = 500;
    let flashFrames = 200;

    // smooth ramp during the flash window
    let flashMix = 0;
    if (frameCount % cycle < flashFrames) {
      flashMix = sin(((frameCount % cycle) / flashFrames) * PI);
      //ease in/out
    }

    //background small flames
    if (frameCount % cycle < flashFrames) {
      for (let R = 60; R < 100; R += 30) {
        for (let angle = -PI / 9; angle <= (8 * PI) / 7; angle += PI / 5) {
          fill(255, 174, 66, 160);
          let x = map(cos(angle), -1, 1, -R, R);
          let y = map(cos(R * sin(angle)), -1, 1, -5 - R, 5 + R);
          let s = map(sin(frameCount * 0.07), 0, 2 * PI, 5, 20);
          ellipse(x, y, s - 4, s);
          ellipse(x - 0.6, y + 0.6, s - 4, s - 0.2);
          ellipse(x + 0.6, y + 0.6, s - 4, s - 0.2);
        }
      }
    }

    // size boost for flames while flashing
    let flameScale = map(sin(frameCount * 0.05), -1, 1, 1, 1 + 2.7 * flashMix);

    //normal torch body
    let n_yb = 80;
    let n_xtl = map(cos(frameCount * 0.06), -1, 1, -8, -11);
    let n_xtr = map(cos(frameCount * 0.06), -1, 1, 8, 11);
    let n_yt = map(cos(frameCount * 0.08), -1, 1, 22, 42);

    let n_xr = map(cos(frameCount * 0.06), -1, 1, -12, -15);
    let n_yr = map(cos(frameCount * 0.08), -1, 1, 8, 28);
    let n_w = map(cos(frameCount * 0.06), -1, 1, 24, 30);
    let n_l = map(cos(frameCount * 0.06), -1, 1, 6, 5.5);

    //expanded torch body
    let e_yb = 90;
    let e_xtl = -15;
    let e_xtr = 15;
    let e_yt = 18;
    let e_xr = -20;
    let e_yr = 3;
    let e_w = 40;
    let e_l = 8;

    //draw torch body
    let baseBodyCol = color(143, 0, 255);
    let whiteCol = color(255);
    let bodyCol = lerpColor(baseBodyCol, whiteCol, 0.8);

    fill(baseBodyCol);
    stroke(255);
    strokeWeight(0.3);
    triangle(0, n_yb, n_xtr, n_yt, n_xtl, n_yt);
    rect(n_xr, n_yr, n_w, n_l);

    if (frameCount % cycle < flashFrames) {
      fill(bodyCol);
      stroke(255);
      strokeWeight(1);
      triangle(0, e_yb, e_xtr, e_yt, e_xtl, e_yt);
      rect(e_xr, e_yr, e_w, e_l);
    }

    //arms & hands
    if (frameCount % cycle < flashFrames) {
      let x1 = map(cos(frameCount * 0.1), -1, 1, -40, -10);
      let y1 = map(sin(frameCount * 0.1), -1, 1, 20, 60);
      fill(255, 205, 205, 230);
      line(-10, 18, x1, y1);
      circle(x1, y1, 25);
      let x2 = map(sin(frameCount * 0.12), -1, 1, 10, 40);
      let y2 = map(cos(frameCount * 0.12), -1, 1, 20, 60);
      fill(255, 205, 205, 230);
      line(10, 18, x2, y2);
      circle(x2, y2, 25);
    }

    //flames
    // color blend: purple base -> hot orange when flashing
    let baseCol = color(143, 0, 255, 12);
    let hotCol = color(255, 180, 0, 8);
    let flameCol = lerpColor(baseCol, hotCol, flashMix);

    fill(flameCol);
    noStroke();

    //1
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 50, 0);
      let x = 25 * sin(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 60, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 10 + 23 * sin(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 18 * sin(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 25) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 20 * sin(frameCount * 0.06 + i * 0.02) - 20;
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }

    //2
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 50, 0);
      let x = 25 * cos(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 60, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = -10 + 23 * cos(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 18 * cos(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 25) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 20 * cos(frameCount * 0.06 + i * 0.02) - 20;
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }

    //additional dancing flame
    fill(143, 0, 255, 8);
    stroke(255, 229, 180, 8);
    strokeWeight(0.3);
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 2, 12);
      let y = 15 + map(i, 0, 100, 6, 24);
      let x = 40 + 2 * sin(frameCount * 0.2 + i * 0.02);
      circle(x, y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 2, 10);
      let y = 15 + map(i, 0, 100, 12, 24);
      let x = 43 + 2 * sin(frameCount * 0.2 + i * 0.02);
      circle(x, y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 2, 10);
      let y = 15 + map(i, 0, 100, 12, 24);
      let x = 37 + 2 * sin(frameCount * 0.2 + i * 0.02);
      circle(x, y, s);
    }

    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 15);
      let y = 55 + map(i, 0, 100, 8, 24);
      let x = -38 + 4 * sin(frameCount * 0.15 + i * 0.02);
      circle(x, y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 12);
      let y = 55 + map(i, 0, 100, 12, 24);
      let x = -40 + 4 * sin(frameCount * 0.15 + i * 0.02);
      circle(x, y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 12);
      let y = 55 + map(i, 0, 100, 12, 24);
      let x = -35 + 4 * sin(frameCount * 0.15 + i * 0.02);
      circle(x, y, s);
    }

    // ⬆️ draw your dancer above ⬆️

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    //this.drawReferenceShapes()

    pop();
  }
}
//jessie
class Jellyfish {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.lineLength = 70;
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    this.angle = sin(frameCount * 0.05) * 0.5;
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.

    push();
    translate(this.x, this.y);
    rotate(this.angle);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    push();

    beginShape();
    translate(-45, 65);
    let lineLength = 70;
    stroke(20, 60, 150, 150);
    strokeWeight(2);
    noFill();
    for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
      strokeWeight(10);
      let v = 8 * sin(frameCount * 0.1 - i);
      vertex(v, i);
      //circle(i, v, 5);
    }
    endShape();
    pop();

    push();
    beginShape();
    translate(-25, 55);
    stroke(20, 60, 150, 110);
    strokeWeight(2);
    noFill();
    for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
      strokeWeight(10);
      let v = 8 * sin(frameCount * 0.1 - i);
      vertex(v, i);
      //circle(i, v, 5);
    }
    endShape();
    pop();

    push();
    beginShape();
    translate(-5, 65);
    stroke(20, 60, 150, 190);
    strokeWeight(2);
    noFill();
    for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
      strokeWeight(10);
      let v = 8 * sin(frameCount * 0.1 - i);
      vertex(v, i);
      //circle(i, v, 5);
    }
    endShape();
    pop();

    push();
    beginShape();
    translate(15, 75);
    stroke(20, 60, 150, 150);
    strokeWeight(2);
    noFill();
    for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
      strokeWeight(10);
      let v = 8 * sin(frameCount * 0.1 - i);
      vertex(v, i);
      //circle(i, v, 5);
    }
    endShape();
    pop();

    push();
    beginShape();
    translate(35, 55);
    stroke(20, 60, 150, 220);
    strokeWeight(1);
    noFill();
    for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
      strokeWeight(10);
      let v = 8 * sin(frameCount * 0.1 - i);
      vertex(v, i);
      //circle(i, v, 5);
    }
    endShape();
    pop();

    push();
    //translate(width / 2, height / 2);
    noStroke();
    fill(80, 150, 250, 230);
    let s = 1 + 0.1 * sin(frameCount * 0.1);
    ellipse(0, -15, 120 * s, 80 * s);
    ellipse(0, 5, 150 * s, 60 * s);

    fill(255);
    ellipse(-20, -5, 15, 20);
    ellipse(20, -5, 15, 20);
    fill(0);
    let a = map(mouseX, 0, width, -25, -15);
    let b = map(mouseX, 0, width, 15, 25);
    let c = map(mouseY, 0, height, -10, 0);
    ellipse(a, c, 10, 10);
    ellipse(b, c, 10, 10);
    pop();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}
//sophia
class BunBun {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.s = 80;
    this.hopHeight = 45;
    this.baseY = startY;
  }

  update() {
    // Hop animation
    this.y = this.baseY - this.hopHeight * abs(sin(frameCount * 0.05));
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();

    // Shadow
    fill(120, 120, 120, 50);
    ellipse(0, this.s * 0.7, this.s * 0.8, this.s * 0.25);

    // Body
    fill(255);
    ellipse(0, 4, this.s * 0.9, this.s * 1.0);

    // Tummy
    fill(255, 200, 210);
    ellipse(0, this.s * 0.1, this.s * 0.55, this.s * 0.7);

    // Feet
    fill(255);
    let footY = this.s * 0.51;
    ellipse(-this.s * 0.25, footY, this.s * 0.35, this.s * 0.15);
    ellipse(this.s * 0.25, footY, this.s * 0.35, this.s * 0.15);

    // Arms
    let armOffset = 8 * cos(frameCount * 0.05);
    ellipse(
      -this.s * 0.45,
      armOffset + this.s * 0.1,
      this.s * 0.25,
      this.s * 0.2
    );
    ellipse(
      this.s * 0.45,
      -armOffset + this.s * 0.1,
      this.s * 0.25,
      this.s * 0.2
    );

    // Head
    fill(255);
    ellipse(0, -this.s * 0.75, this.s * 0.9, this.s * 0.9);

    // Ears
    fill(255);
    ellipse(-this.s * 0.25, -this.s * 1.6, this.s * 0.25, this.s * 0.8);
    ellipse(this.s * 0.25, -this.s * 1.6, this.s * 0.25, this.s * 0.8);

    // Inner ears
    fill(255, 190, 200);
    ellipse(-this.s * 0.25, -this.s * 1.6, this.s * 0.12, this.s * 0.5);
    ellipse(this.s * 0.25, -this.s * 1.6, this.s * 0.12, this.s * 0.5);

    // Eyes
    fill(50);
    ellipse(-this.s * 0.15, -this.s * 0.8, this.s * 0.12, this.s * 0.18);
    ellipse(this.s * 0.15, -this.s * 0.8, this.s * 0.12, this.s * 0.18);

    // Inside Eye
    fill(255);
    ellipse(-this.s * 0.17, -this.s * 0.85, this.s * 0.03, this.s * 0.06);
    ellipse(this.s * 0.13, -this.s * 0.85, this.s * 0.03, this.s * 0.06);

    // Blush
    fill(255, 170, 180, 120);
    ellipse(-this.s * 0.3, -this.s * 0.6, this.s * 0.15);
    ellipse(this.s * 0.3, -this.s * 0.6, this.s * 0.15);

    // Nose
    fill(255, 150, 180);
    triangle(
      -this.s * 0.04,
      -this.s * 0.65,
      this.s * 0.04,
      -this.s * 0.65,
      0,
      -this.s * 0.6
    );

    // Mouth
    noFill();
    stroke(120);
    strokeWeight(1.2);
    arc(-this.s * 0.05, -this.s * 0.55, this.s * 0.1, this.s * 0.08, 0, PI / 2);
    arc(this.s * 0.06, -this.s * 0.55, this.s * 0.1, this.s * 0.08, PI / 2, PI);

    pop();
  }

}
//jacob
class PumpkinMan {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.speedA = 0.1;
    this.x0 = startX;
    this.y0 = startY;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    //body
    this.y = this.y0 + 50 * sin(2 * frameCount * 0.1);
    this.x = this.x0 + 50 * cos(frameCount * 0.1);
    this.angle = this.angle + this.speedA;
    if (mouseIsPressed) {
      this.speedA = -this.speedA;
    }
  }
  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    colorMode(HSB);
    //arms
    push();
    stroke(23, 88, 74);
    strokeWeight(5);
    //right side
    line(77, 0, 100, -50 * sin(frameCount * 0.1));
    //left side
    line(-77, 0, -100, 50 * sin(frameCount * 0.1));
    pop();

    //stem
    fill(30, 67, 40);
    beginShape();
    vertex(-10, -97 + 47);
    vertex(-7, -105 + 47);
    vertex(-10, -110 + 47);
    vertex(-7, -112 + 47);
    vertex(5, -105 + 47);
    vertex(10, -97 + 47);
    endShape();

    fill(23, 88, 74);

    //right side of pumpkin
    circle(30, 0, 95);
    circle(20, 0, 97);

    //left side of pumpkin
    circle(-30, 0, 95);
    circle(-20, 0, 97);

    //pumpkin
    circle(0, 0, 100);

    //expression
    //EyeBalls
    colorMode(HSB, 100);
    fill(0);
    circle(-20, -20, 30);
    circle(20, -20, 30);

    //left pupil
    // push()
    // translate(-20, -20)
    // fill(100)
    // circle(10 * cos(-frameCount * 0.1), 10 * sin(-frameCount * 0.1), 10)
    // pop()

    //left pupil
    push();
    translate(-20, -20);
    rotate(this.angle);
    fill(100);
    circle(10, 0, 10);
    pop();

    //right pupil
    push();
    translate(20, -20);
    rotate(-this.angle);
    fill(100);
    circle(10, 0, 10);
    pop();

    // //right pupil
    // push()
    // translate(20, -20)
    // fill(100)
    // circle(10 * cos(frameCount * 0.1), 10 * sin(frameCount * 0.1), 10)
    // pop()

    //mouth
    // noFill()
    // strokeWeight(5)
    // let leftmouth = PI / 4;
    // let rightmouth = 3 * PI / 4;
    // arc(0, 0, 50, 50, leftmouth, rightmouth)

    //mouth

    fill(0);
    beginShape();
    vertex(0, 34 - 10);
    vertex(12, 26 - 10);
    vertex(18, 34 - 10);
    vertex(26, 22 - 10);
    vertex(32, 28 - 10);
    vertex(48, 14 - 10);
    vertex(32, 38 - 10);
    vertex(26, 34 - 10);
    vertex(20, 44 - 10);
    vertex(14, 42 - 10);
    vertex(0, 50 - 10);
    vertex(-14, 42 - 10);
    vertex(-20, 44 - 10);
    vertex(-26, 34 - 10);
    vertex(-32, 38 - 10);
    vertex(-48, 14 - 10);
    vertex(-32, 28 - 10);
    vertex(-26, 22 - 10);
    vertex(-18, 34 - 10);
    vertex(-12, 26 - 10);
    vertex(0, 34 - 10);
    endShape();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    //this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}
