require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const db = require('./db')
cors = require('cors')
const port = process.env.PORT || 3001;
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
let data = {
    doc : [
        {
            name : 'dominos',
            location : 'patna',
            price_range : 3
        }
    ]
}
app.get('/api/v1/restaurants', (req, res) => {
    let results = []
    db.query("select * from restaurants left join (select restaurant_id , count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;")
    .then( (result)=>{
        return res.status(200).json({
            status : "success",
            len : result.rows.length,
            data : {
                restaurants : result.rows
            }
        });
    })
    .catch(err =>{
        return res.status(404).json(err);
    })
});

app.get('/api/v1/restaurant/:restaurantid', (req, res)=>{
    db.query("select * from restaurants left join (select restaurant_id , count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1", [req.params.restaurantid])
    .then((result) =>{
        db.query("select * from reviews where restaurant_id=$1", [req.params.restaurantid])
        .then((response)=>{     
            return res.status(200).json({
                status : "success",
                data : {
                    restaurants : result.rows[0],
                    reviews : response.rows,
                    reviewCount : response.rows.length
                },
            })
        })
        .catch(err=>{
            return res.status(404).json(err);
        })
    })
    .catch((err) =>{
        return res.status(404).json(err);
    });
});

app.post('/api/v1/restaurant', (req, res)=>{    
    db.query("INSERT INTO restaurants (name, location, price_range)  values ($1, $2, $3) returning *;",
                 [req.body.name, req.body.location, req.body.price_range])
    .then((result) =>{
        return res.status(201).json({
            success : 'success',           
            data : {
                restaurants : result.rows[0]
            }
        })
    })
    .catch( (err) =>{
        return res.status(404).json({
            error : err
        });
    });
});

app.put('/api/v1/restaurant/:restaurantid', (req, res) =>{
    db.query("update restaurants set name=$1, location=$2, price_range=$3 where id=$4 returning *;",
                [req.body.name, req.body.location, req.body.price_range, req.params.restaurantid])
    .then( (result) =>{
        res.status(200).json({
            success : 'success',
            data : {
                restaurants : result.rows[0]
            }  
        })
    })
    .catch(err=>{
        return res.status(404).json({
            error : err
        })
    });
});

app.delete('/api/v1/restaurant/:restaurantid', (req, res) =>{
    db.query("delete from restaurants where id=$1", [req.params.restaurantid])
    .then(() => {
        return res.status(200).json({
        success : 'success Delete'});
    })
    .catch(err =>{
        return res.status(404).json( {error : err});
    })
});

app.post('/api/v1/restaurant/:id/addReview', (req,res)=>{
    db.query("INSERT INTO reviews(restaurant_id, name, review, rating) values($1, $2, $3, $4) returning *;", 
                [req.params.id, req.body.name , req.body.review, req.body.rating])
    .then( (response) =>{
        return res.status(201).json({
            status : 'success',
            data: {
                review : response.rows[0]
            }
        })
    })
    .catch(err => {
        console.log(err);
    })
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
