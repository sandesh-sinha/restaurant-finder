import React, {Fragment} from 'react';

const StarRating = ({rating}) => {
    const stars = [];
    for (let l=1; l<=5;l++){
        if(l<=rating){
            stars.push(<i key={l} className='fas fa-star text-warning'></i>);
        }
        else if(l===Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<i key={l} className="fas fa-star-half-alt text-warning"></i>);
        }
        else{
            stars.push(<i key={l} className="far fa-star text-warning"></i>);
        }
    }
    return (
        <Fragment>
            {stars}
        </Fragment>
    )
}

export default StarRating;