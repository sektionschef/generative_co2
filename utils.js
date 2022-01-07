// https://stackoverflow.com/questions/9692448/how-can-you-find-the-centroid-of-a-concave-irregular-polygon-in-javascript
// function get_polygon_centroid(points) {
//   var centroid = {x: 0, y: 0};
//   for(var i = 0; i < points.length; i++) {
//      var point = points[i];
//      centroid.x += point.x;
//      centroid.y += point.y;
//   }
//   centroid.x /= points.length;
//   centroid.y /= points.length;
//   return centroid;
// }

// archive from data_painting
// function get_area(vertices) {
//   var total = 0;
//
//   for (var i = 0, l = vertices.length; i < l; i++) {
//     var addX = vertices[i].x;
//     var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
//     var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
//     var subY = vertices[i].y;
//
//     total += (addX * addY * 0.5);
//     total -= (subX * subY * 0.5);
//   }
//
//   return Math.abs(total);
// }

// archive from data_painting
/** sorting vertices clockwise: https://stackoverflow.com/questions/54719326/sorting-points-in-a-clockwise-direction */
// function sort_vertices_clockwise (points) {
//
//   // points = [
//   //   {x: 100, y: 22},
//   //   {x: 150, y: 22},
//   //   {x: 150, y: 86},
//   //   {x: 100, y: 61},
//   //   {x: 127, y: 74}
//   // ]
//   // console.log(points);
//
//   // Get the center (mean value) using reduce
//   const center = points.reduce((acc, { x, y }) => {
//     acc.x += x / points.length;
//     acc.y += y / points.length;
//     return acc;
//   }, { x: 0, y: 0 });
//
//   // Add an angle property to each point using tan(angle) = y/x
//   const angles = points.map(({ x, y }) => {
//     return { x, y, angle: Math.atan2(y - center.y, x - center.x) * 180 / Math.PI };
//   });
//
//   // Sort your points by angle
//   const pointsSorted = angles.sort((a, b) => a.angle - b.angle);
//
//   // console.log(pointsSorted);
//   return pointsSorted
// }


function show_co2_label() {
    let co2_string = current_co2 + ' ppm CO² in atmosphere'

    let text_size = 25;
    push();
    fill(50);
    // stroke(200);
    textSize(text_size * scaling_factor);
    // textStyle(BOLD);
    textFont(custom_font_bold);
    text(current_date_string, 3430 * scaling_factor, 2100 * scaling_factor);
    textFont(custom_font);
    // textStyle(NORMAL);
    text(co2_string, 3320 * scaling_factor, 2130 * scaling_factor);
    pop();
}

// Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
function show_framerate() {
    if (frameCount % 5 == 1) {
        fps = frameRate();
    }
    push();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
    pop();
}