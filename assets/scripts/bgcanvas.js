function parseRGB(cssValue) {
  const match = cssValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

window.addEventListener("load", () => {
  // get color css variables
  const root = document.documentElement;
  const cssColorD1 = getComputedStyle(root).getPropertyValue("--color-dark1");
  const colorDark1 = parseRGB(cssColorD1);
  const cssColorD2 = getComputedStyle(root).getPropertyValue("--color-dark2");
  const colorDark2 = parseRGB(cssColorD2);
  const cssColorD3 = getComputedStyle(root).getPropertyValue("--color-dark3");
  const colorDark3 = parseRGB(cssColorD3);
  const cssColorL1 = getComputedStyle(root).getPropertyValue("--color-light1");
  const colorLight1 = parseRGB(cssColorL1);
  const cssColorL2 = getComputedStyle(root).getPropertyValue("--color-light2");
  const colorLight2 = parseRGB(cssColorL2);

  const canvas = document.getElementsByClassName("bg_canvas")[0];
  const c = canvas.getContext("2d");

  // size of canvas
  const imgSize = 400;

  canvas.width = imgSize;
  canvas.height = imgSize;

  // init image data with black pixels
  const image = c.createImageData(imgSize, imgSize);
  for (let i = 0; i < image.data.length; i += 4) {
    image.data[i] = 0; // R
    image.data[i + 1] = 0; // G
    image.data[i + 2] = 0; // B
    image.data[i + 3] = 255; // A
  }

  // size of our height maps
  const mapSize = 800;

  // returns the distance of point x,y from the origin 0,0
  const distance = (x, y) => Math.sqrt(x * x + y * y);

  // init height map 1
  const heightMap1 = [];
  for (let u = 0; u < mapSize; u++) {
    for (let v = 0; v < mapSize; v++) {
      // index of coordinate in height map array
      const i = u * mapSize + v;

      // u,v are coordinates with origin at upper left corner
      // cx and cy are coordinates with origin at the
      // center of the map
      const cx = u - mapSize / 2;
      const cy = v - mapSize / 2;

      // distance from middle of map
      const d = distance(cx, cy);

      // stretching so we get the desired ripple density on our map
      const stretch = (3 * Math.PI) / (mapSize / 2);

      // wavy height value between -1 and 1
      const ripple = Math.sin(d * stretch);

      // wavy height value normalized to 0..1
      const normalized = (ripple + 1) / 2;

      // height map value 0..128, integer
      heightMap1[i] = Math.floor(normalized * 128);
    }
  }

  const heightMap2 = [];
  for (let u = 0; u < mapSize; u++) {
    for (let v = 0; v < mapSize; v++) {
      const i = u * mapSize + v;
      const cx = u - mapSize / 2;
      const cy = v - mapSize / 2;

      // skewed distance as input to chaos field calculation,
      // scaled for smoothness over map distance
      const d1 = distance(0.8 * cx, 1.3 * cy) * 0.022;
      const d2 = distance(1.35 * cx, 0.45 * cy) * 0.022;

      const s = Math.sin(d1);
      const c = Math.cos(d2);
      // height value between -2 and +2
      const h = s + c;

      // height value between 0..1
      const normalized = (h + 2) / 4;
      // height value between 0..127, integer
      heightMap2[i] = Math.floor(normalized * 127);
    }
  }

  // color helpers

  const interpolate = (c1, c2, f) => {
    return {
      r: Math.floor(c1.r + (c2.r - c1.r) * f),
      g: Math.floor(c1.g + (c2.g - c1.g) * f),
      b: Math.floor(c1.b + (c2.b - c1.b) * f),
    };
  };

  const makePalette = () => {
    const c1 = colorDark1;
    const c2 = colorDark2;
    const c3 = colorDark3;
    const c4 = colorLight1;
    const c5 = colorLight2;

    return makeFiveColorGradient(c1, c2, c3, c4, c5);
  };

  const makeFiveColorGradient = (c1, c2, c3, c4, c5) => {
    const g = [];

    for (let i = 0; i < 64; i++) {
      const f = i / 64;
      g[i] = interpolate(c1, c2, f);
    }

    for (let i = 64; i < 128; i++) {
      const f = (i - 64) / 64;
      g[i] = interpolate(c2, c3, f);
    }

    for (let i = 128; i < 192; i++) {
      const f = (i - 128) / 64;
      g[i] = interpolate(c3, c4, f);
    }

    for (let i = 192; i < 256; i++) {
      const f = (i - 192) / 64;
      g[i] = interpolate(c4, c5, f);
    }

    return g;
  };

  // offsets for moving height maps
  let dx1 = 0;
  let dy1 = 0;

  let dx2 = 0;
  let dy2 = 0;

  // adjust height maps offsets
  const moveHeightMaps = (t) => {
    dx1 = Math.floor(
      (((Math.cos(t * 0.0002 + 0.4 + Math.PI) + 1) / 2) * mapSize) / 2
    );
    dy1 = Math.floor((((Math.cos(t * 0.0003 - 0.1) + 1) / 2) * mapSize) / 2);
    dx2 = Math.floor((((Math.cos(t * -0.0002 + 1.2) + 1) / 2) * mapSize) / 2);
    dy2 = Math.floor(
      (((Math.cos(t * -0.0003 - 0.8 + Math.PI) + 1) / 2) * mapSize) / 2
    );
  };

  // two palettes we interpolate between
  const palettes = [makePalette(), makePalette()];

  // current palette is edstablished durting animation
  let palette = [];

  // stores whether we're interpolating colors
  // from palette 0 -> 1 (1) or 1 -> 0 (-1)
  let prevDirection = 1;

  const updatePalette = (t) => {
    const timeScale = 0.0005;
    const x = t * timeScale;

    // normalized value 0..1 used to interpolate palette colors
    const inter = (Math.cos(x) + 1) / 2;

    // did we switch direction, and should ergo pick a new palette
    // random palette to interpolate towards?

    const direction = -Math.sin(x) >= 0 ? 1 : -1;
    if (prevDirection != direction) {
      prevDirection = direction;
      if (direction == -1) {
        palettes[0] = makePalette();
      } else {
        palettes[1] = makePalette();
      }
    }

    // create interpolated palette for current frame
    for (let i = 0; i < 256; i++) {
      palette[i] = interpolate(palettes[0][i], palettes[1][i], inter);
    }
  };

  const updateImageData = () => {
    for (let u = 0; u < imgSize; u++) {
      for (let v = 0; v < imgSize; v++) {
        // indexes into height maps for pixel
        const i = (u + dy1) * mapSize + (v + dx1);
        const k = (u + dy2) * mapSize + (v + dx2);

        // index for pixel in image data
        // remember it's 4 bytes per pixel
        const j = u * imgSize * 4 + v * 4;

        // height value of 0..255
        let h = heightMap1[i] + heightMap2[k];
        // get color value from current palette
        let c = palette[h];

        // h = heightMap2[i];
        // c = { r: h, g: h, b: h };

        // set pixel data
        image.data[j] = c.r;
        image.data[j + 1] = c.g;
        image.data[j + 2] = c.b;
      }
    }
  };

  const tick = (time) => {
    moveHeightMaps(time);
    updatePalette(time);
    updateImageData();

    c.putImageData(image, 0, 0);

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
});
