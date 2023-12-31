const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json()));
  }

  Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map(type => type.type.name).join(", ")
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLstring = pokemon.map(pokesomething => `
    <li class="card">
      <img class="class-image" src="${pokesomething.image}"/>
      <h2 class="card-title">${pokesomething.id}. ${pokesomething.name}</h2>
      <p class="card-subtitle">Type: ${pokesomething.type}</p>
    </li>
  `)
  .join('');
  pokedex.innerHTML = pokemonHTMLstring;
};

fetchPokemon();
