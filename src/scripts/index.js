import { typeColors } from './objects/type_colors.js';

import { fetchPokemonByRange, pokedexContainer } from './services/fetchPokemonByRange.js';

import { fetchPokemonDescription } from './services/fetchPokemonDescription.js';

import {setupPokemonButtons, title} from "./setupPokemonButtons.js"

// Exibindo o logo da tela inicial //

title.style.display = "block";

// Chamando o gatilho principal do JS //

setupPokemonButtons(fetchPokemonByRange);

// Chamando a função de fechar o card ampliado //

const windowExtended = document.querySelector(".pokemon-extended");

function closePokemonDetails(){
  windowExtended.style.display = "none";
}

windowExtended.onclick = function(){
  closePokemonDetails();
}

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
  pokemonCard.appendChild(typeContainer);
  pokedexContainer.appendChild(pokemonCard);
}

// Criando a função de criar o card ampliado //

async function showPokemonDetails(pokemon){

  // Selecionando os elementos HTML do card

  const pokemonImageExtended = document.querySelector(".image-extended");
  const pokemonNameExtended = document.querySelector(".pokemon-name-extended");
  const pokemonInfo = document.querySelector(".pokemon-info");
  const description = await fetchPokemonDescription(pokemon.id);

  // Atualizando as informações com os dados da Poké API

  pokemonImageExtended.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  pokemonNameExtended.textContent = pokemon.name;
  pokemonInfo.textContent = description;

  windowExtended.style.display = "flex";
}

export {createPokemonCard};