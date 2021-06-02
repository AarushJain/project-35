//Create variables here
var dogImg, happyDogImg, database, foodS, foodStock;
var dog;
var foodStock, lastFed, feedTime;
var foodObject;
var foodOBG;

function preload()
{
  dogImg=loadImage("sprites/dogImg.png");
  happyDogImg=loadImage("sprites/dogImg1.png");
	//load images here
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood=createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoodS);


  database=firebase.database();
  console.log(database);

  foodOBG= new Food();


  foodStock=database.ref('food');
  foodStock.on("value",readStock);
   console.log(foodStock+"hello")
}


  function draw() {  
  background(46, 139, 87)
    drawSprites();

    textSize(20);
    fill("white");
    text("Foodstock Left: "+foodS, 295, 100);

    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed=data.val();
    });

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
     text("last feed :"+ lastFed%12 + " PM" , 350,30)

    }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
    }else{
    text("Last Feed : "+ lastFed + " AM", 350,30)  
    }

    



    foodOBG.display();
}
  function readStock(data){
  foodS=data.val(); 
  foodOBG.updateFoodStock(foodS);
}

  
function addFoodS(){
database.ref("/").update({
food:foodS  
})
foodS++  
}

function feedDog(){

dog.addImage(dogImg)

if(foodOBG.getFoodStock()<=0){
foodOBG.updateFoodStock(foodOBG.getFoodStock()*0)

}
else{
  foodOBG.updateFoodStock(foodOBG.getFoodStock()-1)
}

database.ref("/").update({
FeedTime:hour(),
food:foodOBG.getFoodStock()
})
}