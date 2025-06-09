export const toggleFavorite = (
  produktId: string,
  favoriteProdukts: string[],
) => {
  let updateFavirites;
  if (favoriteProdukts.includes(produktId)) {
    updateFavirites = favoriteProdukts.filter((id: string) => id !== produktId);
  } else {
    updateFavirites = [...favoriteProdukts, produktId];
  }

  localStorage.setItem("favorites", JSON.stringify(updateFavirites));
  return updateFavirites;
};
