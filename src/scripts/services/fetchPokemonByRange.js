import { createPokemonCard } from "../index.js";

const pokedexContainer = document.getElementById("pokedex");

// estado do módulo
let loadedPokemon = [];
export function getLoadedPokemon() {
  return loadedPokemon;
}

async function fetchPokemonByRange(startId, endId) {
  pokedexContainer.innerHTML = "";

  const pokemonPromises = [];
  for (let i = startId; i <= endId; i++) {
    pokemonPromises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
    );
  }

  const pokemonData = await Promise.all(pokemonPromises);

  // Garante ordem por id (Promise.all mantém a ordem de entrada, mas vamos de seguro)
  loadedPokemon = pokemonData.sort((a, b) => a.id - b.id);

  loadedPokemon.forEach((pokemon) => createPokemonCard(pokemon));

  return loadedPokemon;
}

export { fetchPokemonByRange, pokedexContainer };
