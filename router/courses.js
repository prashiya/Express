const router= require('express').Router();

const ErrorHandler= require(  '../error/Errorhandler' );

let course=require('../coursedata');

router.get('/api/course', (req,res) =>{

       res.json(course);
});

router.post('/api/course', (req,res) =>{

    const{name, price}= req.body();

    if(!name || !price)
    {
        return ErrorHandler.validationError('Name and price both are required filled');
    }

    const course1={
        name,
        price,
        id: new Date().getTime().toString()
    }

    course.push(course1);

    res.json(course1);
})



module.exports=router;