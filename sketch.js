// trace, debug, info, warn, error
let SWITCH_LOGGING_LEVEL = "info";
// let SWITCH_LOGGING_LEVEL = "debug";

// create impediments and only show impediment layer and no other layers
// let SWITCH_CREATE_IMPEDIMENTS = true;
let SWITCH_CREATE_IMPEDIMENTS = false;

const SWITCH_RECORD = false;

// mind aspect ratio of image - and size?
let CANVAS_WIDTH = 3840;
let CANVAS_HEIGHT = 2160;

let min_particles = 600;
let max_particles = 2000;
let current_particles_count;
let current_co2;
let current_day_index;

// matter.js stuff
var Engine = Matter.Engine;
var World = Matter.World;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
// var Render = Matter.Render,
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var ground;


let underneath_image;
let impediments_image;
let on_top_image;

let origins = [];

let data;

if (SWITCH_RECORD) {
  // ccapture
  let capturer = new CCapture({ format: 'webm', framerate: 30, verbose: false });
}

function preload() {
  // direct API
  //data = loadJSON("https://global-warming.org/api/co2-api");
  // for static
  data = loadJSON("data/co2_data_static_export.json");

  underneath_image = loadImage("assets/franziskaner_underneath.png");
  impediments_image = loadImage("assets/franziskaner_only_impediments.png");  // for defining impediments
  on_top_image = loadImage("assets/franziskaner_on_top.png");


  // loop through data and load all the images to the json
  for (let impediment of impediments_data) {
    if (typeof impediment.image_path !== "undefined") {
      impediment.image = loadImage(impediment.image_path)
    }
  }

  for (let particle of particle_data) {
    particle.image = loadImage(particle.image_path)
  }
}

function setup() {
  logging.setLevel(SWITCH_LOGGING_LEVEL);

  // matter.js stuff
  engine = Engine.create();
  world = engine.world;

  var canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent('canvasHolder');

  editor = new Editor();

  particles_physical = new Particles(particle_data);

  impediments = new Particles(impediments_data);
  impediments.create_all();

  for (let origin_source of origins_data) {
    origins.push(new Origin(
      origin_source["x"],
      origin_source["y"],
      origin_source["label"]
    ));

  }

  var canvas_mouse = Mouse.create(canvas.elt);
  canvas_mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, { mouse: canvas_mouse })
  World.add(world, mConstraint);

  // matter.js stuff
  Engine.run(engine);

  // engine.world.gravity.y = 1;
  // engine.world.gravity.y = -1;
  engine.world.gravity.y = -0.25;
  // engine.world.gravity.y = -0.05;

  // calculate max of co2 data
  let data_trend = [];
  for (let co2_per_day of data.co2) {
    data_trend.push(float(co2_per_day.trend));
  }
  co2_min = Math.min(...data_trend);
  co2_max = Math.max(...data_trend);

  current_particles_count = 0;
  current_co2 = 400;  // dummy value
  current_day_index = 0;

}

function draw() {

  if (SWITCH_RECORD) {
    // ccapture
    if (frameCount < 2000) {
      // console.log("start");
      capturer.start();
    }
  }

  if (!data) {
    // Wait until the data has loaded before drawing.
    return;
  }

  // rythm of changing the day
  if (frameCount % 5 == 1) {
    current_day_index += 1;
    data.co2[current_day_index]
    current_date_string = data.co2[current_day_index].year + "-" + data.co2[current_day_index].month + "-" + data.co2[current_day_index].day;
    current_co2 = data.co2[current_day_index].trend
    current_particles_count = map(current_co2, co2_min, co2_max, min_particles, max_particles, true);
    // console.info("number of particles: " + current_particles_count)

    if (current_day_index >= data.co2.length)
      current_day_index = 0;
  }

  // layers
  if (SWITCH_CREATE_IMPEDIMENTS == false) {
    image(underneath_image, 0, 0);
  } else {
    background(255);
    image(impediments_image, 0, 0);
  }

  //eventuell eigene Origins Klasse
  for (let origin of origins) {
    origin.drop()
  }

  // hygiene functions
  particles_physical.show();
  particles_physical.kill_not_needed(current_particles_count);

  impediments.drag(mouseX, mouseY);
  impediments.show();

  if (SWITCH_CREATE_IMPEDIMENTS == false) {
    image(impediments_image, 0, 0);
    image(on_top_image, 0, 0);

    // label
    let co2_string = current_co2 + ' ppm CO² in atmosphere'

    push();
    fill(50);
    // stroke(200);
    // textFont("Helvetica");
    textSize(25);
    text(current_date_string, 3430, 2100);
    text(co2_string, 3320, 2130);
    pop();
  }

  if (logging.getLevel() <= 1) {
    for (let origin of origins) {
      origin.draw_origin_positions_debug();
    }
  }

  editor.show();

  // logging.info("Number of physical bodies in the world: " + world.bodies.length);
  // logging.info(frameRate);

  Engine.update(engine);

  if (SWITCH_RECORD) {
    // ccapture
    capturer.capture(document.getElementById('defaultCanvas0'));
    // let secondsElapsed = frameCount / 30;
    // if (secondsElapsed >= 1) {
    if (frameCount > 3000) {
      // console.log("stop");
      capturer.stop(); capturer.save(); noLoop(); // This is optional
    }
  }


}
