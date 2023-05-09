"use client";
import { useState, useEffect } from "react";
import PokeCard from "../components/PokeCard";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";

interface Pokemon {
  name: string;
  url: string;
}

export default function Page() {
  const PAGE_SIZE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(Math.ceil(1118 / PAGE_SIZE));

  const fetchPokemonByType = async (type: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    return data.pokemon.map((poke: any) => poke.pokemon);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      if (filter.length) {
        const typePromises = filter.map((type) => fetchPokemonByType(type));
        const allPokemonByType = await Promise.all(typePromises);
        const mergedAndUnique = Array.from(
          new Set(allPokemonByType.flat().map((poke) => poke.url))
        ).map((url) =>
          allPokemonByType.flat().find((poke) => poke.url === url)
        );

        setTotalPages(Math.ceil(mergedAndUnique.length / PAGE_SIZE));
        setPokemons(
          mergedAndUnique.slice(
            (currentPage - 1) * PAGE_SIZE,
            currentPage * PAGE_SIZE
          )
        );
      } else {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${
            (currentPage - 1) * PAGE_SIZE
          }&limit=${PAGE_SIZE}`
        );
        const data = await response.json();
        setTotalPages(Math.ceil(1118 / PAGE_SIZE));
        setPokemons(data.results);
      }
    };

    fetchPokemons();
  }, [currentPage, filter]);

  return (
    <div className="container mx-auto px-4">
      <Filter setFilter={setFilter} filter={[]} />
      <div className="pokeCards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} filter={filter} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
