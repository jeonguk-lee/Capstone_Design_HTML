let canvas;
let canvasBox;
let imgLoaderBox;
let imgLoader;
let flipY;
let flipX;
let rotate_left;
let rotate_right;
let rotate_origin;
let crop;
let putDraw;
let putText;
let putIcon;
let putFigure;
let discardSelect;
let grayScale;
let invert;
let sepia;
let bluur;
let bright;
let noise;
let download;

window.onload = () => {
  canvas = new fabric.Canvas("c");
  canvasBox = document.querySelector(".canvas_box");
  imgLoaderBox = document.querySelector(".imgLoaderBox");
  imgLoader = document.querySelector(".imgLoader");
  flipY = document.querySelector(".flipY");
  flipX = document.querySelector(".flipX");
  rotate_left = document.querySelector(".rotate_left");
  rotate_right = document.querySelector(".rotate_right");
  rotate_origin = document.querySelector(".rotate_origin");
  crop = document.querySelector(".crop");
  putDraw = document.querySelector(".putDraw");
  putText = document.querySelector(".putText");
  putIcon = document.querySelector(".putIcon");
  putFigure = document.querySelector(".putFigure");
  discardSelect = document.querySelector(".discardSelect");
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

  canvasBox.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    if (!targeted) {
      grayScale.checked = false;
      invert.checked = false;
      sepia.checked = false;
      bluur.checked = false;
      bright.value = 0;
      noise.value = 0;
    } else {
      targeted.filters[0]
        ? (grayScale.checked = true)
        : (grayScale.checked = false);
      targeted.filters[1] ? (invert.checked = true) : (invert.checked = false);
      targeted.filters[2] ? (sepia.checked = true) : (sepia.checked = false);
      targeted.filters[3] ? (bluur.checked = true) : (bluur.checked = false);
      bright.value = targeted.filters[4]["brightness"];
      noise.value = targeted.filters[5]["noise"];
    }
  });

  //footer button part
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

  crop.addEventListener("click", () => {
    window.alert("기능 추가 예정입니다.");
  });

  putDraw.addEventListener("click", () => {
    window.alert("기능 추가 예정입니다.");
  });

  putText.addEventListener("click", () => {
    window.alert("기능 추가 예정입니다.");
  });

  putIcon.addEventListener("click", () => {
    window.alert("기능 추가 예정입니다.");
  });

  putFigure.addEventListener("click", () => {
    window.alert("기능 추가 예정입니다.");
  });

  discardSelect.addEventListener("click", () => {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  });

  //filter part
  function applyFilter(index, filter) {
    var targeted = canvas.getActiveObject();
    targeted.filters[index] = filter;
    targeted.applyFilters();
    canvas.renderAll();
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

  //image upload part
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
        image.filters[4] = new fabric.Image.filters.Brightness({
          brightness: 0,
        });
        image.filters[5] = new fabric.Image.filters.Noise({ noise: 0 });
        canvas.centerObject(image);
        canvas.add(image);
        canvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //image download part
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
