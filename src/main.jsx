import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.jsx';
import GlobalContextProvider from './contexts/GlobalContextProvider.jsx';
// pages
import Recipes from './pages/Recipes.jsx';
import Mealplan from './pages/Mealplan.jsx';
import Pantry from './pages/Pantry.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <GlobalContextProvider>
                <Routes>
                    <Route element={<App />}>
                        <Route path="pantry" element={<Pantry />} />
                        <Route path="recipes" element={<Recipes />} />
                        <Route path="mealplan" element={<Mealplan />} />
                    </Route>
                </Routes>
            </GlobalContextProvider>
        </BrowserRouter>
    </StrictMode>
);
