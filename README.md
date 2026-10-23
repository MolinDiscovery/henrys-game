# Henry’s Nickel Quest — Version 5: The Research Lab

[Play Version 5](https://molindiscovery.github.io/henrys-game/) · [Version 4 standings](https://molindiscovery.github.io/henrys-game/v4.html)

A computational chemistry arcade lab made for Henry. Assign jobs, rescue calculations, publish projects and improve your lab. The chemistry mechanics are playful abstractions.

## Play

1. Choose a ligand and method, then tap a nickel complex once. Coordination runs automatically; tapping an existing job prioritizes it. Use Reassign deliberately to change its ligand or method.
2. Match hard ions with water/chloride, borderline ions with ammonia, and soft ions with en/cyanide. Water returns compute, chloride provides a second chance, en fills two positions at once, ammonia is quick, and cyanide offers a quality premium.
3. Choose xTB for free quick screening, DFT for higher-quality results (22 compute), or UMA for rapid jobs (9 compute). Unusual UMA geometries ask for a manual check or DFT benchmark.
4. Calculate opens four reliable tools: Geometry fills a selected complex; Frequency reveals the final saddle-point node; Single point benchmarks a result; SCF rescue temporarily slows the lab. Compute replenishes over time and from completed jobs.
5. Complete the project’s required complexes. Its secondary objective is optional. Publish, recover one grant and choose one of three lab upgrades. You can finish and submit the run after any publication.
6. Optional saddle points follow a numbered three-node path. Later projects add movement, branching decoration and benchmark encounters. Missing them costs no grants.

A run begins with three grants. Difficulty builds modestly within projects and is capped rather than escalating without limit. Publishing creates a breather. Upgrades include more cores, better initial guesses, checkpoints, emergency coffee, reviewer insurance, compute allocation, funding and convergence consulting.

## Seasons and achievements

Version 5 uses fresh score, achievement and career-stat tables. Version 4 data is preserved, accessible through the read-only archive. Player names and device connections are shared across versions. No legacy scores or unlocks are imported into the new competition.

Career milestones accumulate across runs and connected devices: complexes, published projects, DFT calculations, saddle points, benchmarks and manual UMA checks. Separate single-run feats include a clean project, an xTB-only project, publication on the last grant and ten DFT calculations in one run. An xTB-only project permits no DFT tools or jobs.

Personal bests are saved at publications and at run completion. The server merges each device’s monotonic career component using MAX, then sums components; repeated/offline syncs do not double-count them. Gameplay remains client-reported for friendly competition.

## Connect devices

On the browser that has your player, open Connect devices and create a code. Enter it in Connect devices on your other device. Both devices remember the same player. Codes expire after 10 minutes and connect one device. Keep them private. No signup is needed.

If every connected browser loses its storage, there is no account recovery. Connecting a different player keeps its progress separate.

## Development and publishing

index.html is the complete distributable game. GitHub Pages publishes the main branch without a build. v4.html is a read-only legacy standings page. The shared service URL is configured in LEADERBOARD_CONFIG; its API supports season v5 while preserving default Version 4 routes.

Checks:

```sh
node scripts/check-research.mjs
node scripts/check-mobile.mjs
```

The research check covers automatic jobs, ligand economy, deterministic tools, project/upgrades, career milestones and simulated multi-project pacing. The mobile check covers pixel-density scaling, coordinates and rotation. Browser checks additionally cover the project-to-publication loop and phone controls.
