import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

interface Pokemon {
  name: string;
  url: string;
}

interface PokeCardProps {
  pokemon: Pokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  const [open, setOpen] = useState(false);
  const [pokemonData, setPokemonData] = useState<any>(null);

  const handleClickOpen = async () => {
    try {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      setPokemonData(data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="pokeCard bg-white p-4 rounded shadow">
      <Typography variant="h5">{pokemon.name.toUpperCase()}</Typography>
      <img
        src={pokemonData?.sprites.front_default || "/placeholder.png"}
        alt={pokemon.name}
        width={96}
        height={96}
      />
      <button className="btn btn-primary mt-2" onClick={handleClickOpen}>
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
