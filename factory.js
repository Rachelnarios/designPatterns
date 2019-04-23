//library that creates a hashID
var Hashids = require('hashids');
var hashids = new Hashids();
//mogo db
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;

//Create a js object to be implemented in mongodb depending on what kind of user applies to be part of the program
//Email will only be passed as an argument if it is a 503 for records

function userType(typeofuser,email){
	if(typeofuser === "client"){
		isUser();
	}
	else if (typeofuser === "charity"){
		is503(email);
	}
}
//Object for a user
function isUser(){
	var my_user_obj = { email: "na", hash: setUser() };
	//callMongo(my_user_obj);

}
//Object for a charity
function is503(email){
	var my_charity_obj = { email: email, hash: setCharity() };
	//	callMongo(my_charity_obj);

}

//transaction hash ID
function createTransactionHash(randomNum){
	var hashran = (hashids.encode(randomNum,randomNum));
	return hashran;
}

//Set info for user
function setUser(){
	//Create a hash transaction for the time and date to be assosiated with this account
	//So we can keep track of its uses, when someone donates to the chain they will be required
	//to pass this ID
	//Create a hash transaction for the time and date to be assosiated with this account
	//So we can keep track of its uses, when someone donates to the chain they will be required
	//to pass this ID
	var id = Math.floor((Math.random() * 1000) + 1);
	var id2 = Math.floor((Math.random() * 1000) + 1);
	id = createTransactionHash(id,id2);
	//check if it is in data in data inDataBase
	//If so rehash
	if(dummyinDataBase(id) === true){
		var id = Math.floor((Math.random() * 1000) + 1);
		var id2 = Math.floor((Math.random() * 1000) + 1);
		id = createTransactionHash(id,id2);
	}else{
		//console
		console.log("Your donation Id is: " + id);
	}
	return id;

}

//set info for charity
function setCharity(){
	//Create a hash transaction for the time and date to be assosiated with this account
	//So we can keep track of its uses, when someone donates to the chain they will be required
	//to pass this ID
	var id = Math.floor((Math.random() * 1000) + 1);
	var id2 = Math.floor((Math.random() * 1000) + 1);
	id = createTransactionHash(id,id2);
	//check if it is in data in data inDataBase
	//If so rehash
	if(dummyinDataBase(id) === true){
		id = Math.floor((Math.random() * 1000) + 1);
		id2 = Math.floor((Math.random() * 1000) + 1);
		id = createTransactionHash(id,id2);
	}else{
		//console
		console.log("Your 503c Id is: " + id);
	}

}
//dumy rehash function (placeholder)
function dummyinDataBase(id){
	var dummy = [1,2,3];
	if(dummy.indexOf(id) > 0){
		return true;
	}else{
		return false;
	}
}

// call mongo to create an object
function callMongo(object){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydb");
		dbo.collection("users").insertOne(object, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			db.close();
		});
	});
}
//sample testing pattern
userType("client","na");
userType("charity","char@gmail.com");
