// slide to go to the app screen

const slider = document.getElementById("mySlider");

slider.addEventListener("change", (e) => {
  const { value } = e.target;
  const label = document.getElementById("label");

  if (value > 70) {
    label.textContent = "";
    displayAppScreen();
  } else {
    label.textContent = "Slide to Unlock";
  }
});
const displayAppScreen = () => {
  //hide home screen
  document.querySelector(".homeScreen").remove();

  //show home screen
  document.querySelector(".appScreen").style.display = "block";
};
