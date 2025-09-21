import { useEffect, useState } from 'react';
import supabase from '../utils/dbconnection.js';

export default function useGlobalData() {
    const [ingredients, setIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    useEffect(() => {
        getIngredients();
    }, []);

    useEffect(() => {
    }, [ingredients]);

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

    async function deleteIngredient(id) {
        await supabase.from('ingredients').delete().eq('id', id);
        setIngredients((prev) =>
            prev.filter((ingredient) => ingredient.id !== id)
        );
        setFilteredIngredients((prev) =>
            prev.filter((ingredient) => ingredient.id !== id)
        );
    }

    async function updateIngredient(id) {
        console.log("Update ingredient")
    }

    return {
        findIngredient,
        filteredIngredients,
        addIngredient,
        deleteIngredient,
        updateIngredient
    };
}
