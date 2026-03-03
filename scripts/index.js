// Get ⚡ All Levels
const lessonsLoad = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const displayLessons = (lessons) => {
  let btnContainer = document.getElementById("btn-container");
  // btnContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
               <button class="btn btn-outline btn-primary"
                ><i class="fa-etch fa-solid fa-book-open"></i>Learn ${lesson.level_no}</button
              >
    `;
    btnContainer.appendChild(btnDiv);
  }
};
lessonsLoad();
