"use client";
import { useState, useEffect } from "react";
import PokeCard from "../components/PokeCard";
import Pagination from "../components/Pagination";

interface Pokemon {
  name: string;
  url: string;
}

export default function Page() {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (currentPage - 1) * PAGE_SIZE
        }&limit=${PAGE_SIZE}`
      );
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchPokemons();
  }, [currentPage]);

  return (
    <div className="container mx-auto">
      <div className="pokeCards grid grid-cols-2 gap-4">
        {pokemons.map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(810 / PAGE_SIZE)}
      />
    </div>
  );
}
