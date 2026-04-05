use ITI_Mongo

//Q1-Find documents where the "tags" field exists.
db.inventory.find({})

db.inventory.find({tags:{$exists:true}})

//Q2-Find documents where the "tags" field does not contain values "ssl" or "security." 
db.inventory.find({tags:{$nin:["ssl","security"]}})

//Q3-Find documents where the "qty" field is equal to 85. 
db.inventory.find({qty:85})

//Q4-Find documents where the "tags" array contains all of the values [ssl, security] using the `$all` operator
db.inventory.find({tags:{$all:["ssl","security"]}})

//Q5-Find documents where the "tags" array has a size of 3
db.inventory.find({tags:{$size:3}})

//Q6-Update the "item" field in the "paper" document, update "size.uom" to "meter" and using the `$currentDate` operator. 

db.inventory.find({item:"paper"})
db.inventory.updateOne(
  { item: "paper" },
  {
    $set: { "size.uom": "meter" },
    $currentDate: { lastModified: true }
  }
)
db.inventory.find({item:"paper"})

//Q6-Also, use the upsert option (within updateOne)and change filter condition item:”laptopDevice”.
db.inventory.find({item:"laptopDevice"})
db.inventory.updateOne(
  { item: "laptopDevice" }, {
    $set: { "size.uom": "meter" },$currentDate: { lastModified: true }},{upsert:true})
db.inventory.find({item:"laptopDevice"})

//Q6-B-Use the $setOnInsert operator to add new data if an insert occurs. Example field: dataSource: "todayRegister" 
db.inventory.find({item:"laptopDevice"})
db.inventory.updateOne(
  { item: "laptopDevice" }, {
    $set: { "size.uom": "meter" },$currentDate: { lastModified: true },$setOnInsert:{dataSource: "todayRegister"}},{upsert:true})
db.inventory.find({item:"laptopDevice"})

//Q6-C-Try using the updateMany operation. 
db.inventory.updateMany({item:"paper"},{$set:{"size.uom": "meter"}})
db.inventory.find({item:"paper"})

//Q6-D-Try using the `replaceOne` operation.=>replace one document with another except the id is still the same 
db.inventory.find({item:"paper"})
db.inventory.replaceOne({item:"paper"},{item:"Window",size:"Large"})
db.inventory.find({item:"Window"})
db.inventory.find({item:"paper"})

//Q7-Insert a document with incorrect field names "neme" and "ege," then rename them to "name" and "age."
 db.inventory.insertOne({neme:"Aya",ege:25})
 db.inventory.updateOne({neme:"Aya"},{$rename:{"neme":"name","ege":"age"}})
 db.inventory.find({name:"Aya"})

//Q8:Try to reset any document field using the `$unset` function
db.inventory.find({name:"Aya"})
db.inventory.updateOne({name:"Aya"},{$unset:{"age":" "}})
db.inventory.find({name:"Aya"})

//Q9:Try update operators like `$inc`, `$min`, `$max`, and `$mul` to modify document fields. 

//Important: Use a different field for each operation listed below. Insert Data If Not Existing 
db.inventory.insertOne({_id:1145,name:"Aya Khalil",age:23,salary:10000,overtime:20,quantity :50,price:200})
//
db.inventory.updateOne({_id:1145},{$max:{salary:12000}})
//min
db.inventory.updateOne({_id:1145},{$min:{overtime:30}})
//inc ()
db.inventory.updateOne({_id:1145},{$inc:{age:5}})
//mul ()
db.inventory.updateOne({_id:1145},{$mul:{price:4}})

db.inventory.find({_id:1145})

//Q10-Calculate the total revenue for product from sales collection documents within the date range '01-01-2020' to '01-01-2023' 
//and then sort them in descending order by total revenue
db.sales.find({})
db.sales.find({date:{$gte:ISODate("2020-01-01"),$lte:ISODate("2023-01-01")}})
db.sales.aggregate([
{
    $match:{date:{$gte:ISODate("2020-01-01"),$lte:ISODate("2023-01-01")}}
},
{
    $group:{_id:"$product",totalrevenue:{$sum:{$multiply:["$quantity","$price"]}}}
},
{
    $sort:{totalrevenue:-1}
}
])

//Q11-Calculate the average salary for employees for each department from the employee’s collection. 
db.employees.find({}) //there is no where condition = no matched stage
db.employees.aggregate([
 {
   $group:{
      _id:"$department",
      Avg_Salary:{ $avg:"$salary" }
   }
 }
])
//Q12-Use likes Collection to calculate max and min likes per title 
db.likes.find({}) //there is no where condition = no matched stage only group by
db.likes.aggregate([{
    $group:{
     _id:"$title",
     maxLikes:{ $max:"$likes" },
     minLikes:{ $min:"$likes" }
   }
}])


