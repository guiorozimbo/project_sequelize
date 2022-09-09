const database=require("./db.js")
const products= require("./product.js")
const {Op}=require("sequelize")
const express=require("express")
const { response, request } = require("express")
const app=express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

app.post("/product",async(request,response)=>{
try{
  await database.sync()
  const{productName,stock,amount}=request.body
  await products.create({
    productName,
    stock,
    amount,
    createdAt:new Date("2022-07-07 17:37:35"),
    updatedAt: new Date()
  }
)
  return response.status(201).send()
}
catch(error){
  return response.status(400).send(error)
}
});
app.get("/products",async(request,response)=>{
  try{
    await database.sync()
    const all_List=await products.findAll()
    return response.status(201).json(all_List)
  }catch(error){
 return response.status(400).json({error})
  } 
})
//um ou mais produtos pelo like
app.get("/product/find/productName",async(request,response)=>{
  try{
  await database.sync();
  const {productName}=request.body
  const product =await products.findAll({
    where:{
      productName:{ 
        [Op.like]: `%${productName}%`
      }
    }
  })
  return response.status(201).send(product)
}
catch(error){
  return response.status(400).send(error)
}
})
// essa rota é a original
app.get("/product/find/id",async(request,response)=>{
  try{
    await database.sync();
    const {idProducts}=request.body
    const product =await products.findByPk(idProducts)
    if(product===null){
      return response.status(400).json("Error Id undefined!!")
    }
    return response.status(201).send(product)
  }
  catch(error){
    return response.status(400).send(error)
  }
})
// essa eu fiz que também é bom pra usar
app.get("/search/product/id",async(request,response)=>{
  try{
    await database.sync();
    const {idProducts}=request.body
    const product =await products.findOne({
      where:{
        idProducts:{ 
          [Op.like]: `%${idProducts}%`
        }
      }
    })
    if(product===null){
      return response.status(400).json("Error Id undefined!!")
    }
    return response.status(201).send(product)
  }
  catch(error){
    return response.status(400).send(error)
  }
})
app.delete("/delete/id",async(request,response)=>{
  try{
    await database.sync()
    const {idProducts}=request.body
    const all_List=await products.findOne({where:{idProducts}})
    await all_List.destroy({idProducts})
    return response.status(201).json(all_List)
  }catch(error){
    return response.status(400).json(error)
  }
})
app.put("/product/update/:idProducts",async(request,response)=>{
  try{
    await database.sync()
    const{idProducts}=request.params
    const{productName,stock,amount}=request.body
    const all_List= await products.findOne({where: {idProducts}})
    await all_List.update({productName,stock,amount},{where:{idProducts}})
    return response.status(200).send({all_List})
  }catch(error){
    return response.status(400).json(error)
  }
})
app.listen(3333)