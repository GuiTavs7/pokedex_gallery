import { fetchPokemonDescription } from './services/fetchPokemonDescription.js';
import { getLoadedPokemon } from './services/fetchPokemonByRange.js';

const windowExtended = document.querySelector(".pokemon-extended");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let currentIndex = -1;

function closePokemonDetails(){
  windowExtended.style.display = "none";
}

// fecha só clicando no fundo (não dentro do card/botões)
windowExtended.addEventListener("click", (e) => {
  if (e.target === windowExtended) closePokemonDetails();
});

async function renderPokemon(pokemon){
  const pokemonImageExtended = document.querySelector(".image-extended");
  const pokemonNameExtended = document.querySelector(".pokemon-name-extended");
  const pokemonInfo = document.querySelector(".pokemon-info");
  const pokemonID = document.querySelector(".pokemon-id-extended");

  const pokemonDescription = await fetchPokemonDescription(pokemon.id);

  pokemonID.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
  pokemonImageExtended.src =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default || "";
  pokemonNameExtended.textContent = pokemon.name;
  pokemonInfo.textContent = pokemonDescription ?? "";

  windowExtended.style.display = "flex";
}

async function showPokemonDetails(pokemon){
  const list = getLoadedPokemon();
  currentIndex = list.findIndex((p) => p.id === pokemon.id);

  if (currentIndex === -1) {
    // Se abriu um pokémon que não está na lista carregada
    await renderPokemon(pokemon);
    btnPrev.style.display = true;
    btnNext.disabled = true;
    return;
  }

  await renderPokemon(list[currentIndex]);
  btnPrev.disabled = currentIndex <= 0;
  btnNext.disabled = currentIndex >= list.length - 1;
}

// Navegação
btnNext?.addEventListener("click", async (e) => {
  e.stopPropagation();
  const list = getLoadedPokemon();
  if (currentIndex < list.length - 1) {
    currentIndex++;
    await renderPokemon(list[currentIndex]);
    btnPrev.disabled = currentIndex <= 0;
    btnNext.disabled = currentIndex >= list.length - 1;
  }
});

btnPrev?.addEventListener("click", async (e) => {
  e.stopPropagation();
  const list = getLoadedPokemon();
  if (currentIndex > 0) {
    currentIndex--;
    await renderPokemon(list[currentIndex]);
    btnPrev.disabled = currentIndex <= 0;
    btnNext.disabled = currentIndex >= list.length - 1;
  }
});

document.addEventListener("keydown", (e) => {
  if (windowExtended.style.display !== "flex") return;
  if (e.key === "ArrowRight") btnNext?.click();
  if (e.key === "ArrowLeft") btnPrev?.click();
  if (e.key === "Escape") closePokemonDetails();
});

export { showPokemonDetails, windowExtended };
