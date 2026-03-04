// Get ⚡ All Levels

const lessonsLoad = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data))
    .catch((error) => {
      console.error(error);
      alert("কোনো সমস্যা হয়েছে, দয়া করে পুনরায় চেষ্টা করুন");
    });
};

//Remove Btn Style

const removeActive = () => {
  let removeActiveBtn = document.querySelectorAll(".lessons-button");
  removeActiveBtn.forEach((btn) => btn.classList.remove("active"));
};

// loading spinner

// const loadingSpin = (loadingSpinner) => {
//   if (loadingSpinner == true) {
//     document.getElementById("loading-spinner").classList.remove("hidden");
//     document.getElementById("word-container").classList.add("hidden");
//   } else {
//     document.getElementById("loading-spinner").classList.add("hidden");
//     document.getElementById("word-container").classList.remove("hidden");
//   }
// };

//Get ⚡ Words by Levels

const loadWord = (id) => {
  // loadingSpin(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML =
    '<div class="col-span-3 text-center"><span class="loading loading-ring loading-xl"></span><p class="mt-4">Loading...</p></div>';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lessons-btn-${id}`);
      clickBtn.classList.add("active");
      displayWord(data.data);
    })
    .catch((error) => {
      console.error(error);
      alert("কোনো সমস্যা হয়েছে, দয়া করে পুনরায় চেষ্টা করুন");
    });
};

//Get ⚡ Words Detail
const loadDetails = async (id) => {
  const modalContainer = document.getElementById("modal-container");
  const modal = document.getElementById("my_modal");

  modalContainer.innerHTML = `
    <div class="flex justify-center items-center py-10">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="ml-4 text-xl">Loading...</p>
    </div>
  `;
  modal.showModal();

  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayWordsDetails(data.data);
  } catch (error) {
    console.error(error);
    modalContainer.innerHTML = `
      <div class="text-center text-red-500 py-6">
        <p class="text-xl">কোনো সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।</p>
      </div>
    `;
  }
};

const dynamicBtn = (synonyms) => {
  const btn = synonyms.map(
    (el) => `<button class="btn btn-soft text-xl">${el}</button>`,
  );
  return btn.join(" ");
};

const displayWordsDetails = (word) => {
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
    <h1 class="text-4xl font-semibold text-neutral bangla-font">
            ${word.word ? word.word : "Word unavailable !"} (<i class="fa-solid fa-microphone"></i>: ${word.pronunciation ? word.pronunciation : "pronunciation unavailable !"})
          </h1>
          <div class="">
            <h1 class="text-2xl font-semibold mb-3">Meaning</h1>
            <p class="bangla-font text-2xl">${word.meaning ? word.meaning : "meaning unavailable !"}</p>
          </div>
          <div class="">
            <h1 class="text-2xl font-semibold mb-3">Example</h1>
            <p class="text-2xl">${word.sentence ? word.sentence : "sentence unavailable"}</p>
          </div>
          <div class="">
            <h1 class="bangla-font text-2xl mb-3">সমার্থক শব্দ গুলো</h1>
            <div class="">
             <div>
             ${dynamicBtn(word.synonyms)}
             </div>
            </div>
          </div>
  `;
  document.getElementById("my_modal").showModal();
};

const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (!words || !Array.isArray(words) || words.length === 0) {
    wordContainer.innerHTML = `
    <div class="col-span-3 mx-auto space-y-4">
        <img src="./assets/alert-error.png" alt="" class="mx-auto" />
        <p class="text-center">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h1 class="text-center font-medium text-[34px] text-[#292524]">নেক্সট Lesson এ যান</h1>
      </div>
    `;

    // loadingSpin(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    
          <h2 class="mb-6 text-[32px] font-bold text-black/80">${word.word ? word.word : "Word unavailable !"}</h2>
        <p class="mb-6 text-[20px] font-medium">Meaning /pronunciation</p>
        <h1 class="mb-14 text-[32px] bangla-font text-[#19191A]/70 font-semibold">${word.meaning ? word.meaning : "meaning unavailable !"} / ${word.pronunciation ? word.pronunciation : "pronunciation unavailable !"}</h1>
        
        <div class="flex justify-between text-[#374957]">
          <button onclick="loadDetails(${word.id})" class="btn ">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
    `;

    wordContainer.appendChild(card);
  });
  // loadingSpin(false);
};
const displayLessons = (lessons) => {
  let btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
               <button id="lessons-btn-${lesson.level_no}" onClick= "loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lessons-button"
                ><i class="fa-solid fa-book-open"></i>Learn ${lesson.level_no}</button
              >
    `;
    btnContainer.appendChild(btnDiv);
  }
};
lessonsLoad();

const handleLogin = () => {
  const name = document.getElementById("input-text").value.trim();
  const password = document.getElementById("input-password").value.trim();

  if (!name || !password) {
    alert("Enter a valid Password and Name");
    return;
  }

  if (password !== "123456") {
    alert("Wrong Password");
    return;
  }

  alert(`Welcome ${name}`);
  // document.querySelector(".hero").style.display = "none";
};
