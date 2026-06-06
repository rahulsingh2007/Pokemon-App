// Pokemon App

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".pokemonForm");
    const input = document.getElementById("myInput");
    form.addEventListener("submit", handleSearch);
    async function handleSearch(e) {
        e.preventDefault();
        const pokemon = input.value.toLowerCase().trim();
        if (!pokemon) {
            alert("Please enter a Pokémon name!");
            return;
        }
        try {
            const data = await getPokemon(pokemon);
            renderPokemon(data);
        } catch (error) {
            alert(error.message);
        }
    }
    async function getPokemon(name) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!res.ok) {
            throw new Error("Pokémon not found!");
        }

        return await res.json();
    }
    function renderPokemon(data) {
        document.getElementById("landing-page").style.display = "none";
        document.getElementById("pokemon-page").style.display = "flex";
        const { name, id, types, sprites, weight, height, abilities, stats } = data;
        // ---------------- NAME ----------------
        document.getElementById("pokemonName").textContent =
            name.charAt(0).toUpperCase() + name.slice(1);

        document.getElementById("pokemonHeight").textContent = `${height / 10}m`;
        document.getElementById("pokemonWeight").textContent = `${(weight / 10).toFixed(1)}kg`;
        // ---------------- NAME ----------------
        document.getElementById(`idDisplay`).textContent = `#${id}`
        // ---------------- TYPES ----------------
        const typeDisplay = document.getElementById("typeDisplay");
        typeDisplay.innerHTML = "";

        types.forEach(t => {
            const span = document.createElement("span");
            span.textContent = t.type.name.toUpperCase();
            span.classList.add("type-badge");
            typeDisplay.appendChild(span);
        });
        // ---------------- ABILITIES ----------------
        const pokemonabilities = document.getElementById("pokemonabilities");
        pokemonabilities.innerHTML = "";
        abilities.forEach(a => {
            const span = document.createElement("span");
            span.textContent = a.ability.name;
            span.classList.add("ability-badge");
            pokemonabilities.appendChild(span);
        });
        // ---------------- STATS ----------------
        const statMap = {
            hp: "hp-fill",
            attack: "atk-fill",
            defense: "def-fill",
            "special-attack": "spAtk-fill",
            "special-defense": "spDef-fill",
            speed: "speed-fill"
        };
        const textMap = {
            hp: "pokemonHp",
            attack: "pokemonAtk",
            defense: "pokemonDef",
            "special-attack": "pokemonSpAtk",
            "special-defense": "pokemonSpDef",
            speed: "pokemonSpeed"
        };
        const MAX_STAT = 255;
        stats.forEach(stat => {
            const name = stat.stat.name;
            const value = stat.base_stat;
            document.getElementById(textMap[name]).textContent = value;

            const fill = document.querySelector(`.${statMap[name]}`);
            if (fill) {
                fill.style.width = `${(value / MAX_STAT) * 100}%`;
            }
        });
        // ---------------- IMAGE ----------------
        const imgElement = document.getElementById("pokemonSprite");
        const img =
            sprites?.other?.["official-artwork"]?.front_default ??
            sprites?.front_default;
        if (img) {
            imgElement.src = img;
            imgElement.style.display = "block";
        }
        imgElement.classList.remove("animate");
        void imgElement.offsetWidth;
        imgElement.classList.add("animate");
        // ---------------- COLORS (FIXED HERE) ----------------
        const typeColors = {
            normal: { body: "#939BA9", gradient: "linear-gradient(to right, #99A1AF, #6C7484)", badge: "#99A1AF" },
            fire: { body: "#FF8604", gradient: "linear-gradient(to right, #FF8804, #EC270A)", badge: "#FF6900" },
            water: { body: "#4B9CFF", gradient: "linear-gradient(to right, #50A2FF, #1D69FD)", badge: "#2B7FFF" },
            grass: { body: "#00DB6F", gradient: "linear-gradient(to right, #04DF72, #00AE45)", badge: "#00C950" },
            electric: { body: "#FEDB15", gradient: "linear-gradient(to right, #FFDD1F, #F0B400)", badge: "#FDC700" },
            ice: { body: "#9CF2FC", gradient: "linear-gradient(to right, #A0F3FD, #00D8F4)", badge: "#53EAFD" },
            fighting: { body: "#F62833", gradient: "linear-gradient(to right, #FA2C36, #C30009)", badge: "#E7000B" },
            poison: { body: "#BE74FF", gradient: "linear-gradient(to right, #C17AFF, #9E2CFC)", badge: "#AD46FF" },
            ground: { body: "#E9A900", gradient: "linear-gradient(to right, #EEAE00, #B16B00)", badge: "#D08700" },
            flying: { body: "#9DADFF", gradient: "linear-gradient(to right, #9FB0FF, #6A6FFF)", badge: "#7C86FF" },
            psychic: { body: "#F95DAF", gradient: "linear-gradient(to right, #FA60B3, #EA1881)", badge: "#F6339A" },
            bug: { body: "#93DF00", gradient: "linear-gradient(to right, #97E300, #68B000)", badge: "#7CCE00" },
            rock: { body: "#C98100", gradient: "linear-gradient(to right, #CB8300, #935300)", badge: "#A65F00" },
            ghost: { body: "#9410F2", gradient: "linear-gradient(to right, #9311F1, #7411BC)", badge: "#8200DB" },
            dragon: { body: "#5D58FB", gradient: "linear-gradient(to right, #605DFF, #4836DE)", badge: "#4F39F6" },
            steel: { body: "#9099A6", gradient: "linear-gradient(to right, #949DAA, #556070)", badge: "#868E9D" },
            dark: { body: "#455161", gradient: "linear-gradient(to right, #485464, #232E3D)", badge: "#364153" },
            fairy: { body: "#FDC3E2", gradient: "linear-gradient(to right, #FCCEE8, #FC6DB9)", badge: "#FDA5D5" }
        };
        const primaryType = types?.[0]?.type?.name;
        const style = typeColors[primaryType] || typeColors.fairy;
        const body = document.body;
        const upperImg = document.querySelector(".upperImg");
        const fills = document.querySelectorAll(
            ".hp-fill, .atk-fill, .def-fill, .spAtk-fill, .spDef-fill, .speed-fill"
        );
        body.style.backgroundColor = style.body;
        upperImg.style.background = style.gradient;

        fills.forEach(fill => {
            fill.style.background = style.gradient;
        });
        document.querySelectorAll(".type-badge").forEach((badge, i) => {
            const typeName = types[i]?.type?.name;
            if (typeColors[typeName]) {
                badge.style.backgroundColor = typeColors[typeName].badge;
            }
        });
    }
});