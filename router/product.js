const router= require ('express').Router();

const ErrorHandler = require('../error/ErrorHandler');

let product1=require('../productdata');


router.get('/api/product', (req,res)=> {
        res.json(product1);

 });            
 

        
 router.post('/api/product', (req, res,next) => {
    const {name, price}= req.body;

    try{
        
        if(!name || !price)
        {
           const errobj=ErrorHandler.validationError('both name and price are required');
             return next(errobj);
        }
 
        const newproduct={
           name,
           price,
           id: new Date().getTime()
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
       
    const  id=parseInt(req.params.productid);
    product1= product1.filter((products)=> id !== products.id);

    res.json({status: 'OK'});

});

router.put('/api/product/:id', (req,res,next)=> {
        
    const prodid=parseInt(req.params.id);
    const newproduct= req.body;

    try{

        

        if(prodid!==newproduct.id)
        {
            return next( ErrorHandler.validationError('product id and id passes in url both are  not same'));      
        }

        const productindex=product1.findIndex((product)=> product.id===prodid);

        if(productindex !== -1)
        {
            product1[productindex]=newproduct;
        }
        else{
             product1.push(newproduct);
        }

        return res.status(200).send({
            error: false,
            message: "product is added successfully",
            product: newproduct
        });
    
    }catch(err){
        console.log('Error::log::>>update put product::>',err);

        return res.status(400).send({
            error:true,
            message:"something went wrong"
        });
    } 
    
}); 

module.exports=router;



