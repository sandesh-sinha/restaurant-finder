import React, {useEffect, useContext, Fragment} from 'react';
import {useParams} from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantdetailPage = () => {
    const {restaurantid} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);
    useEffect(() => {
        RestaurantFinder.get(`/restaurant/${restaurantid}`)
        .then( (response) =>{
            setSelectedRestaurant(response.data.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }, []);
    return (
        <div>
            {selectedRestaurant && (
                <Fragment>
                    <h1 className='text-center display-1'>{selectedRestaurant.restaurants.name}</h1>
                    <div className="text-center">
                        <StarRating rating={selectedRestaurant.restaurants.average_rating} />
                        <span className='text-warning ml-1'>
                            {
                                selectedRestaurant.restaurants.count ? (
                                    `(${selectedRestaurant.restaurants.count})`
                                ):(
                                    "(0)"
                                )
                            }
                        </span>
                    </div>
                    <AddReview id={selectedRestaurant.restaurants.id}/>
                    <div className='mt-3'>
                        <Reviews reviews={selectedRestaurant.reviews}/>
                    </div>
                </Fragment>
            ) }
        </div>
    )
}

export default RestaurantdetailPage
