const numberOfTextures = 16 * 3;
const textureSize = 16;

// Draw textures
for (let i = 0; i < numberOfTextures; i++) {
	const canvas = document.createElement("canvas");
	canvas.width = 16;
	canvas.height = 16;
	canvas.style.width = "256px";
	canvas.style.height = "256px";
	document.body.appendChild(canvas);
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	for (let y = 0; y < textureSize; y++) {
		for (let x = 0; x < textureSize; x++) {
			const index = x + y * textureSize + i * textureSize * textureSize;
			const col = texmap[index];
			const r = (col >> 16) & 0xff;
			const g = (col >> 8) & 0xff;
			const b = col & 0xff;
			if (r && g && b) {
				ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			} else {
				ctx.fillStyle = "rgba(0, 0, 0, 0)";
			}
			ctx.fillRect(x, y, 1, 1);
		}
	}

}
