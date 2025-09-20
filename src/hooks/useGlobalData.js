import { useEffect, useState } from 'react';
import supabase from '../utils/dbconnection.js';

export default function useGlobalData() {
    const [ingredients, setIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    useEffect(() => {
        getIngredients();
    }, []);

    async function getIngredients() {
        const { data } = await supabase.from('ingredients').select('*');
        setIngredients(data);
        setFilteredIngredients(data);
    }

    async function findIngredient(query) {
        if (!query) {
            setFilteredIngredients(ingredients);
            return;
        }

        const { data } = await supabase
            .from('ingredients')
            .select('*')
            .ilike('name', `%${query}%`);

        setFilteredIngredients(data);
    }

    async function addIngredient(newIngredient) {
        const { data } = await supabase
            .from('ingredients')
            .insert([newIngredient])
            .select();
        setIngredients((prev) => [...prev, ...data]);
        setFilteredIngredients((prev) => [...prev, ...data]);
    }

    return {
        findIngredient,
        filteredIngredients,
        addIngredient,
    };
}
