const numberOfTextures = 16 * 3;
const textureSize = 16;

// Draw textures
for (let i = 0; i < numberOfTextures; i++) {
	const canvas = document.createElement("canvas");
	canvas.width = 16;
	canvas.height = 16;
	canvas.classList.add("texture-canvas");
	const container = document.querySelector(".texture-canvas-container");
	container.appendChild(canvas);
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


const textureNames = ["air", "grass", "dirt1", "dirt2", "stone", "bricks", "dirt3", "log", "leaves", "water", "dirt4", "dirt5", "dirt6", "dirt7", "dirt8", "dirt9"];
const saveBtn = document.getElementById("save");

saveBtn.addEventListener("click", () => {
	const canvases = document.getElementsByClassName("texture-canvas");
	const zip = new JSZip();
	const promises = [];

	for (let i = 0; i < canvases.length; ++i) {
		const canvas = canvases[i];

		const textureBlockIndex = Math.floor(i / 3);
		const textureName = textureNames[textureBlockIndex];

		const textureFaceIndex = i % 3;
		let textureFace;

		if (textureFaceIndex === 0) {
			textureFace = "top";
		} else if (textureFaceIndex === 1) {
			textureFace = "side";
		} else {
			textureFace = "bottom";
		}

		const promise = new Promise((resolve) => {
			canvas.toBlob((blob) => {
				zip.file(`${textureName}-${textureFace}.png`, blob, {
					binary: true
				});
				resolve();
			}, "image/png");
		});

		promises.push(promise);
	}

	Promise.all(promises).then(() => {
		zip.generateAsync({
			type: "blob"
		}).then((content) => {
			const a = document.createElement("a");
			a.href = URL.createObjectURL(content, {
				type: "application/octet-stream"
			});
			a.download = "textures.zip";
			a.click();
		});
	});
});
