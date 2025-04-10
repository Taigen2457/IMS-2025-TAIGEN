//https://openprocessing.org/sketch/2546538
//https://openprocessing.org/sketch/2494700

//Mouse over → control line color gradient (red, green and blue channels mapped with mouseX, mouseY, pt.y).

//Each point is like a particle that changes according to mouse movements.

//The screen has a faint “trailing” trail, creating the impression of flow.

//Each click: switches the direction of the point's perturbation, like playing with a particle system.

//The color changes in real time according to the mouse position, and the color gradient is breathable.


let pts;
let lm;
let stretching = true;
let font;
let mode = 0;

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lm = createVector(0, 0);
  pts = font.textToPoints("Taigen", width / 2 - 5 * 120, height / 2 + 80, 400, {
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });
  background(255);
}

function draw() {
  fill(255, 20);  // 白色透明覆盖，20表示透明度
  noStroke();
  rect(0, 0, width, height);
  
  if (stretching) lm.lerp(createVector(mouseX, mouseY), 0.1);
  drawPoints();
}

function drawPoints() {
  noStroke();
  for (let pt of pts) {
    let ang = map(pt.x, 0, width, 0, 5 * TAU);
    let xshift = (map(lm.x, 0, width, 100, -100)) * cos(ang + lm.x / 100);
    let yshift = 50 + (map(lm.y, 0, height, 100, -100)) * sin(ang + lm.x / 100);

    // color
    let r = map(mouseX, 0, width, 100, 255);
    let g = map(mouseY, 0, height, 100, 200);
    let b = map(pt.y, 0, height, 150, 255);
    fill(r, g, b, 150);  // 加入一点透明度

    // mouse click mode
    if (mode % 2 === 0) {
      ellipse(pt.x + xshift, pt.y + yshift, 2, 2); // 模式1
    } else {
      ellipse(pt.x + yshift, pt.y + xshift, 2, 2); // 模式2：交叉方向扰动
    }
  }
}

function mouseClicked() {
  stretching = !stretching;
  mode++;
}

