import { useEffect, useState } from 'react';
import supabase from '../utils/dbconnection.js';

export default function useGlobalData() {
    const [ingredients, setIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getIngredients();
    }, []);

    useEffect(() => {
        findIngredient();
    }, [searchQuery]);

    async function findIngredient() {
        if (searchQuery.trim() === '') {
            setFilteredIngredients(ingredients);
            return;
        }

        const { data } = await supabase
            .from('ingredients')
            .select('*')
            .ilike('name', `%${searchQuery}%`);

        setFilteredIngredients(data);
    }

    async function getIngredients() {
        const { data } = await supabase.from('ingredients').select('*');
        setIngredients(data);
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
        console.log('Update ingredient');
    }

    return {
        findIngredient,
        filteredIngredients,
        addIngredient,
        deleteIngredient,
        setSearchQuery,
        updateIngredient,
    };
}
