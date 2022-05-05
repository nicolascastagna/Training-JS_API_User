// https://randomuser.me/api/?results=24

let userData = [];

const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData);
};

const userDisplay = async () => {
  await fetchUser();

  // fonctions pour traiter les dates en ISO
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);

    // pour calculer le total de jours d'enregistrement
    return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
  };

  // dayCalc va prendre en compte la date d'enregistrement dans "user.registered.date"
  document.body.innerHTML = userData
    .map(
      (user) =>
        `
        <div class="card">
        <img src=${user.picture.large} alt="photo de ${user.name.last}">
    <h3>${user.name.first} ${user.name.last} </h3>
    <p>${user.location.city}, ${dateParser(user.dob.date)}</p> 
    <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
    </div>
    `
    )
    .join("");
};

userDisplay();
