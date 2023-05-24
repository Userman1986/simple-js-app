let pokemonRepository = (function() {
  let repository = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log('pokemon is not correct');
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

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          const pokemon = {
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            height: item.height,
            types: [],
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        pokemon.height = details.height;
        pokemon.types = details.types.map(function(type) {
          return type.type.name;
        });
        pokemon.sprite = details.sprites.front_default;
        pokemon.sprite2 = details.sprites.back_default;
        pokemon.weight = details.weight;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      const pokemonDetails = document.getElementById('pokemon-details');

      pokemonDetails.innerHTML = `<h2>${pokemon.name}</h2>
                                <p>Height: ${pokemon.height}</p>
                                <p>Types: ${pokemon.types.join(', ')}</p>`;
    });
  }

  return {
    add: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  const pokemonList = pokemonRepository.getAll();
  pokemonList.forEach(function(pokemon) {
    pokemonRepository.add(pokemon);
  });
});

pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: ['electric'] });

console.log(pokemonRepository.getAll());
