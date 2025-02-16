import { useEffect } from "react";
import "./index.css";
import { useState } from "react";
export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);

  const API = "https://pokeapi.co/api/v2/pokemon?limiy=24";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);
  return (
    <>
      <h1>hello</h1>
    </>
  );
};
