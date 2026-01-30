import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';

import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Favorites from './pages/Favorites';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'recipes', element: <RecipeList /> },
      { path: 'recipes/:id', element: <RecipeDetail /> },
      { path: 'recipes/:id/edit', element: <EditRecipe /> },
      { path: 'add', element: <AddRecipe /> },
      { path: 'favorites', element: <Favorites /> },
    ],
  },
]);

export default router;
