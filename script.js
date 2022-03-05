const localApIKey = "1146a362dcee20c6a1b46391df3efa27";
const privateApiKey = "5941fa2a354fe44193442a45f8a7a6cac36c0790";

/* const charName = "wolverine"; */
const heroCard = document.querySelector(".hero-card");
const heroInput = document.getElementsByTagName("input");

const fetchChars = async () => {
  const charName = heroInput[0].value;

  heroCard.innerHTML = "";

  if (charName === "") {
    heroCard.innerHTML = `
      <div class="hero-card-img">
          
      </div>
      <div class="hero-card-body">
          <h5>You must enter a name! 😥</h5>
          <hr>
          
          <p>We are not soothsayers!</p>
          }</p>
          
      </div>
  
  
  `;
  }

  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?apikey=${localApIKey}&nameStartsWith=${charName}`
  );
  const data = await response.json();
  console.log(data);

  const {
    data: { results },
  } = data;

  if (!results.length) {
    heroCard.innerHTML = `
      <div class="hero-card-img">
          
      </div>
      <div class="hero-card-body">
          <h5>No hero found! 😥</h5>
          <hr>
          
          <p>Maybe got lost in the void or maybe you misspelled the name...</p>
          }</p>
          
      </div>
  
  
  `;
  }
  const imageUrl =
    results[0].thumbnail.path +
    "/portrait_uncanny." +
    results[0].thumbnail.extension;

  heroCard.innerHTML = `
      <div class="hero-card-img">
          <img src="${imageUrl}" width="100%" alt="Hero Image">
      </div>
      <div class="hero-card-body">
          <h5>${results[0].name}</h5>
          <hr>
          <h5>Bio:</h5>
          <p>${
            results[0].description !== ""
              ? results[0].description
              : "The story of this heroe remains unknown..."
          }</p>
          <a target="_blank" href="${
            results[0].urls[1].url
          }">Go to Marvel Wiki</a>
      </div>
  
  
  `;
};

const fetchFirst = async () => {
  const chars = ["Spider-Man (2099)", "Iron Man", "Hulk"];
  const rng = Math.floor(Math.random() * chars.length);

  const charName = chars[rng];

  heroCard.innerHTML = "";

  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?apikey=${localApIKey}&nameStartsWith=${charName}`
  );
  const data = await response.json();

  const {
    data: { results },
  } = data;

  const imageUrl =
    results[0].thumbnail.path +
    "/portrait_uncanny." +
    results[0].thumbnail.extension;

  heroCard.innerHTML = `
      <div class="hero-card-img">
          <img src="${imageUrl}" width="100%" alt="">
      </div>
      <div class="hero-card-body">
          <h5>${results[0].name}</h5>
          <hr>
          <h5>Bio:</h5>
          <p>${
            results[0].description !== ""
              ? results[0].description
              : "The story of this heroe remains unknown..."
          }</p>
          <a target="_blank" href="${
            results[0].urls[1].url
          }">Go to Marvel Wiki</a>
      </div>
  
  
  `;
};

window.onload = fetchFirst();
