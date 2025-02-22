import { useEffect } from "react";
import "./index.css";
import { useState } from "react";
import { PokemonCard } from "./PokemonCard";
export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loding, setLoding] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const detailedPokemonData = data.results.map(async (currpokemon) => {
        try {
          const res = await fetch(currpokemon.url);
          const data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      });
      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(false);
      setError(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curpokemon) =>
    curpokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loding) {
    return (
      <div>
        <h1>loding.....</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Lets Catch Pokemon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="search pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ul className="cards">
          {searchData.map((currpokemon) => {
            return (
              <PokemonCard key={currpokemon.id} pokemonData={currpokemon} />
            );
          })}
        </ul>
      </div>
    </section>
  );
};
