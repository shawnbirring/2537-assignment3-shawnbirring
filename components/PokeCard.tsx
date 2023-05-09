import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

interface Pokemon {
  name: string;
  url: string;
}

interface PokeCardProps {
  pokemon: Pokemon;
  filter: string[];
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon, filter }) => {
  const [open, setOpen] = useState(false);
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [displayCard, setDisplayCard] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        setPokemonData(data);
        if (filter.length > 0) {
          const hasAllTypes = filter.every((type) =>
            data.types.some((t: any) => t.type.name === type)
          );
          setDisplayCard(hasAllTypes);
        } else {
          setDisplayCard(true);
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchData();
  }, [pokemon.url, filter]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!displayCard) {
    return null;
  }

  return (
    <div className="pokeCard bg-white p-4 rounded shadow">
      <Typography variant="h5">{pokemon.name.toUpperCase()}</Typography>
      <img
        src={
          pokemonData?.sprites.front_default ||
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/25.png"
        }
        alt={pokemon.name}
        width={96}
        height={96}
        className="mb-2"
      />
      <button className="btn btn-primary mt-2" onClick={() => setOpen(true)}>
        More
      </button>
      {pokemonData && (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>{pokemonData.name.toUpperCase()}</DialogTitle>
          <DialogContent>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              width={96}
              height={96}
            />
            <Typography variant="h6">Abilities</Typography>
            <ul>
              {pokemonData.abilities.map((ability: any) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
            <Typography variant="h6">Stats</Typography>
            <ul>
              {pokemonData.stats.map((stat: any) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PokeCard;
