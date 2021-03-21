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
let grayScale;
let invert;
let sepia;
let bluur;
let bright;
let noise;
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
  grayScale = document.querySelector(".grayScale");
  invert = document.querySelector(".invert");
  sepia = document.querySelector(".sepia");
  bluur = document.querySelector(".blur");
  bright = document.querySelector(".bright");
  noise = document.querySelector(".noise");
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
  }
};
