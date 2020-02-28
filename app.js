const container = document.querySelector(".container");
const btns = document.querySelectorAll(".btn");
let squareNum = "16";
let status = "Version 1";

function createGrid(squareNum) {
  squareNum = parseInt(squareNum);
  container.style.display = "grid";
  container.style.grid = `repeat(${squareNum}, 1fr)/repeat(${squareNum}, 1fr)`;

  for (let i = 0; i < squareNum * squareNum; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("style", `border:1px solid black`);
    square.dataset.passCount = "0";
    container.appendChild(square);
    square.addEventListener("mouseenter", changeColor);
  }
}

createGrid(squareNum);

function showSelected(status) {
  btns.forEach(btn => {
    if (btn.textContent === status) {
      btn.classList.add("change-color");
    } else {
      btn.classList.remove("change-color");
    }
  });
}

showSelected(status);

function pickColor(square, ratio = 1) {
  let rgb = [];
  // ratio to be used for darkening steps for Version 2
  for (let i = 0; i < 3; i++) {
    rgb[i] = (Math.floor(Math.random() * 255) * ratio).toFixed(0);
  }
  if (status === "Version 1") {
    square.dataset.rgb = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
  }
  const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  return color;
}

function darkenColor(square, passCount) {
  let newRgb = [];
  let newColor;
  if (status === "Version 1") {
    const rgb = square.dataset.rgb.split(",");
    for (let i = 0; i < rgb.length; i++) {
      newRgb.push(((rgb[i] * (10 - passCount)) / 10).toFixed(0));
    }
    newColor = "rgb(" + newRgb.join(",") + ")";
  } else {
    let ratio = (10 - parseInt(passCount)) / 10;
    newColor = pickColor(square, ratio);
  }
  return newColor;
}

function changeColor(event) {
  const square = event.target;
  let passCount = parseInt(square.dataset.passCount);

  if (passCount <= 10) {
    if (passCount === 0) {
      square.style.backgroundColor = pickColor(square);
    } else {
      square.style.backgroundColor = darkenColor(square, passCount);
    }
    passCount += 1;
    square.dataset.passCount = passCount;
  }
}

function getSquareNum() {
  let answer = parseInt(prompt("How many squares?"));

  while (Number.isNaN(answer) || answer < 1) {
    alert("Please enter valid number");
    answer = parseInt(prompt("How many squares?"));
  }
  return answer;
}

function clearColor(event) {
  event.preventDefault();
  container.innerHTML = "";
}

btns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "Version 1") {
      status = "Version 1";
    } else if (btn.textContent === "Version 2") {
      status = "Version 2";
    }
    showSelected(status);
    clearColor(event);
    createGrid(getSquareNum());
  });
});
