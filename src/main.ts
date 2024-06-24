import {
  IRickandMortyCharacterResponse,
  IResult,
} from "./contracts/IRickandMortyCharacterResponse.ts.ts";
import { Status } from "./contracts/Status.ts";
import { IAllEpisodes } from "./contracts/IAllEpisodes.ts";
import { IEpisode } from "./contracts/IEpisode.ts";

const searchField = document.getElementById("input-field") as HTMLInputElement;
const searchFieldEpisode = document.getElementById(
  "input-field-episode"
) as HTMLInputElement;
const select = document.getElementById("select") as HTMLInputElement;
const gender = document.getElementById("gender") as HTMLInputElement;
const loadingIndicator = document.querySelector(".loader") as HTMLSpanElement;
loadingIndicator.style.display = "none";
//*Event listener
const form = document.getElementById("form") as HTMLFormElement;
form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  fetchAllCharacters();
});

//*Event listener
const formEpisodes = document.getElementById("form-episode") as HTMLFormElement;
formEpisodes.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  fetchAllEpisodes();
});
//*
function buildCharacterFetchUrl() {
  const BASE_URL = "https://rickandmortyapi.com/api/character/";
  const character = searchField.value;
  const CHARACTERNAME = `?name=${character}`;
  const characterStatus = select.value;
  const CHARAKTERSTATUS =
    // characterStatus === "0" ? "" : `&status=${characterStatus}`;
    `&status=${characterStatus}`;
  const characterGender = gender.value;
  const CHARACTERGENDER = `&gender=${characterGender}`;
  const CHARACTERSEARCH_URL = `${BASE_URL}${CHARACTERNAME}${CHARAKTERSTATUS}${CHARACTERGENDER}`;
  return CHARACTERSEARCH_URL;
}

function buildEpisodeFetchUrl() {
  const BASE_URL = "https://rickandmortyapi.com/api/episode";
  const episode = searchFieldEpisode.value;
  const EPISODENAME = `?name=${episode}`;
  //const characterStatus = select.value;
  // const CHARAKTERSTATUS =
  //   // characterStatus === "0" ? "" : `&status=${characterStatus}`;
  //   `&status=${characterStatus}`;
  // const characterGender = gender.value;
  // const CHARACTERGENDER = `&gender=${characterGender}`;
  const EPISODESEARCH_URL = `${BASE_URL}${EPISODENAME}`;
  return EPISODESEARCH_URL;
}

//*
function fetchAllEpisodes() {
  let allEpisodes: IEpisode[] = [];

  fetch(buildEpisodeFetchUrl())
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((allEpisodes: IAllEpisodes) => {
      return allEpisodes.results;
    })
    .then((results: IEpisode[]) => {
      console.log("Epsode", results);
      allEpisodes = results;
      displayEpisodes(results);
      return results;
    })
    // .then((: IResult[]) => {
    //   characterList = results;
    //   console.log("CharacterList", characterList);
    //   // displayEpisodes(results);
    // })
    .catch((error: Error) => {
      console.error(error);
      const output = document.getElementById("output");
      if (output) {
        let errorCard = `<div class="errorCard-wrapper"><div class="errorCard">I'm sorry this happened to you. No matches found!</div></div>`;
        output.innerHTML = errorCard;
        return ` output.innerHTML= errorCard `;
      }
    })
    .finally(() => {
      loadingIndicator.style.display = "none";
    });
}

function fetchAllCharacters() {
  let allCharacters: IResult[] = [];

  fetch(buildCharacterFetchUrl())
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((rickandMortyCharacterResponse: IRickandMortyCharacterResponse) => {
      return rickandMortyCharacterResponse.results;
    })
    .then((results: IResult[]) => {
      allCharacters = results;
      displayCharacters(results);
    })
    .catch((error: Error) => {
      console.error(error);
      const output = document.getElementById("output");
      if (output) {
        let errorCard = `<div class="errorCard-wrapper"><div class="errorCard">I'm sorry this happened to you. No matches found!</div></div>`;
        output.innerHTML = errorCard;
        return ` output.innerHTML= errorCard `;
      }
    })
    .finally(() => {
      loadingIndicator.style.display = "none";
    });
}

// fetchAllCharacters();

function displayCharacters(allCharacters: IResult[]) {
  const output = document.getElementById("output") as HTMLDivElement;

  if (output) {
    loadingIndicator.style.display = "block";
    let charactersMap = allCharacters.map((result: IResult) => {
      const location = result.location;
      const origin = result.origin;

      return ` <div class="card">
      <div class="img-wrapper">
       <img  src='${result.image}' alt="Image">
      </div>
   <h2>${result.name}</h2>
   <p id=description-paragraph">Gender: ${result.gender}</p>
   <p id=description-paragraph">Origin: ${origin.name}</p>
   <p id=description-paragraph">Location: ${location.name}</p>
   <div class="author-wrapper">
   <p class="status">Species: ${result.species}</p>
   <p class="status">Status: ${result.status}</p>
   </div>
   <p class="status">Status: ${result.episode}</p>
      </div>`;
    });
    output.innerHTML = charactersMap.join("");
  }
}

function displayEpisodes(allEpisodes: IEpisode[]) {
  const output = document.getElementById("output") as HTMLDivElement;

  // function displayCharacterlistOfEpisode(characterList: ICharacterlist[]) {
  //   const img2 = document.getElementById("img2") as HTMLImageElement;
  //   console.log(characterList);
  //   let list = characterList.map((character: ICharacterlist) => {
  //     const img = character.name;
  //     return `<div class="img2-wrapper">
  //     <img  src='${img}' alt="Image id="img2">
  //    </div>`;
  //   });
  //   console.log(list);
  //   img2.src = list.join("");
  // }

  if (output) {
    loadingIndicator.style.display = "block";
    let episodesMap = allEpisodes.map((episode: IEpisode) => {
      const charactersPerEpisode = episode.characters;
      // console.log("CPE", charactersPerEpisode); //TODO:
      return ` <div class="card">
   <h2>${episode.name}</h2>
   <p id=description-paragraph">Air Date: ${episode.air_date}</p>
   <p id=description-paragraph">Episode: ${episode.episode}</p>
   <p id=description-paragraph">Characters: ${episode.characters} </p>
   
      </div>`;
    });
    output.innerHTML = episodesMap.join("");
  }
}
