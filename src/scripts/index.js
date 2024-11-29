import { typeColors } from './objects/type_colors.js';

import { fetchPokemonByRange, pokedexContainer } from './services/fetchPokemonByRange.js';

import { setupPokemonButtons, title } from "./setupPokemonButtons.js"

import { showPokemonDetails, windowExtended } from "./showPokemonDetails.js"

// Exibindo o logo da tela inicial //

title.style.display = "block";

// Chamando o gatilho principal do JS //

setupPokemonButtons(fetchPokemonByRange);

// Criando a função de criar o card //

function createPokemonCard(pokemon) {

  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon");
  pokemonCard.onclick = () => showPokemonDetails(pokemon);

  // Define o tipo principal do Pokémon e aplica a cor de fundo
  const primaryType = pokemon.types[0].type.name;
  pokemonCard.style.backgroundColor = typeColors[primaryType] || "#F5F5F5"; // Usa uma cor padrão se o tipo não estiver no mapa

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];

  const pokemonName = document.createElement("p");
  pokemonName.classList.add("pokemon-name");
  pokemonName.textContent = pokemon.name;

  const pokemonID = document.createElement("p");
  pokemonID.classList.add("pokemon-id");
  pokemonID.textContent = `#${String(pokemon.id).padStart(3, "0")}`; // Exibe algo como "#001"

  // Container para os ícones dos tipos
  const typeContainer = document.createElement("div");
  typeContainer.classList.add("type-container");

  // Adiciona um ícone para cada tipo do Pokémon
  pokemon.types.forEach((typeInfo) => {
    const typeName = typeInfo.type.name;
    const typeIcon = document.createElement("img");
    typeIcon.src = `src/favicons/${typeName}.png`; // Caminho para o ícone do tipo
    typeIcon.alt = typeName;
    typeIcon.classList.add("type-icon");
    typeContainer.appendChild(typeIcon);
  });

  pokemonCard.appendChild(pokemonImage);
  pokemonCard.appendChild(pokemonName);
  pokemonCard.appendChild(pokemonID);
  pokemonCard.appendChild(typeContainer);
  pokedexContainer.appendChild(pokemonCard);
}

export {createPokemonCard};