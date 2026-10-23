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

## Use your player on another device

1. On the device that already has your player, open **Connect devices** and select **Create a code**.
2. On your other device, open the game, select **Connect devices**, enter that code and select **Connect player**.
3. Both devices now share the player’s personal best and unlocked achievements. Each device remembers the player afterward.

For example, create a code on your Mac while signed in as FRUST, then enter it on your phone. Anyone can use this feature for their own player. A code expires after 10 minutes and connects one device. Keep it private. To connect a third device, create another code.

Connecting to a player keeps different players’ progress separate. It does not merge scores from another player already saved in the receiving browser.
