const router= require ('express').Router();

const ErrorHandler= require(  '../error/Errorhandler' );
let product1=require('../productdata');


router.get('/api/product', (req,res)=> {
        res.json(product1);

 });            

 router.post('/api/products', (req, res) => {
    try{
        const {name, price}= req.body;

        if(!name || !price)
        {
          return ErrorHandler.validationError('All fields are required');
        }
 
        const newproduct={
           name,
           price,
           id: new Date().getTime().toString()
        }
 
        product1.push(newproduct);
 
        return res.status(201).send({
            error: false,
            message: "product is added succeesfully",
            data: newproduct
        });

    }catch(err){

        console.log('Error::log::>>add product::>',err);

        return res.status(400).send({
            error:true,
            message:"something went wrong"});
    }
      
});

 router.delete('/api/product/:productid', (req,res) => {
       
    product1= product1.filter((products)=> req.params.productid !== products.id);

    res.json({status: 'OK'});

});

module.exports=router;



