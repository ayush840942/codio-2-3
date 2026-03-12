import React from 'react';
import { renderToString } from 'react-dom/server';
import LevelMap from './src/pages/LevelMap';
import { GameProvider } from './src/context/GameContext';
import { BrowserRouter } from 'react-router-dom';

const output = renderToString(
  <BrowserRouter>
    <GameProvider>
      <LevelMap />
    </GameProvider>
  </BrowserRouter>
);

console.log(output.length > 500 ? "RENDER SUCCESS" : "BLANK RENDER", output.substring(0, 100));
