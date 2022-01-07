function keyPressed() {
  if (key === 'P') {
    console.log("result")
    console.log(editor.vertices_text);
    editor.vertices_text = "";
    editor.markers = [];
  }
}

function mousePressed() {
  // let's move those to all objects list
  impediments.clicked(mouseX, mouseY);

  if (keyIsPressed) {
    if (keyCode == SHIFT) {
      console.log(" New vertex with " + mouseX + " : " + mouseY);
      editor.vertices_text += ("{x: " + mouseX + ", y: " + mouseY + "},\n");
      editor.markers.push({ x: mouseX, y: mouseY });
    }
  }
}

function mouseReleased() {
  impediments.undrag();
}

// each time window.innerWidth changes 
function windowResized() {
  logging.debug("Window is resized -> resizing canvas.");
  resize_canvas();
  // logging.debug("rescaling width: " + rescaling_width + " new width: " + CANVAS_WIDTH * scaling_factor);
  // logging.debug("rescaling height: " + rescaling_height + " new height: " + CANVAS_HEIGHT * scaling_factor);
}

// calculate the scaling params - choose the limiting factor either height or width
function resize_canvas() {
  rescaling_width = windowWidth / CANVAS_WIDTH
  rescaling_height = windowHeight / CANVAS_HEIGHT

  if (rescaling_width < rescaling_height) {
    scaling_factor = rescaling_width
  } else {
    scaling_factor = rescaling_height
  }

  particles_physical.kill_all();
  particles_physical.bodies = [];

  // reboot - since scaling in physical world is only possible relative to the preceding body.
  impediments.kill_all();
  impediments.bodies = []
  impediments.create_all();
  impediments.rescale();


  // own class
  origins = [];
  for (let origin_source of origins_data) {
    origins.push(new Origin(
      origin_source["x"],
      origin_source["y"],
      origin_source["label"]
    ));
  }

  resizeCanvas(CANVAS_WIDTH * scaling_factor, CANVAS_HEIGHT * scaling_factor);
}
