const router= require('express').Router();

 const ErrorHandler = require('../error/ErrorHandler');

let course=require('../coursedata');

router.get('/api/course', (req,res) =>{

       res.json(course);
});

router.post('/api/course', (req,res,next) =>{

    const{name, price}= req.body;

    try{
        if(!name || !price)
            {
                const errobj=ErrorHandler.validationError("Name and price both are required filled");
                 return next( errobj);
            }
        
            const course1={
                name,
                price,
                id: new Date().getTime()
            }
        
            course.push(course1);
        
            return res.status(201).send({
                error: false,
                message: "course is added succeesfully",
                data: course1
            });
    }catch(err){

        console.log('Error::log::>>course::>',err);

        return res.status(400).send({
            error:true,
            message:"something went wrong"});
    }
})



module.exports=router;