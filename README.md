# Generative art of CO² emissions

The digital painting visualizes the increasing CO² concentration in the earth's atmosphere for the past 10 years. 

* 3840x2160px
* the data originates from an [API](https://global-warming.org/api/co2-api) of [Global Warming](https://global-warming.org/)
* built with [p5.js](https://p5js.org/) & [matter.js](https://brm.io/matter-js/)


## Tasks
* document resizing
* resizes debugging texts and so on
* dummy ball to drop for debugging
* remove all attractive and physical bodies: "// NECESSARY FOR ATTRACITVE SHAPES???"
* rework mouse constraints
* gif
* fine tune bodies and engstellen - gesammelte parameter für alle particles und impediments
* mint
* eigene html Seite mit Projekt
* artistpage mit allen links - 
* google analytics
* Medium Artikel
* video
* seed: Discord, Tweet, LinkedIn

## Resizing

The canvas responsively resizes to the width, height - that is `Window.innerHeight` & `Window.innerHeight`. In p5.js the resizing is done by scaling the drawn images with respect to new width or height. Matter.js is more difficult since the objects can only be changed relative to their current position and not positioned at a certain location. For static objects: the `scale()` function is used for recalculating the object's size and its physics + `translate)()` to move the object to the new location after rescaling the whole scene. difference from acutal position at actual size to same location to new size. the nonstatic objects are removed and created newly after resizing.

sd


## defining the coordinates of brush sprites
* enable rulers in Krita


# guide for minting

https://github.com/hicetnunc2000/hicetnunc/wiki/Interactive-OBJKTs