// trace, debug, info, warn, error
// let SWITCH_LOGGING_LEVEL = "info";
let SWITCH_LOGGING_LEVEL = "debug";

// create impediments and only show impediment layer and no other layers
let SWITCH_CREATE_IMPEDIMENTS = true;
// let SWITCH_CREATE_IMPEDIMENTS = false;

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
let scaling_factor = 1;
let scaling_factor_history = [];
let rescaling_width;
let rescaling_height;

let element = [];

function preload() {
  // direct API
  //data = loadJSON("https://global-warming.org/api/co2-api");
  // for static
  data = loadJSON("./co2_data_static_export.json");

  underneath_image = loadImage("./franziskaner_underneath.png");
  impediments_image = loadImage("./franziskaner_only_impediments.png");  // for defining impediments
  on_top_image = loadImage("./franziskaner_on_top.png");

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

  var canvas = createCanvas(CANVAS_WIDTH * scaling_factor, CANVAS_HEIGHT * scaling_factor).parent('canvasHolder');

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
  // Engine.run(engine);
  Matter.Runner.run(engine)

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

  resize_canvas();

  // dummy
  element.centre = { x: 500, y: 500 };
}

function draw() {
  // resize_canvas();
  background("black");

  if (!data) {
    // Wait until the data has loaded before drawing.
    return;
  }

  // rythm of changing the day
  if (frameCount % 5 == 1) {
    if (current_day_index >= data.co2.length)
      current_day_index = 0;

    current_day_index += 1;
    data.co2[current_day_index]
    current_date_string = data.co2[current_day_index].year + "-" + data.co2[current_day_index].month + "-" + data.co2[current_day_index].day;
    current_co2 = data.co2[current_day_index].trend
    current_particles_count = map(current_co2, co2_min, co2_max, min_particles, max_particles, true);
    // console.info("number of particles: " + current_particles_count)

  }

  // layers
  if (SWITCH_CREATE_IMPEDIMENTS == false) {
    image(underneath_image, 0, 0, underneath_image.width * scaling_factor, underneath_image.height * scaling_factor);
  } else {
    background(255);
    image(impediments_image, 0, 0, impediments_image.width * scaling_factor, impediments_image.height * scaling_factor);
  }

  //eventuell eigene Origins Klasse
  for (let origin of origins) {
    origin.drop()
  }

  // hygiene functions
  particles_physical.show();
  particles_physical.kill_not_needed(current_particles_count);

  // dummy
  // circle(element.centre.x, element.centre.y, 20);
  if (element.centre.x != 500) {
    push();
    fill(120, 255, 255);
    noStroke()
    beginShape();
    for (var i = 0; i < element.vertices.length; i++) {
      vertex(element.vertices[i].x, element.vertices[i].y);
    }
    endShape(CLOSE);
    // translate(this.physical_body.position.x, this.physical_body.position.y);
    // ellipse(0, 0, this.radius * 2);
    pop();
  }



  impediments.drag(mouseX, mouseY);
  impediments.show();

  if (SWITCH_CREATE_IMPEDIMENTS == false) {
    image(impediments_image, 0, 0, impediments_image.width * scaling_factor, impediments_image.height * scaling_factor);
    image(on_top_image, 0, 0, on_top_image.width * scaling_factor, on_top_image.height * scaling_factor);

    // label
    let co2_string = current_co2 + ' ppm CO² in atmosphere'

    push();
    fill(50);
    // stroke(200);
    // textFont("Helvetica");
    textSize(25 * scaling_factor);
    text(current_date_string, 3430 * scaling_factor, 2100 * scaling_factor);
    text(co2_string, 3320 * scaling_factor, 2130 * scaling_factor);
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
}

