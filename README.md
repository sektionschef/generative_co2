# Generative art of CO² emissions

The digital painting visualizes the increasing CO² concentration in the earth's atmosphere for the past 10 years. 

* 3840x2160px
* the data originates from an [API](https://global-warming.org/api/co2-api) of [Global Warming](https://global-warming.org/)
* built with [p5.js](https://p5js.org/) & [matter.js](https://brm.io/matter-js/)


## used classes
* **Impediments** - physical and attractive objects in the way of the particles. postion is static. vertices are defined for the painting. have no sprites but use the canvas.
* **Particle** - physical and attractive objects representing CO² emissions. randomly chosen out of 10 sprites.
* **Origin** - the place where the particles are dropped. Dataset defines where this is. They also hold the rate of increase and connection to the dataset.
* **editor** - helps with defining the objects and their vertices

There is a deubg mode for seeing additional stats and visualizin the physical bodies. The impediment only switch shows just the layer of impediments in order to define the vertices.

## Resizing

The canvas responsively resizes to the width, height - that is `Window.innerHeight` & `Window.innerHeight`. In p5.js the resizing is done by scaling the drawn images with respect to new width or height. Matter.js is more difficult since the objects can only be changed relative to their current position and not positioned at a certain location. For static objects: the `scale()` function is used for recalculating the object's size and its physics + `translate)()` to move the object to the new location after rescaling the whole scene. difference from acutal position at actual size to same location to new size. the nonstatic objects are removed and created newly after resizing.


## defining the coordinates of brush sprites
* enable rulers in Krita

## Font
Krub: https://fonts.google.com/specimen/Krub 

## Performance know how
comes from: https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance

# guide for minting

https://github.com/hicetnunc2000/hicetnunc/wiki/Interactive-OBJKTs