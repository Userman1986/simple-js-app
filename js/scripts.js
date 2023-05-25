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
        pokemon.height = details.height / 10; // Convert height to meters
        pokemon.imgUrl = details.sprites.front_default; // Set the image URL
        pokemon.types = details.types.map(function(type) {
          return type.type.name;
        });
        return pokemon; // Return the updated pokemon object
      })
      .then(function(pokemon) {
        return new Promise(function(resolve) {
          // Create a new Image object to load the image URL
          const img = new Image();
          img.onload = function() {
            resolve(pokemon); // Resolve the promise with the updated pokemon object
          };
          img.src = pokemon.imgUrl; // Set the source of the image
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  
  

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){

      const modal = document.getElementById('modal');
      const modalName = document.getElementById('modal-name');
      const modalHeight = document.getElementById('modal-height');
      const modalImage = document.getElementById('modal-image');

      modalName.textContent = pokemon.name;
      modalHeight.textContent = 'Height: ' + pokemon.height;
      modalImage.src = pokemon.imgUrl; // Set the source of the image

      modal.style.display = 'block';

      // Close modal when the close button or outside the modal is clicked
      const closeBtn = document.getElementsByClassName('close')[0];
      window.addEventListener('click', function(event) {
        if (event.target == modal || event.target == closeBtn) {
          modal.style.display = 'none';
        }
      });
    })
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


console.log(pokemonRepository.getAll());
