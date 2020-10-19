import React , {useState, createContext} from 'react'
export const RestaurantsContext = createContext();
export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const addRestaurants = (restaurant) => {
        setRestaurants(
            [...restaurants, restaurant]
        )
    }
    const deleteRestaurants = (id) => {
        setRestaurants(restaurants.filter( (restaurant) => {
            return restaurant.id !== id;
        }))
    }
    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants, deleteRestaurants,
                                             selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}