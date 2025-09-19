import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function App() {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        getInstruments();
    }, []);

    async function getInstruments() {
        const { data } = await supabase.from("ingredients").select('*');
        setInstruments(data);
    }

    return (
        <ul>
            {instruments.map((instrument) => (
                <li key={instrument.name}>{instrument.name}</li>
            ))}
        </ul>
    );
}

export default App;