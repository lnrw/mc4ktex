const textureSize = 16;

// Draw top textures
for (let i = 1; i < 16; i++) {
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
			const index = x + y * textureSize + i * textureSize * textureSize * 3;
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


function drawSideTexture(tex) {
	const canvas = document.createElement("canvas");
	canvas.width = 16;
	canvas.height = 16;
	canvas.style.width = "256px";
	canvas.style.height = "256px";
	document.body.appendChild(canvas);
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	const imageData = ctx.createImageData(16, 16);
	// Side face of the texture is at (0, 0) to (15, 15) in the y=16 to y=31 range
	for (let y = 16; y < 32; y++) {
		for (let x = 0; x < 16; x++) {
			const col = texmap[x + y * 16 + tex * 256 * 3];
			const r = (col >> 16) & 0xff;
			const g = (col >> 8) & 0xff;
			const b = col & 0xff;

			const index = (x + (y - 16) * 16) * 4;
			imageData.data[index + 0] = r;
			imageData.data[index + 1] = g;
			imageData.data[index + 2] = b;
			imageData.data[index + 3] = 255;
		}
	}

	ctx.putImageData(imageData, 0, 0);
}

// Draw side textures
drawSideTexture(textures['wood']);
drawSideTexture(textures['grass-top']);
