import { getFavoritesWithDetails } from "../../gql/favorites/favorite";
import { useFavoriteStore } from "../../state/useFavoriteStore";

export const initFavorite = async () => {
  try {
    const response = await getFavoritesWithDetails();
    if (response?.getUserFavouritesWithDetails) {
      useFavoriteStore.setState({
        allFavorites: {
          products: response.getUserFavouritesWithDetails.products || [],
          vendors: response.getUserFavouritesWithDetails.vendors || [],
        },
      });
    }
  } catch (error) {
    console.error("Error fetching all favorites:", error);
  }
};
