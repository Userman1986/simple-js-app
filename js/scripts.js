

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
for (let i = 0; i < pokemonList.length; i++) 
{
  
    if (pokemonList[i].height > 9) 
    { document.write("<p>" + pokemonList[i].name + ", Height=" + pokemonList[i].height, " Wow its Big" + "</p>" ); } 
    else if (pokemonList[i].height <= 9) { document.write("<p>" + pokemonList[i].name + ", Height=" + pokemonList[i].height + "</p>" ); }



}
