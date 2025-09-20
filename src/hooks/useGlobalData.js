import { useEffect, useState } from 'react';
import supabase from '../utils/dbconnection.js';

export default function useGlobalData() {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        getInstruments();
    }, []);

    async function getInstruments() {
        const { data } = await supabase.from('ingredients').select('*');
        setInstruments(data);
    }

    return {
        instruments,
    };
}
