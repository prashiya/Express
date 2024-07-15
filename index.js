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
         res.status(err.status).json({
            error:{
                message: err.message,
                status: err.status
            }
        });
    }
    else{

        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
 });

 app.use((req,rest)=> {
    return rest.json({ message: 'page not found!'});
 });




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

