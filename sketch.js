// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
// const SWITCH_LOGGING_LEVEL = "info";
const SWITCH_LOGGING_LEVEL = "debug";

// create impediments and only show impediment layer and no other layers
const SWITCH_CREATE_IMPEDIMENTS = true;
// const SWITCH_CREATE_IMPEDIMENTS = false;

// mind aspect ratio of image - default resolution
const CANVAS_WIDTH = 3840;
const CANVAS_HEIGHT = 2160;


const VERTICAL_GRAVITY = -0.25;

let custom_font;
let custom_font_bold;

let fps = 0;
let default_debugging_text_size = 25;
let debugging_physical_body_count = 0;


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

let underneath_image;
let impediments_image;
let on_top_image;

let SCALING_FACTOR = 1;
let rescaling_width;
let rescaling_height;

function preload() {
  // direct API
  //data = loadJSON("https://global-warming.org/api/co2-api");
  // for static
  co2_data = loadJSON("co2_data_static_export.json");

  underneath_image = loadImage("franziskaner_underneath.png");
  impediments_image = loadImage("franziskaner_only_impediments.png");  // for defining impediments
  on_top_image = loadImage("franziskaner_on_top.png");

  // loop through data and load all the images to the json
  for (let impediment of impediments_data) {
    if (typeof impediment.image_path !== "undefined") {
      impediment.image = loadImage(impediment.image_path)
    }
  }
  for (let particle of particle_data) {
    particle.image = loadImage(particle.image_path)
  }

  custom_font = loadFont('Krub-Regular.ttf');
  custom_font_bold = loadFont('Krub-Bold.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight).parent('canvasHolder');

  logging.setLevel(SWITCH_LOGGING_LEVEL);

  // matter.js stuff
  engine = Engine.create();
  world = engine.world;

  editor = new Editor();

  particles_physical = new Particles(particle_data);
  impediments = new Particles(impediments_data);
  impediments.create_all();
  origins = new Origins(origins_data, co2_data);
  origins.create_all();

  let canvas_mouse = Mouse.create(canvas.elt);
  canvas_mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, { mouse: canvas_mouse })
  World.add(world, mConstraint);

  // matter.js stuff
  Matter.Runner.run(engine)
  engine.world.gravity.y = VERTICAL_GRAVITY;

  resize_canvas();
}

function draw() {
  background("white");

  if (SWITCH_CREATE_IMPEDIMENTS == false) {
    image(underneath_image, 0, 0, underneath_image.width * SCALING_FACTOR, underneath_image.height * SCALING_FACTOR);
  } else {
    background(255);
    image(impediments_image, 0, 0, impediments_image.width * SCALING_FACTOR, impediments_image.height * SCALING_FACTOR);
  }

  origins.looping_through_days();
  origins.drop_all();

  particles_physical.show();

  impediments.show();

  if (SWITCH_CREATE_IMPEDIMENTS == false) {
    image(impediments_image, 0, 0, impediments_image.width * SCALING_FACTOR, impediments_image.height * SCALING_FACTOR);
    image(on_top_image, 0, 0, on_top_image.width * SCALING_FACTOR, on_top_image.height * SCALING_FACTOR);

    origins.show_co2_label();
  }

  if (logging.getLevel() <= 1) {
    origins.debugging_show_origins();
    impediments.drag(mouseX, mouseY);
  }

  if (logging.getLevel() <= 2) {
    editor.show();

    origins.show_number_physical_bodies();
    show_number_physical_bodies();
    show_framerate();
  }

  Engine.update(engine);
}

