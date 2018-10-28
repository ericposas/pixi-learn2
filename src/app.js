import pixijs from 'pixi.js';
import $ from 'jquery';

const TextureCache = PIXI.utils.TextureCache;
const Rectangle = PIXI.Rectangle;
const Sprite = PIXI.Sprite;

let app = new PIXI.Application({width:innerHeight, height:innerWidth});
let stage = app.stage;
let renderer = app.renderer;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;

import './images/mario_tileset.png';
import './images/mario_tileset.json';



// initial set up 
$('head').append(`
  <style>
    *{ padding: 0; margin: 0; }
  </style>
`);

let type = 'WebGL';
if(!PIXI.utils.isWebGLSupported()){
  type = 'canvas';
}
PIXI.utils.sayHello(type);

document.body.appendChild(app.view);
app.renderer.backgroundColor = '0xffffff';
app.renderer.autoResize = true;
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';


// load images
function loadProgressHandler(loader, resource){
  console.log(`loading: ${resource.url}`);
  console.log(`progress: ${loader.progress}%`);
}


loader
  .add('./images/mario_tileset.json')
  .on('progress', loadProgressHandler)
  .load(setup);


function setup(){
  
  // had to use a frame number here instead of the 'filename label' unlike the docs stated, annoying... 
  for(let i = 0; i < 10; i++){
    let tex = resources['./images/mario_tileset.json'].textures[i];
    let sprite = new Sprite(tex);
    sprite.position.set((40*i), (Math.random()*100));
    sprite.scale.set(1.2, 1.2);
    stage.addChild(sprite);
  }
  
  setInterval(()=>{
    let tex = resources['./images/mario_tileset.json'].textures[getRandomInt(1,10)];
    let sprite = new Sprite(tex);
    sprite.position.set(getRandomInt(0, innerWidth), getRandomInt(0, innerHeight));
    sprite.scale.set(1.2, 1.2);
    stage.addChild(sprite);
  }, 100);
  
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// resizing events 
$(window).resize(()=>{
  app.renderer.resize(window.innerWidth, window.innerHeight);
});
$(window).trigger('resize');

