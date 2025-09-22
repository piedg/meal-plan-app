import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet, NavLink } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

function App() {
    return (
        <main>
            <Container>

                <h1 className='text-center'>Meal Plan App</h1>
                <nav>
                    <Nav fill variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <NavLink to="/recipes">Recipes</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/pantry">Pantry</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/mealplan">Meal Plan</NavLink>
                        </Nav.Item>
                    </Nav>
                </nav>
                <Outlet />
            </Container>
        </main>
    );
}

export default App;