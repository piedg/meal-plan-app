import { Outlet, NavLink } from 'react-router';

function App() {
    return (
        <main>
            <h1>layout</h1>
            <nav>
                <NavLink to="/recipes">Recipes</NavLink>
                <NavLink to="/pantry">Pantry</NavLink>
                <NavLink to="/mealplan">Meal Plan</NavLink>
            </nav>
            <Outlet />
        </main>
    );
}

export default App;
