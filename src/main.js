// src/main.js

import MapGenerator from './core/MapGenerator';
import Renderer from './rendering/Renderer';
import AssetLoader from './assets/AssetLoader';
import { MAP_WIDTH, MAP_HEIGHT } from './config/GeneratorConfig';

async function initializeGame() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  const assets = await AssetLoader.load();
  const mapGenerator = new MapGenerator(MAP_WIDTH, MAP_HEIGHT);
  const map = mapGenerator.generateMap();
  
  const renderer = new Renderer(canvas);
  renderer.renderMap(map, assets);
}

window.addEventListener('load', initializeGame);
