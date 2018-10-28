import pixijs from 'pixi.js';
import $ from 'jquery';

export var app = new PIXI.Application({width:innerHeight, height:innerWidth});
export var stage = app.stage;
export var renderer = app.renderer;
export var loader = PIXI.loader;
export var resources = PIXI.loader.resources;

export function PixiSetup(){
  
  $('head').append(`<style>*{padding:0;margin:0;}</style>`);
  
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
}
