var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var app=express();
// const port = process.env.PORT || 3000
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://diksha:Naina@4321@to-do-list.rlk3x.mongodb.net/todolistDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// const mongoDbURL = process.env.MONGODB_URL || "mongodb://localhost:27017/todolistDB"
// mongoose.connect(mongoDbURL,{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"First Item",
});
const d=[item1];
app.get("/",function(req,res)
{
   Item.find({},function(err,f)
   {
      if(f.length===0)
      {
        Item.insertMany(d,function(err)
        {
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully saved items to DB");
            }
        });
      res.redirect("/");
      }
      else{
      res.render("list",{newListItems:f});
      }
   })
  ;
})
app.post("/add",function(req,res)
{
     const itemName=req.body.n;
    const item=new Item({
       name:itemName
   });
item.save();
res.redirect("/");
});

app.post("/delete",function(req,res)
{
  const check=req.body.checkbox;
  Item.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  });
});
app.post("/deleteAll", function (req, res) {
    Item.deleteMany({}, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted all");
      }
    });
    res.redirect("/");
  });  
  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }
  
  app.listen(port, function () {
    console.log("Server has started successfully");
  });

