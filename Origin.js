class Origin {
    constructor(position_x, position_y, label) {
        this.framecount = Math.floor((Math.random() * 100) + 20);;  // between 1 and 30
        this.position_x = Math.abs(position_x);
        this.position_y = Math.abs(position_y);
        this.label = label;

        this.position = { x: this.position_x, y: this.position_y }
    }

    drop() {
        if (frameCount % this.framecount == 1) {
            // particles_physical.add_single(this.position, this.options_particles_physical, "CO² bubble")
            particles_physical.add_single_sprite(this.position);
        }
    }

    draw_origin_positions_debug() {
        // print(this.position.x);
        push();
        strokeWeight(20);
        stroke(0, 0, 255);  // blue
        point(
            this.position.x,
            this.position.y
        )
        pop();

        push();
        fill(0, 0, 255);
        // textFont("Helvetica");
        textSize(30);
        // textAlign(CENTER, CENTER);
        text(this.label, (this.position.x + 10), (this.position.y - 10));
        pop();
    }
}



