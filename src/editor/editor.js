let canvas;
let canvasBox;
let canvasItem;
let upper_canvas;
let lower_canvas;
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
let removeImage;
let blackwhite;
let grayScale;
let invert;
let sepia;
let emboss;
let vintage;
let bright;
let contrast;
let bluur;
let noise;
let pixelate;
let gamma_red;
let gamma_green;
let gamma_blue;
let canvas_width;
let canvas_height;
let canvas_size_button;
let download;

window.onload = () => {
  canvas = new fabric.Canvas("c");
  upper_canvas = document.querySelector(".upper-canvas");
  lower_canvas = document.querySelector(".lower-canvas");
  canvasBox = document.querySelector(".canvas_box");
  canvasItem = document.querySelector(".canvas");
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
  removeImage = document.querySelector(".removeImage");
  blackwhite = document.querySelector(".blackwhite");
  grayScale = document.querySelector(".grayScale");
  invert = document.querySelector(".invert");
  sepia = document.querySelector(".sepia");
  emboss = document.querySelector(".emboss");
  vintage = document.querySelector(".vintage");
  bright = document.querySelector(".bright");
  contrast = document.querySelector(".contrast");
  bluur = document.querySelector(".blur");
  noise = document.querySelector(".noise");
  pixelate = document.querySelector(".pixelate");
  gamma_red = document.querySelector(".gamma_red");
  gamma_green = document.querySelector(".gamma_green");
  gamma_blue = document.querySelector(".gamma_blue");
  canvas_width = document.querySelector(".canvas_width");
  canvas_height = document.querySelector(".canvas_height");
  canvas_size_button = document.querySelector(".canvas_size_button");
  download = document.querySelector(".download");

  imgLoaderBox.addEventListener("click", () => {
    imgLoader.click();
  });

  canvasBox.addEventListener("click", () => {
    seperateEffect();
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

  removeImage.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    if (!targeted) {
      window.alert("제거할 이미지를 먼저 선택해주세요.");
    } else {
      canvas.remove(targeted);
    }
  });

  //filter part
  function applyFilter(index, filter) {
    var targeted = canvas.getActiveObject();
    targeted.filters[index] = filter;
    targeted.applyFilters();
    canvas.renderAll();
  }

  function applyFilterValue(index, prop, value) {
    let targeted = canvas.getActiveObject();
    targeted.filters[index][prop] = value;
    targeted.applyFilters();
    canvas.renderAll();
  }

  function blackwhiteOn() {
    applyFilter(0, blackwhite.checked && new fabric.Image.filters.BlackWhite());
  }

  blackwhite.addEventListener("click", () => {
    blackwhiteOn();
  });

  function grayScaleOn() {
    applyFilter(1, grayScale.checked && new fabric.Image.filters.Grayscale());
  }

  grayScale.addEventListener("change", () => {
    grayScaleOn();
  });

  function invertOn() {
    applyFilter(2, invert.checked && new fabric.Image.filters.Invert());
  }

  invert.addEventListener("change", () => {
    invertOn();
  });

  function sepiaOn() {
    applyFilter(3, sepia.checked && new fabric.Image.filters.Sepia());
  }

  sepia.addEventListener("change", () => {
    sepiaOn();
  });

  function embossOn() {
    applyFilter(
      4,
      emboss.checked &&
        new fabric.Image.filters.Convolute({
          matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
        })
    );
  }

  emboss.addEventListener("change", () => {
    embossOn();
  });

  function vintageOn() {
    applyFilter(5, vintage.checked && new fabric.Image.filters.Vintage());
  }

  vintage.addEventListener("change", () => {
    vintageOn();
  });

  bright.oninput = () => {
    applyFilterValue(6, "brightness", parseFloat(bright.value));
  };

  contrast.oninput = () => {
    applyFilterValue(7, "contrast", parseFloat(contrast.value));
  };

  bluur.oninput = () => {
    applyFilterValue(8, "blur", parseFloat(bluur.value));
  };

  noise.oninput = () => {
    applyFilterValue(9, "noise", parseFloat(noise.value));
  };

  pixelate.oninput = () => {
    applyFilterValue(10, "blocksize", parseInt(pixelate.value));
  };

  gamma_red.oninput = function () {
    let current = canvas.getActiveObject().filters[11].gamma;
    current[0] = parseFloat(gamma_red.value);
    current[1] = parseFloat(gamma_green.value);
    current[2] = parseFloat(gamma_blue.value);
    applyFilterValue(11, "gamma", current);
  };
  gamma_green.oninput = function () {
    let current = canvas.getActiveObject().filters[11].gamma;
    current[0] = parseFloat(gamma_red.value);
    current[1] = parseFloat(gamma_green.value);
    current[2] = parseFloat(gamma_blue.value);
    applyFilterValue(11, "gamma", current);
  };
  gamma_blue.oninput = function () {
    let current = canvas.getActiveObject().filters[11].gamma;
    current[0] = parseFloat(gamma_red.value);
    current[1] = parseFloat(gamma_green.value);
    current[2] = parseFloat(gamma_blue.value);
    applyFilterValue(11, "gamma", current);
  };

  canvas_size_button.addEventListener("click", () => {
    console.log(canvas_width.value, canvas_height.value);
    if (!(canvas_width.value && canvas_height.value)) {
      window.alert("값을 입력 하신 후에 버튼을 눌러주세요.");
    } else if (canvas_width.value < 100 || canvas_height.value < 50) {
      window.alert("값이 너무 작습니다. (최소크기: 너비100 높이50)");
    } else if (canvas_width.value > 1000 || canvas_height.value > 600) {
      window.alert(
        "가능한 크기를 초과하였습니다. (최대크기: 너비1000 높이600)"
      );
      canvas_width.value = "";
      canvas_height.value = "";
    } else {
      upper_canvas.style.width = `${canvas_width.value}px`;
      upper_canvas.style.height = `${canvas_height.value}px`;
      upper_canvas.style.marginTop = `${(600 - canvas_height.value) / 2}px`;
      lower_canvas.style.width = `${canvas_width.value}px`;
      lower_canvas.style.height = `${canvas_height.value}px`;
      lower_canvas.style.marginTop = `${(600 - canvas_height.value) / 2}px`;
      canvasBox.style.width = `${canvas_width.value}px`;
      canvasBox.style.height = `${canvas_height.value}px`;
      canvasItem.style.width = `${canvas_width.value}px`;
      canvasItem.style.height = `${canvas_height.value}px`;
    }
  });

  //image upload / download part
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
        image.filters[6] = new fabric.Image.filters.Brightness({
          brightness: 0,
        });
        image.filters[7] = new fabric.Image.filters.Contrast({
          contrast: 0,
        });
        image.filters[8] = new fabric.Image.filters.Blur({
          blur: 0,
        });
        image.filters[9] = new fabric.Image.filters.Noise({ noise: 0 });
        image.filters[10] = new fabric.Image.filters.Pixelate({ blocksize: 1 });
        image.filters[11] = new fabric.Image.filters.Gamma({
          gamma: [1, 1, 1],
        });
        canvas.centerObject(image);
        canvas.add(image);
        canvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  download.addEventListener("click", saveImage, false);

  //function part
  function saveImage(e) {
    console.log(this);
    this.href = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    this.download = "canvas.png";
  }

  function seperateEffect() {
    const targeted = canvas.getActiveObject();
    if (!targeted) {
      blackwhite.checked = false;
      grayScale.checked = false;
      invert.checked = false;
      sepia.checked = false;
      emboss.checked = false;
      vintage.checked = false;
      bright.value = 0;
      contrast.value = 0;
      bluur.value = 0;
      noise.value = 0;
      pixelate.value = 0;
      gamma_red.value = 0;
      gamma_green.value = 0;
      gamma_blue.value = 0;
    } else {
      targeted.filters[0]
        ? (blackwhite.checked = true)
        : (blackwhite.checked = false);
      targeted.filters[1]
        ? (grayScale.checked = true)
        : (grayScale.checked = false);
      targeted.filters[2] ? (invert.checked = true) : (invert.checked = false);
      targeted.filters[3] ? (sepia.checked = true) : (sepia.checked = false);
      targeted.filters[4] ? (emboss.checked = true) : (emboss.checked = false);
      targeted.filters[5]
        ? (vintage.checked = true)
        : (vintage.checked = false);
      bright.value = targeted.filters[6]["brightness"];
      contrast.value = targeted.filters[7]["contrast"];
      bluur.value = targeted.filters[8]["blur"];
      noise.value = targeted.filters[9]["noise"];
      pixelate.value = targeted.filters[10]["blocksize"];
      gamma_red.value = targeted.filters[11].gamma[0];
      gamma_green.value = targeted.filters[11].gamma[1];
      gamma_blue.value = targeted.filters[11].gamma[2];
    }
  }
};
