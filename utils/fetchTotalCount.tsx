export default async function fetchTotalCount() {
  const count = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await count.json();
  return data.count;
}
