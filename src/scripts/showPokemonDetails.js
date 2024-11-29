import { fetchPokemonDescription } from './services/fetchPokemonDescription.js';

const windowExtended = document.querySelector(".pokemon-extended");

// Chamando a função de fechar o card ampliado //

function closePokemonDetails(){
    windowExtended.style.display = "none";
}
  
  windowExtended.onclick = function(){
    closePokemonDetails();
}

async function showPokemonDetails(pokemon){

    // Selecionando os elementos HTML do card
  
    const pokemonImageExtended = document.querySelector(".image-extended");
    const pokemonNameExtended = document.querySelector(".pokemon-name-extended");
    const pokemonInfo = document.querySelector(".pokemon-info");
    const pokemonID = document.querySelector(".pokemon-id-extended");
  
    const pokemonDescription = await fetchPokemonDescription(pokemon.id);
  
    // Atualizando as informações com os dados da Poké API
    
    pokemonID.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
    pokemonImageExtended.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    pokemonNameExtended.textContent = pokemon.name;
    pokemonInfo.textContent = pokemonDescription;
  
    windowExtended.style.display = "flex";
}

export {showPokemonDetails, windowExtended};