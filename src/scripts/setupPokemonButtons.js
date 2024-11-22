const title = document.querySelector(".logo");

function setupPokemonButtons(fetchPokemonByRange) {
    document.getElementById("btn-gen1").addEventListener("click", () => {
      title.style.display = "none";
      fetchPokemonByRange(1, 151); // Geração 1
    });
  
    document.getElementById("btn-gen2").addEventListener("click", () => {
      title.style.display = "none";
      fetchPokemonByRange(152, 251); // Geração 2
    });
  
    document.getElementById("btn-gen3").addEventListener("click", () => {
      title.style.display = "none";
      fetchPokemonByRange(252, 386); // Geração 3
    });
  
    document.getElementById("btn-gen4").addEventListener("click", () => {
      title.style.display = "none";
      fetchPokemonByRange(387, 494); // Geração 4
    });
  
    document.getElementById("btn-gen5").addEventListener("click", () => {
      title.style.display = "none";
      fetchPokemonByRange(495, 649); // Geração 5
    });
}

export {setupPokemonButtons, title};