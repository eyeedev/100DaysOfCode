// A function to inital toggle button component
function ToggleButton(selector, callback = null) {
  // Select the target wrapper, and its child buttons with the given selector
  const wrapper = document.querySelector(selector);
  const buttons = wrapper.querySelectorAll("button");

  wrapper.style.gridTemplateColumns = `repeat(${buttons.length}, 1fr)`;

  const width = 100 / buttons.length;

  // Create the slider and append it to the wrapper
  const slider = document.createElement("span");
  slider.classList.add("slider");

  slider.style.width = `${width}%`;
  slider.style.left = "0%";

  wrapper.appendChild(slider);

  // Add button click event listeners
  buttons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      wrapper.querySelectorAll("button.active").forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      slider.style.left = `${index * width}%`;

      if (callback instanceof Function) {
        callback(e);
      }
    });
  });
}

ToggleButton("#alignment", (e) => {
  console.log(`Alignment: ${e.target.textContent}`);
});

ToggleButton("#language", (e) => {
  console.log(`Language: ${e.target.textContent}`);
});
