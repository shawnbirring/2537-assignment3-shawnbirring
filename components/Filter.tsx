import { Chip } from "@mui/material";
import { useState } from "react";

const types = [
  "water",
  "grass",
  "fire",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
];

interface FilterProps {
  setFilter: (filter: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(newSelectedTypes);
    setFilter(newSelectedTypes);
  };

  return (
    <div className="flex flex-wrap justify-center my-4">
      {types.map((type) => (
        <Chip
          key={type}
          label={type.toUpperCase()}
          onClick={() => toggleType(type)}
          className={`mx-1 my-1 ${
            selectedTypes.includes(type) ? "bg-blue-500 text-white" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default Filter;
