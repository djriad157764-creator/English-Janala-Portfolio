// Get ⚡ All Levels
const lessonsLoad = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const loadWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWord(data.data));
};

const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="col-span-3 mx-auto space-y-4">
        <img src="./assets/alert-error.png" alt="" class="mx-auto" />
        <p class="text-center">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h1 class="text-center font-medium text-[34px] text-[#292524]">নেক্সট Lesson এ যান</h1>
      </div>
    `;
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="">
          <h2 class="mb-6 text-[32px] font-bold text-black/80">${word.word ? word.word : "words could not be found !"}</h2>
        <p class="mb-6 text-[20px] font-medium">Meaning /pronunciation</p>
        <h1 class="mb-14 text-[32px] bangla-font text-[#19191A]/70 font-semibold">${word.meaning ? word.meaning : "words meaning not found !"} / ${word.pronunciation ? word.pronunciation : "pronunciation not found"}</h1>
        </div>
        <div class="flex justify-between text-[#374957]">
          <button class="btn ">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
    `;
    wordContainer.appendChild(card);
  });
};
const displayLessons = (lessons) => {
  let btnContainer = document.getElementById("btn-container");
  // btnContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
               <button onClick= "loadWord(${lesson.level_no})" class="btn btn-outline btn-primary"
                ><i class="fa-etch fa-solid fa-book-open"></i>Learn ${lesson.level_no}</button
              >
    `;
    btnContainer.appendChild(btnDiv);
  }
};
lessonsLoad();
