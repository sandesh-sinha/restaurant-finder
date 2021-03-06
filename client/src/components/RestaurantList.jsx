import React, {useEffect, useContext, Fragment} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import {useHistory} from 'react-router-dom';
import StarRating from './StarRating';
const RestaurantList = (props) => {
    const {restaurants, setRestaurants, deleteRestaurants} = useContext(RestaurantsContext)
    useEffect(()=>{
        RestaurantFinder.get('/restaurants/')
        .then((response)=>{
            setRestaurants(response.data.data.restaurants);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const handleDelete = (e,id) =>{
        e.stopPropagation();
        RestaurantFinder.delete(`/restaurant/${id}`)
        .then(() =>{
            deleteRestaurants(id);
        })
        .catch( err =>{
            console.log(err);
        })
    }
    let history = useHistory();
    const handleUpdate = (e,id) =>{
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    }
    const handleRestaurantSelect = (id) =>{
        history.push(`restaurant/${id}`);
    }
    const renderRating = (restaurant) =>{
        if(!restaurant.count){
            return <span className="text-warning">0 reviews</span>
        }
        return (
            <Fragment>
                <StarRating rating={restaurant.id}/>
                <span className='text-warning ml-1'> ({restaurant.count})</span>
            </Fragment>
        )
    }
    return (
        <div className='list-group'>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className='bg-primary'>
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <Fragment key={restaurant.id}>
                                <tr onClick={ () => handleRestaurantSelect(restaurant.id)} >
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.location}</td>
                                    <td>{"$".repeat(restaurant.price_range)}</td>
                                    <td>{renderRating(restaurant)}</td>
                                    <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                                    <td><button className="btn btn-danger"  onClick={ (e) => handleDelete(e,restaurant.id)}>Delete</button></td>
                                </tr>
                            </Fragment>
 
                    ) }  )}
                {/* <tr>
                    <td>McDonalds</td>
                    <td>Patna</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}

                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
