import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
    const test = useParams()
    const {restaurantid} = test
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const history = useHistory();
    useEffect(() => {
        RestaurantFinder.get(`/restaurant/${restaurantid}`)
        .then( (response) =>{
            setName(response.data.data.restaurants.name);
            setLocation(response.data.data.restaurants.location);
            setPriceRange(response.data.data.restaurants.price_range);
        })
        .catch( err => {
            console.log(err);
        })
    }, []);
    const handleSubmit = (event) =>{
        event.preventDefault();
        RestaurantFinder.put(`/restaurant/${restaurantid}`, {
            name,
            location,
            price_range : priceRange
        })
        .then( (response) =>{
            history.push('/');
        })
        .catch( err => {
            console.log(err);
        })
    }
    return (
        <div>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' value={name} onChange={ (e) => setName(e.target.value)} className='form-control' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>location</label>
                    <input id='location' value={location} onChange={ (e) => setLocation(e.target.value)} className='form-control' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='price_Range'>Price Range</label>
                    <input id='price_Range' value={priceRange} onChange={ (e) => setPriceRange(e.target.value)} className='form-control' type='number' />
                </div>
                <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Update</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
