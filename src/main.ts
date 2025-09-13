import { Game } from './core/Game';

void (async () => {
  const game = new Game(document.body);
  await game.init();
  console.log('HYPO modular game started');
})();
