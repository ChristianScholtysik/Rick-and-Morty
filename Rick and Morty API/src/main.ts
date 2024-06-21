import {
  IRickandMortyCharacterResponse,
  IResult,
} from "./contracts/IRickandMortyCharacterResponse.ts.ts";
import { Status } from "./contracts/Status.ts";

const searchField = document.getElementById("input-field") as HTMLInputElement;
const select = document.getElementById("select") as HTMLInputElement;
const gender = document.getElementById("gender") as HTMLInputElement;
const loadingIndicator = document.querySelector(".loader") as HTMLSpanElement;

//*Event listener
const form = document.getElementById("form") as HTMLFormElement;
form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  fetchAllCharacters();
});

loadingIndicator.style.display = "none";

function buildFetchUrl() {
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

function fetchAllCharacters() {
  let allCharacters: IResult[] = [];

  fetch(buildFetchUrl())
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
        let errorCard = `<div class="errorCard-wrapper"><div class="errorCard">No matches found!</div></div>`;
        output.innerHTML = errorCard;
        return ` output.innerHTML= errorCard `;
      }
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
   <p id=species">Species: ${result.species}</p>
   <p id=status">Status: ${result.status}</p>
   </div>
      </div>`;
    });
    output.innerHTML = charactersMap.join("");
  }
}
