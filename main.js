const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");
const pokemonType = document.getElementById("pokemontype");
const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    try {

        const response = await fetch(pokemonUrl).then(response => response.json());

        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonAbilities = document.getElementById("pokemon-abilities");
        

        pokemonImage.addEventListener("mouseover", function(){
            let html ="";
            for(let i=0;i<response.types.length;i++){
                html+=response.types[i].type.name;
            }
            pokemonType.innerHTML =html
        })

        pokemonImage.addEventListener("mouseout", function(){
           
            pokemonType.innerHTML = "";
        })

        pokemonImage.src = response.sprites.front_default;
        pokemonName.textContent = response.name;

        pokemonStats.innerHTML = "";
        pokemonAbilities.innerHTML = "";

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        })

        response.abilities.forEach(ability => {
            const li = document.createElement("li");
            li.textContent = ability.ability.name;
            pokemonAbilities.appendChild(li);
        })
    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}
// fetch(${POKEAPI_URL}/pokemon)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// });