async function fetchPokemonDescription(pokemonId) {

    try {
      // Faz uma requisição para obter os dados da espécie do Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
      const speciesData = await response.json();
  
      // Procura a primeira descrição em inglês
      const descriptionEntry = speciesData.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );
  
      // Armazena a descrição ou uma mensagem padrão caso não haja descrição disponível
      let textInfoPokemon = descriptionEntry ? descriptionEntry.flavor_text : "No description available.";
      
      // Substituindo caracteres especiais indesejáveis do texto da descrição

      textInfoPokemon = textInfoPokemon.replace(/[^\x20-\u21D5\u2194\u2195\u2196\u2197↕]/g, ' ');
  
      return textInfoPokemon;
    } 
    
    catch (error) {
      console.error("Error fetching Pokémon description:", error);
      return "No description available due to an error.";
    }

}

export {fetchPokemonDescription};