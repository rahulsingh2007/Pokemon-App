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
    const { name, id, types, sprites, weight, height, abilities, stats } = data;

    const typeDisplay = document.getElementById("typeDisplay");
    typeDisplay.innerHTML = "";
    types.forEach(t => {
        const span = document.createElement("span");
        span.textContent = t.type.name.toUpperCase();
        span.classList.add("type-badge");
        typeDisplay.appendChild(span);
    });

    document.getElementById("pokemonName").textContent =
        name.charAt(0).toUpperCase() + name.slice(1);

    const pokemonHeight = document.getElementById(`pokemonHeight`);

    const pokemonWeight = document.getElementById(`pokemonWeight`);

    const pokemonabilities = document.getElementById("pokemonabilities");
    pokemonabilities.innerHTML = "";
    abilities.forEach(t => {
        const span = document.createElement("span");
        span.textContent = t.ability.name;
        span.classList.add("ability-badge");
        pokemonabilities.appendChild(span);
    });

    const pokemonHp = stats?.[0]?.base_stat || "Unknown";
    const pokemonAtk = stats?.[1]?.base_stat || "Unknown";
    const pokemonDef = stats?.[2]?.base_stat || "Unknown";
    const pokemonSpAtk = stats?.[3]?.base_stat || "Unknown";
    const pokemonSpDef = stats?.[4]?.base_stat || "Unknown";
    const pokemonSpeed = stats?.[5]?.base_stat || "Unknown";


    document.getElementById("idDisplay").textContent = `#${id}`;
    document.getElementById(`pokemonHeight`).textContent = `${height / 10}m`;
    document.getElementById(`pokemonWeight`).textContent = `${(weight / 10).toFixed(1)}kg`;
    document.getElementById("pokemonHp").textContent = `${pokemonHp}`;
    document.getElementById("pokemonAtk").textContent = `${pokemonAtk}`;
    document.getElementById("pokemonDef").textContent = `${pokemonDef}`;
    document.getElementById("pokemonSpAtk").textContent = `${pokemonSpAtk}`;
    document.getElementById("pokemonSpDef").textContent = `${pokemonSpDef}`;
    document.getElementById("pokemonSpeed").textContent = `${pokemonSpeed}`;


    const statMap = {
        hp: "hp-fill",
        attack: "atk-fill",
        defense: "def-fill",
        "special-attack": "spAtk-fill",
        "special-defense": "spDef-fill",
        speed: "speed-fill"
    };

    const MAX_STAT = 255;
    stats.forEach(stat => {
        const name = stat.stat.name;
        const value = stat.base_stat;
        const fillClass = statMap[name];
        const fill = document.querySelector(`.${fillClass}`);
        const textMap = {
            hp: "pokemonHp",
            attack: "pokemonAtk",
            defense: "pokemonDef",
            "special-attack": "pokemonSpAtk",
            "special-defense": "pokemonSpDef",
            speed: "pokemonSpeed"
        };
        document.getElementById(textMap[name]).textContent = value;

        if (fill) {
            fill.style.width = `${(value / MAX_STAT) * 100}%`;
        }
    });
    console.log(stats);
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

    const body = document.body;
    const upperImg = document.querySelector(".upperImg");
    const fills = document.querySelectorAll(
        ".hp-fill, .atk-fill, .def-fill, .spAtk-fill, .spDef-fill, .speed-fill"
    );
    const type = types?.[0]?.type?.name;
    const typeBadge = document.querySelector(".type-badge");
    let gradient = "";

    if (type === "normal") {
        body.style.backgroundColor = "#939BA9";
        gradient = "linear-gradient(to right, #99A1AF, #6C7484)";
        typeBadge.style.backgroundColor = "#99A1AF";
    }
    else if (type === "fire") {
        body.style.backgroundColor = "#FF8604";
        gradient = "linear-gradient(to right, #FF8804, #EC270A)";
        typeBadge.style.backgroundColor = "#FF6900";
    }
    else if (type === "water") {
        body.style.backgroundColor = "#4B9CFF";
        gradient = "linear-gradient(to right, #50A2FF, #1D69FD)";
        typeBadge.style.backgroundColor = "#2B7FFF";
    }
    else if (type === "grass") {
        body.style.backgroundColor = "#00DB6F";
        gradient = "linear-gradient(to right, #04DF72, #00AE45)";
        typeBadge.style.backgroundColor = "#00C950";
    }
    else if (type === "electric") {
        body.style.backgroundColor = "#FEDB15";
        gradient = "linear-gradient(to right, #ffdd1f, #f0b400";
        typeBadge.style.backgroundColor = "#FDC700";
    }
    else if (type === "ice") {
        body.style.backgroundColor = "#9CF2FC";
        gradient = "linear-gradient(to right, #A0F3FD, #00D8F4";
        typeBadge.style.backgroundColor = "#53EAFD";
    }
    else if (type === "fighting") {
        body.style.backgroundColor = "#F62833";
        gradient = "linear-gradient(to right, #FA2C36, #C30009";
        typeBadge.style.backgroundColor = "#E7000B";
    }
    else if (type === "poison") {
        body.style.backgroundColor = "#BE74FF";
        gradient = "linear-gradient(to right, #C17AFF, #9E2CFC";
        typeBadge.style.backgroundColor = "#AD46FF";
    }
    else if (type === "ground") {
        body.style.backgroundColor = "#E9A900";
        gradient = "linear-gradient(to right, #EEAE00, #B16B00";
        typeBadge.style.backgroundColor = "#D08700";
    }
    else if (type === "flying") {
        body.style.backgroundColor = "#9DADFF";
        gradient = "linear-gradient(to right, #9FB0FF, #6A6FFF";
        typeBadge.style.backgroundColor = "#7C86FF";
    }
    else if (type === "psychic") {
        body.style.backgroundColor = "#F95DAF";
        gradient = "linear-gradient(to right, #FA60B3, #EA1881";
        typeBadge.style.backgroundColor = "#F6339A";
    }
    else if (type === "bug") {
        body.style.backgroundColor = "#93DF00";
        gradient = "linear-gradient(to right, #97E300, #68B000";
        typeBadge.style.backgroundColor = "#7CCE00";
    }
    else if (type === "rock") {
        body.style.backgroundColor = "#C98100";
        gradient = "linear-gradient(to right, #CB8300, #935300";
        typeBadge.style.backgroundColor = "#A65F00";
    }
    else if (type === "ghost") {
        body.style.backgroundColor = "#9410F2";
        gradient = "linear-gradient(to right, #9311F1, #7411BC";
        typeBadge.style.backgroundColor = "#8200DB";
    }
    else if (type === "dragon") {
        body.style.backgroundColor = "#5D58FB";
        gradient = "linear-gradient(to right, #605DFF, #4836DE";
        typeBadge.style.backgroundColor = "#4F39F6";
    }
    else if (type === "steel") {
        body.style.backgroundColor = "#9099A6";
        gradient = "linear-gradient(to right, #949DAA, #556070";
        typeBadge.style.backgroundColor = "#868E9D";
    }
    else if (type === "dark") {
        body.style.backgroundColor = "#455161";
        gradient = "linear-gradient(to right, #485464, #232E3D";
        typeBadge.style.backgroundColor = "#364153";
    }
    else {
        body.style.backgroundColor = "#FDC3E2";
        gradient = "linear-gradient(to right, #FCCEE8, #FC6DB9)";
        typeBadge.style.backgroundColor = "#FDA5D5";
    }
    upperImg.style.background = gradient;
    fills.forEach(fill => {
        fill.style.background = gradient;
    });
}