let canvas;
let imgLoaderBox;
let imgLoader;
let flipY;
let flipX;
let rotate_left;
let rotate_right;
let rotate_origin;
let grayScale;
let invert;
let sepia;
let bluur;
let bright;
let noise;
let download;

window.onload = () => {
  canvas = new fabric.Canvas("c");
  imgLoaderBox = document.querySelector(".imgLoaderBox");
  imgLoader = document.querySelector(".imgLoader");
  flipY = document.querySelector(".flipY");
  flipX = document.querySelector(".flipX");
  rotate_left = document.querySelector(".rotate_left");
  rotate_right = document.querySelector(".rotate_right");
  rotate_origin = document.querySelector(".rotate_origin");
  grayScale = document.querySelector(".grayScale");
  invert = document.querySelector(".invert");
  sepia = document.querySelector(".sepia");
  bluur = document.querySelector(".blur");
  bright = document.querySelector(".bright");
  noise = document.querySelector(".noise");
  download = document.querySelector(".download");

  imgLoaderBox.addEventListener("click", () => {
    imgLoader.click();
  });

  flipY.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    targeted.set("flipY", !targeted.flipY);
    canvas.renderAll();
  });

  flipX.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    targeted.set("flipX", !targeted.flipX);
    canvas.renderAll();
  });

  rotate_left.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    const center = targeted.getCenterPoint();
    targeted.set("angle", targeted.angle - 90);
    targeted.setPositionByOrigin(center);
    canvas.renderAll();
  });

  rotate_right.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    const center = targeted.getCenterPoint();
    targeted.set("angle", targeted.angle + 90);
    targeted.setPositionByOrigin(center);
    canvas.renderAll();
  });

  rotate_origin.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    const center = targeted.getCenterPoint();
    targeted.set("angle", targeted.angle - targeted.angle);
    targeted.setPositionByOrigin(center);
    canvas.renderAll();
  });

  function applyFilter(index, filter) {
    var targeted = canvas.getActiveObject();
    targeted.filters[index] = filter;
    targeted.applyFilters();
    canvas.renderAll();
    console.log(targeted);
  }

  function applyFilterValue(index, prop, value, filter) {
    let targeted = canvas.getActiveObject();
    if (!targeted.filters[index]) {
      targeted.filters[index] = filter;
    }
    targeted.filters[index][prop] = value;
    targeted.applyFilters();
    canvas.renderAll();
  }

  function grayScaleOn() {
    applyFilter(0, grayScale.checked && new fabric.Image.filters.Grayscale());
  }

  grayScale.addEventListener("change", () => {
    grayScaleOn();
  });

  function invertOn() {
    applyFilter(1, invert.checked && new fabric.Image.filters.Invert());
  }

  invert.addEventListener("change", () => {
    invertOn();
  });

  function sepiaOn() {
    applyFilter(2, sepia.checked && new fabric.Image.filters.Sepia());
  }

  sepia.addEventListener("change", () => {
    sepiaOn();
  });

  function blurOn() {
    applyFilter(
      3,
      bluur.checked && new fabric.Image.filters.Blur({ blur: 0.2 })
    );
  }

  bluur.addEventListener("change", () => {
    blurOn();
  });

  bright.oninput = () => {
    applyFilterValue(
      4,
      "brightness",
      parseFloat(bright.value),
      new fabric.Image.filters.Brightness()
    );
  };

  noise.oninput = () => {
    applyFilterValue(
      5,
      "noise",
      parseFloat(noise.value),
      new fabric.Image.filters.Noise()
    );
  };

  imgLoader.onchange = function handleImage(e) {
    let reader = new FileReader();
    reader.onload = function (event) {
      let imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        let image = new fabric.Image(imgObj);
        image.set({
          angle: 0,
          padding: 10,
          cornersize: 10,
          height: image.height,
          width: image.width,
        });
        canvas.centerObject(image);
        canvas.add(image);
        canvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  download.addEventListener("click", saveImage, false);

  function saveImage(e) {
    console.log(this);
    this.href = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    this.download = "canvas.png";
  }
};
