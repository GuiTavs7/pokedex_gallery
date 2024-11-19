import { createPokemonCard } from "../index.js";

const pokedexContainer = document.getElementById("pokedex");

async function fetchPokemonByRange(startId, endId) {
  // Limpa os Pokémon exibidos anteriormente
  pokedexContainer.innerHTML = "";

  // Cria um array de promessas para carregar Pokémon em paralelo
  const pokemonPromises = [];

  for (let i = startId; i <= endId; i++) {
    pokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
  }

  // Espera todas as requisições serem concluídas
  const pokemonData = await Promise.all(pokemonPromises);

  // Cria o card para cada Pokémon carregado
  pokemonData.forEach(pokemon => createPokemonCard(pokemon));
}

export {fetchPokemonByRange, pokedexContainer};