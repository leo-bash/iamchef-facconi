// src/router.tsx
import { createBrowserRouter, type RouteObject } from 'react-router';
import DiscoverRecipes from './pages/DiscoverRecipes'
import Intro from './pages/Intro'
import { RecipeDetails } from './pages/RecipeDetails'
import { SearchPage } from './pages/SearchPage'

// Definisci le rotte con type safety
const routes: RouteObject[] = [
  {
    path: '/',
    element: <SearchPage />
  },
  {
    path: '/discover-recipes',
    element: <DiscoverRecipes />
  },
  {
    path: '/api-key',
    element: <Intro />
  },
  {
    path: '/recipe/:id',
    element: <RecipeDetails />
  }
]


// Crea il router
export const router = createBrowserRouter(routes)
