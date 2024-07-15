const express= require('express');
const app=express();
const bodyParser = require('body-parser')

const productRouter= require('./router/product');

const courseRouter= require('./router/courses');

const ErrorHandler= require('./error/ErrorHandler');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json fg
app.use(bodyParser.json())

const PORT= process.env.PORT || 8080;


app.use(express.json());

app.use(courseRouter);  
app.use(productRouter);


 app.use((err,req,res,next) =>{

    if(err instanceof ErrorHandler)
     {
         return res.status(err.status).json({
            error:{
                message: err.message,
                status: err.status
            }
        });
    }
    
    console.error('Unexpected Error:', err);

    res.status(500).json({
        error: true,
        message: 'Something went wrong. Please try again later.'
    });

 });

 app.use((req,rest)=> {
    return rest.json({ message: 'page not found!'});
 });




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

