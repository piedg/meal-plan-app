import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider.jsx';

export default function Pantry() {
    const { instruments } = useContext(GlobalContext);

    return (
        <div>
            <h2>Pantry</h2>
            <ul>
                {instruments.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}
