import {Mongo} from 'meteor/mongo';


var database;
if(Meteor.isServer){
	database = new MongoInternals.RemoteCollectionDriver("mongodb://localhost:27017/test");
    // database = new MongoInternals.RemoteCollectionDriver("mongodb://weather:AC987654321@139.59.123.129:27017/innoweather");
}


export const register = new Mongo.Collection('hospital',{_driver:database});



