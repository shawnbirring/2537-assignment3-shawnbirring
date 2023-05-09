import { useState } from "react";

interface FilterProps {
  filter: string[];
  setFilter: (filter: string[]) => void;
}
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
        <button
          key={type}
          onClick={() => toggleType(type)}
          className={`mx-1 my-1 px-2 py-1 rounded ${
            selectedTypes.includes(type)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Filter;
