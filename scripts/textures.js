var texmap = new Array(16 * 16 * 3 * 16);
var textures = {
	'grass-top': 1,
	'stone': 4,
	'brick': 5,
	'wood': 7,
	'leafy': 8,
	'water': 9
};

// There are 16 different textures.
for (var texture = 1; texture < 16; texture++) {

	// Pick a random brightness
	var br = 255; // - ((Math.random() * 96) | 0); // (The "|0" ensures integer)

	// The map for the texture - 3 16x16 squares.
	// Square 1: y = [0,15] - Top of cube
	// Square 2: y = [16,31] - Sides of cube (only 2 are ever visible)
	// Square 3: y = [32,47] - Bottom of cube
	// 'y' basically denotes the row of the map.
	for (var y = 0; y < 16 * 3; y++) {

		// Hence, 'x' denotes the column per row.
		for (var x = 0; x < 16; x++) {
			var color = 0x966C4A; //dirt brown
			if (texture == textures['stone'])
				color = 0x7F7F7F; // stone gray
			if (texture != textures['stone'] || ((Math.random() * 3) | 0) == 0) {
				br = 255 - ((Math.random() * 96) | 0);
			}
			// If we are in the top (16 + 5 or 6) rows of the grass topped block
			if ((texture == textures['grass-top'] && y < (((x * x * 3 + x * 81) >> 2) & 3) + 18)) {
				color = 0x6AAA40; // grass green
			} else if ((texture == textures['grass-top'] && y < (((x * x * 3 + x * 81) >> 2) & 3) + 19)) {
				br = br * 2 / 3; // reduce brightness by a third
			}

			if (texture == textures['wood']) {
				color = 0x675231; // woody brown

				// If we are in square 1 or 3
				if (x > 0 && x < 15 &&
					((y > 0 && y < 15) || (y > 32 && y < 47))) {
					color = 0xBC9862; // light wood
					// Makes concentric squares
					var xd = (x - 7);
					var yd = ((y & 15) - 7);
					if (xd < 0)
						xd = 1 - xd;
					if (yd < 0)
						yd = 1 - yd;
					if (yd > xd)
						xd = yd;
					// fiddles with br for the light/dark sq's.
					br = 196 - ((Math.random() * 32) | 0) + xd % 3 * 32;
				} else if (((Math.random() * 2) | 0) == 0) {
					// Makes the sides with the woody brown
					br = br * (150 - (x & 1) * 100) / 100;
				}
			}

			if (texture == textures['brick']) {
				color = 0xB53A15; // Brick red
				// Every 8th column, but alternately offset by 4
				// OR every 4th row
				if ((x + (y >> 2) * 4) % 8 == 0 || y % 4 == 0) {
					color = 0xBCAFA5; // Beige brick spacing
				}
			}

			if (texture == textures['water']) {
				color = 0x4040ff; // Watery blue
			}

			// If we're in the third square of the texture map,
			// Cut down brightness by half (bottom of cubes)
			var brr = br;
			if (y >= 32)
				brr /= 2;

			if (texture == textures['leafy']) {
				color = 0x50D937; // leaf green

				// 50% chance of no leaf spots
				if (((Math.random() * 2) | 0) == 0) {
					color = 0;
					brr = 255;
				}
			}

			// Some color map and putting it into the huge texture map
			var col = (((color >> 16) & 0xff) * brr / 255) << 16 |
				(((color >> 8) & 0xff) * brr / 255) << 8 |
				(((color) & 0xff) * brr / 255);
			texmap[x + y * 16 + texture * 256 * 3] = col;
		} // End of column loop
	} // End of row loop
} // End of 16 textures loop
