// src/rendering/Renderer.js

import { TILE_SIZE } from '../config/GeneratorConfig';

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = TILE_SIZE;
    this.setupCanvas();
  }

  setupCanvas() {
    const updateCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
      this.calculateTileSize();
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
  }

  calculateTileSize() {
    const minDimension = Math.min(this.canvas.width, this.canvas.height);
    this.tileSize = Math.max(Math.floor(minDimension / 20), 16); // Ensure minimum tile size of 16px
  }

  renderMap(tileMap, assets) {
    const offsetX = (this.canvas.width - tileMap.width * this.tileSize) / 2;
    const offsetY = (this.canvas.height - tileMap.height * this.tileSize) / 2;

    for (let y = 0; y < tileMap.height; y++) {
      for (let x = 0; x < tileMap.width; x++) {
        const tile = tileMap.getTile(x, y);
        const image = assets[tile + '.png'];
        this.ctx.drawImage(
          image, 
          offsetX + x * this.tileSize, 
          offsetY + y * this.tileSize, 
          this.tileSize, 
          this.tileSize
        );
      }
    }
  }
}

export default Renderer;
