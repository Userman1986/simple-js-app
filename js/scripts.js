

let pokemonRepository = function () {
    let pokemonList = [

        {
            name: "Bulbazaur",
            height: 7,
            type: "grass",
        },
        {
            name: "Picachu",
            height: 2,
            type: "lightning",
        },
        {
            name: "Charizard",
            height: 10,
            type: "Fire",
        },
    ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
}();

pokemonRepository.getAll().forEach(function(user) {
    console.log(user.name + ' is ' + user.height + ' height is.');

});




