let pokemonRepository = (function () {
  let repository = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poison"],
    },
    {
      name: "Charizard",
      height: 1.7,
      types: ["fire", "flying"],
    },
    {
      name: "Squirtle",
      height: 1,
      types: ["water"],
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return repository;
  }
 

  function addListItem(pokemon) {
    const pokemonList = document.getElementById('pokemon-list');

    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = pokemon.name;

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function showDetails(pokemon) {
    const pokemonDetails = document.getElementById('pokemon-details');

    pokemonDetails.innerHTML = `<h2>${pokemon.name}</h2>
                                <p>Height: ${pokemon.height}</p>
                                <p>Types: ${pokemon.types.join(', ')}</p>`;
  }

  return {
    add: addListItem,
    getAll: function() {
      return repository;
    },
  };
})();

const pokemonList = pokemonRepository.getAll();
pokemonList.forEach(function(pokemon) {
  pokemonRepository.add(pokemon);
});

pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.add(pokemon);
});
