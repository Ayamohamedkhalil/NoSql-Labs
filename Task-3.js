use ITI_Mongo
db.employee.find({"fName" : "mohamed"}).explain()
db.serverCmdLineOpts()

//Q1-
db.createCollection("emp", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["name", "age", "department"],
         properties: {
            name: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            age: {
               bsonType: "int",
               minimum: 18,
               description: "must be an integer and at least 18"
            },
            department: {
               enum: ["HR", "Engineering", "Finance"],
               description: "must be one of the allowed departments"
            }
         }
      }
   }
})
//Test Data
db.emp.insertOne({
   name: "Ahmed",
   age: 25,
   department: "Engineering"
})

db.emp.insertOne({
   name: "Omar",
   age: 16,
   department: "Finance"
})
db.emp.insertOne({
   name: "Mona",
   age: 28,
   department: "Marketing"
})
db.emp.insertOne({
   name: "Ali",
   age: 24
})
db.emp.find({})

//Q2
use emp
var data = [
{
    _id: 1,
    name: {
        firstName: "Ahmed",
        lastName: "Ali"
    },
    age: 24,
    address: "Cairo",
    status: ["student", "active"]
},
{
    _id: 2,
    name: {
        firstName: "Sara",
        lastName: "Hassan"
    },
    age: 27,
    address: "Alexandria",
    status: ["graduate"]
},
{
    _id: 3,
    name: {
        firstName: "Omar",
        lastName: "Khaled"
    },
    age: 22,
    address: "Giza",
    status: ["student", "inactive"]
}
]

db.trainningCenter2.insertMany(data)
db.trainningCenter2.find({})


db.trainningCenter1.insertOne(data)
db.trainningCenter1.find({})


//Q3   =>"stage" : "COLLSCAN"
db.trainningCenter2.find({"age" : 24}).explain()

//Q4-Create index on created collection named it “IX_age” on age field 
db.trainningCenter2.createIndex({age:1},{name:"IX_age"})


//Q5-"indexName" : "IX_age",
db.trainningCenter2.find({"age" : 24}).explain()

db.trainningCenter2.dropIndex("IX_age")
db.trainningCenter2.find({"age" : 24}).explain()


//Q6-
db.trainningCenter2.find({"firstName" : "Ahmed"}).explain()

db.trainningCenter2.createIndex({firstName:1,lastName:1},{name:"IX_Name"})

//"indexName" : "IX_Name",
db.trainningCenter2.find({"firstName" : "Ahmed","lastName":"Ali"}).explain()

db.trainningCenter2.find({"firstName" : "Ahmed"}).explain()

//Q7-

db.dropDatabase()



