//import {TweenLite} from 'gsap';
import pixijs from 'pixi.js';
import $ from 'jquery';
import {getRandomInt} from './modules/Utils.js';
import {app, stage, renderer, loader, resources, PixiSetup} from './modules/PixiSetup.js';
import {keyboard} from './modules/Keyboard.js';

const TextureCache = PIXI.utils.TextureCache;
const Rectangle = PIXI.Rectangle;
const Sprite = PIXI.Sprite;

import './images/mario_tileset.png';
import './images/mario_tileset.json';

import './images/62703.png';



PixiSetup();

let mario = new PIXI.Container();
mario.vx = 0;
mario.vy = 0;
let mario_sprites;

let state = {
  game(){},
  mario: {
    lastDirection: '',
    defaultSpeed: 2,
    walking: false,
    frame: 1,
    stopWalk(){
      mario.children[0].alpha = 1;
      mario.children[1].alpha = 0;
    }
  }
}


let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);
//Left arrow key `press` method
left.press = () => {
  //Change the mario's velocity when the key is pressed
  mario.vx = state.mario.defaultSpeed*-1;
  mario.vy = 0;
  mario.scale.set(1,1);
  if(state.mario.lastDirection == 'right') mario.x -= 10;
  state.mario.walking = true;
};

//Left arrow key `release` method
left.release = () => {
  //If the left arrow has been released, and the right arrow isn't down,
  //and the mario isn't moving vertically:
  //Stop the mario
  if (!right.isDown && mario.vy === 0) {
    mario.vx = 0;
    state.mario.walking = false;
    state.mario.lastDirection = 'left';
    state.mario.stopWalk();
  }
}
//Up
up.press = () => {
  mario.vy = state.mario.defaultSpeed*-1;
  mario.vx = 0;
  state.mario.walking = true;
};
up.release = () => {
  if (!down.isDown && mario.vx === 0) {
    mario.vy = 0;
    state.mario.walking = false;
    state.mario.stopWalk();
  }
}
//Right
right.press = () => {
  mario.vx = state.mario.defaultSpeed;
  mario.vy = 0;
  mario.scale.set(-1,1);
  if(state.mario.lastDirection == 'left') mario.x += 10;
  state.mario.walking = true;
};
right.release = () => {
  if (!left.isDown && mario.vy === 0) {
    mario.vx = 0;
    mario.scale.set(-1,1);
    state.mario.walking = false;
    state.mario.lastDirection = 'right';
    state.mario.stopWalk();
  }
}
//Down
down.press = () => {
  mario.vy = state.mario.defaultSpeed;
  mario.vx = 0;
  state.mario.walking = true;
};
down.release = () => {
  if (!up.isDown && mario.vx === 0) {
    mario.vy = 0;
    state.mario.walking = false;
    state.mario.stopWalk();
  }
  
};



// load images
function loadProgressHandler(loader, resource){
  console.log(`loading: ${resource.url}`);
  console.log(`progress: ${loader.progress}%`);
}


loader
  .add('./images/mario_tileset.json')
  .add('./images/62703.png')
  .on('progress', loadProgressHandler)
  .load(setup);


function setup(){
  // test zelda stuff 
  let ztex = TextureCache['./images/62703.png'];
  let zsprite = new Sprite(ztex);
  ztex.frame = new Rectangle( 168, 504, 42, 42 ); // <-- coords for the Goron mask 
  stage.addChild(zsprite);
  
  // mario stuff
  mario_sprites = resources['./images/mario_tileset.json'].textures;
  
  let tex = mario_sprites[0];
  let f1 = new Sprite(tex);
  
  let tex2 = mario_sprites[1];
  let f2 = new Sprite(tex2);
  
  mario.addChild(f1);
  mario.addChild(f2);
  //console.log(mario.children);
  mario.scale.set(-1,1);
  f2.alpha = 0;
  
  mario.position.set(20,0);
  stage.addChild(mario);
  
  // set the game state 
  state.game = play;
  // start the game loop 
  app.ticker.add(delta => gameLoop(delta));
  //test tween 
  //TweenLite.to(mario, 2, { x:200 });
}

function gameLoop(delta){
  state.game(delta);
}

function play(delta){
  if(state.mario.walking == true){
    state.mario.frame++;
    if(state.mario.frame < 4){
      mario.children[0].alpha = 1;
      mario.children[1].alpha = 0;
    }else{
      mario.children[0].alpha = 0;
      mario.children[1].alpha = 1;
      if(state.mario.frame > 8){
        state.mario.frame = 0;
      }
    }
  }
  mario.x += mario.vx;
  mario.y += mario.vy;
}


// resizing events 
$(window).resize(()=>{
  app.renderer.resize(window.innerWidth, window.innerHeight);
});
$(window).trigger('resize');

