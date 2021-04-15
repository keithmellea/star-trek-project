import { useContext, useCallback, createContext } from 'react';
import { initialCards, initialDecks, initialInventory } from '../mockdata/CardData';
import { useState, useEffect } from 'react';
export const AppContext = createContext();
export default function useAppContext() {
    return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const [decks, setDecks] = useState(initialDecks);
    const [inventory, setInventory] = useState(initialInventory);
    const applicationState = { decks, inventory };
    const buyCardForPlayer = useCallback((cardId) => {
        console.log('buying card...', cardId);
        if (inventory <= 0) return;
        const inventoryCopy = {...inventory};
        inventoryCopy[cardId] -= 1;
        setInventory(inventoryCopy);
    }, [inventory, decks]); 
    useEffect(() => {
      console.log("INVENTORY UPDATED", applicationState.inventory);
    }, [applicationState.inventory]);
    return (
        <AppContext.Provider value={{...applicationState, cards: initialCards, buyCard:buyCardForPlayer}}>
            {props.children}
        </AppContext.Provider>
    )
}