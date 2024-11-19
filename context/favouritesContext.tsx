"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Movie {
  id: string;
  title: string;
}

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: string) => void;
  getFavoriteCount: () => number;
}

interface FavoritesProviderProps {
    children: ReactNode;
  }

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);


export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  
  const addFavorite = (movie: Movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  
 const removeFavorite = (movieId: string) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  
  const getFavoriteCount = () => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, getFavoriteCount }}>
      {children}
    </FavoritesContext.Provider>
  );
};


export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
