// Pokemon App

const form = document.querySelector(".pokemonForm");
const input = document.getElementById("myInput");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pokemon = input.value.toLowerCase().trim();

    if (!pokemon) {
        alert("Please enter a Pokémon name!");
        return;
    }

    try {
        const data = await getPokemon(pokemon);
        showPokemon(data);
    } catch (error) {
        alert(error.message);
    }
});

async function getPokemon(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Pokémon not found!");
    }

    return await res.json();
}

function showPokemon(data) {
    const { name, id, types, sprites } = data;

    const type = types?.[0]?.type?.name || "Unknown";
    document.getElementById("pokemonName").textContent =
        name.charAt(0).toUpperCase() + name.slice(1);

    document.getElementById("idDisplay").textContent = `#${id}`;
    document.getElementById("typeDisplay").textContent = `${type}`;

    const imgElement = document.getElementById("pokemonSprite");
    const img =
        sprites?.other?.["official-artwork"]?.front_default ??
        sprites?.front_default;

    if (img) {
        imgElement.src = img;
        imgElement.style.display = "block";
    } else {
        imgElement.style.display = "none";
    }
}