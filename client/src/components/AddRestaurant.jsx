import React , {useState, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
const AddRestaurant = () => {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range");
    const {addRestaurants} = useContext(RestaurantsContext);
    const handleSubmit = (event) =>{
        event.preventDefault();
        RestaurantFinder.post('/restaurant', {
            name,
            location,
            price_range : priceRange
        })
        .then( (response) => {
            addRestaurants(response.data.data.restaurants);
        })
        .catch( (err) => {
            console.log(err);
        });
    }
    return (
        <div className='mb-4'>
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='form-control' placeholder='name'/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={ (e) => setLocation(e.target.value)}  type='text' className='form-control' placeholder='location'/>
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}  className="custom-select mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
