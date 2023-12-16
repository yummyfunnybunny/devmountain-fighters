// ANCHOR Query Selectors
const fighterForm = document.querySelector("#create-fighter-form");
const nameInput = document.querySelector("#name-input");
const powerInput = document.querySelector("#power-input");
const healthInput = document.querySelector("#health-input");
const fighterList = document.querySelector("#fighters-list");
const deleteFighterForm = document.querySelector("#delete-fighter-form");
const deleteInput = document.querySelector("#delete-input");

fighterForm.addEventListener("submit", (evt) => {
  console.log("yoyoyoy");
  evt.preventDefault();
  createFighter();
});

async function createFighter() {
  // Form Validation
  if (powerInput.value < 1) {
    return alert("please input a power level higher than 1");
  }
  if (healthInput.value < 1) {
    return alert("please input a number for health higher than 1");
  }

  // Create the Request Body
  const reqBody = {
    name: nameInput.value,
    power: powerInput.value,
    health: healthInput.value,
  };

  console.log(reqBody);

  axios
    .post("/create-fighter", reqBody)
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log("hi mom");
      console.log(JSON.stringify(err.config));
      console.log(err);
    });
}

axios
  .get("/fighters")
  .then((result) => {
    console.log(result.data);
    loadFighters(result.data);
  })
  .catch((err) => {
    console.log(err);
  });

function loadFighters(fightersArray) {
  fightersArray.forEach((fighter) => {
    let newFighter = document.createElement("div");
    let fighterName = document.createElement("h3");
    let fighterPower = document.createElement("p");
    let fighterHealth = document.createElement("p");

    fighterName.innerText = `${fighter.name}`;
    fighterPower.innerText = `Power: ${fighter.power}`;
    fighterHealth.innerText = `Health: ${fighter.health}`;

    fighterList.appendChild(newFighter);
    newFighter.appendChild(fighterName);
    newFighter.appendChild(fighterPower);
    newFighter.appendChild(fighterHealth);
  });
}

// DELETE FIGHTER
deleteFighterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  deleteFighter();
});

async function deleteFighter() {
  const fighter = deleteInput.value;

  try {
    const result = await axios.delete(`/delete-fighter?name=${fighter}`);
    console.log(result.data);
  } catch (err) {
    console.log(err);
  }
}
