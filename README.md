# mc4ktex
In 2012, Notch developed a JavaScript version of [Minecraft 4k](https://minecraft.wiki/w/Minecraft_4k). This version generates textures slightly differently to the original Java version, so this project aims to provide a means to view & save these textures.

The texture generation algorithm was taken from [this version](https://jsfiddle.net/2yr59/23/) of Minecraft 4k.

The main difference is the Java version uses a set seed to always generate the same textures, but there is no way to seed the PRNG in JavaScript so the textures are randomly generated.

### Why are there three transparent textures at the top of the page?
The algorithm generates three entirely black (0x000000) textures to act as air blocks, as black is considered transparent in the game's rendering code.

Ray casting pseudocode to illustrate this:
```
if (color > 0) then
  draw pixel
  next ray
else
  step ray
endif
```

Therefore, for completeness, these textures are included and rendered as transparent.
