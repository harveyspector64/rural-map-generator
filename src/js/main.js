import MapGenerator from './mapGenerator.js';
import tileSet from './tileSet.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 32;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 15;

canvas.width = MAP_WIDTH * TILE_SIZE;
canvas.height = MAP_HEIGHT * TILE_SIZE;

const mapGenerator = new MapGenerator(MAP_WIDTH, MAP_HEIGHT);
const map = mapGenerator.generate();

const tileImages = {};

function loadImages() {
  return Promise.all(tileSet.tiles.map(tileName => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        tileImages[tileName] = img;
        resolve();
      };
      img.onerror = reject;
      img.src = `assets/${tileName}.png`;
    });
  }));
}

function renderMap() {
  map.forEach((cell, index) => {
    const x = (index % MAP_WIDTH) * TILE_SIZE;
    const y = Math.floor(index / MAP_WIDTH) * TILE_SIZE;
    const tileName = cell.options[0];
    ctx.drawImage(tileImages[tileName], x, y, TILE_SIZE, TILE_SIZE);
  });
}

loadImages().then(() => {
  renderMap();
}).catch(error => {
  console.error('Error loading images:', error);
});
