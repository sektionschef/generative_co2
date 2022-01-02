function keyPressed() {
  if (key === 'P') {
    print("result")
    print(editor.vertices_text);
    editor.vertices_text = "";
    editor.markers = [];
  } else if (key === 'a') {  // add body
    elements.add_single();
  } else if (key == "r") {  // remove body
    if (elements.bodies.length != 0) {
      elements.bodies[0].remove_physical_body()
    }
  } else if (key === 'l') {
    // Body.translate(wing_a.physical_body, {x: 300, y: 60});
    print(world);
  }
}

function mousePressed() {
  // let's move those to all objects list
  impediments.clicked(mouseX, mouseY);

  if (keyIsPressed) {
    if (keyCode == SHIFT) {
      // print(" New vertex with " + mouseX + " : " + mouseY);
      editor.vertices_text += ("{x: " + mouseX + ", y: " + mouseY + "},\n");
      editor.markers.push({ x: mouseX, y: mouseY });
    }
  }
}

function mouseReleased() {
  impediments.undrag();
}


function windowResized() {
  resize_canvas();
}

function resize_canvas() {
  rescaling_width = windowWidth / CANVAS_WIDTH
  rescaling_height = windowHeight / CANVAS_HEIGHT

  if (rescaling_width < rescaling_height) {
    scaling_factor = rescaling_width
  } else {
    scaling_factor = rescaling_height
  }
  // resizeCanvas(CANVAS_WIDTH * scaling_factor, CANVAS_HEIGHT * scaling_factor);
  scale(scaling_factor);

  // logging.info("rescaling width: " + rescaling_width + " new width: " + CANVAS_WIDTH * scaling_factor);
  // logging.info("rescaling height: " + rescaling_height + " new height: " + CANVAS_HEIGHT * scaling_factor);
}
