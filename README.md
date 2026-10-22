# Henry’s Nickel Quest

A browser game about nickel coordination chemistry, made for Henry.

[Play the game](https://molindiscovery.github.io/henrys-game/)

Select a ligand and click falling nickel ions to complete complexes. Catch transition states and run DFT calculations for extra help.

## Shared boards

Choose a player name on first play. The same browser remembers your player; personal bests and achievements sync automatically to the shared service. Open Leaderboard for personal bests or Achievements for player rankings and first unlocks.

Browser storage identifies each player. Clearing it or changing browsers may require another name. This is a friendly competition; scores are reported by the browser.

## Publishing

GitHub Pages publishes index.html from the main branch. Update that file and push to publish a new version. The .nojekyll file keeps this a plain HTML site. No build or dependency installation is required.

The service URL in LEADERBOARD_CONFIG connects the shared boards; GAME_URL controls the link players copy to share the game. No shared service credentials are embedded.
