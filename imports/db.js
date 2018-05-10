import  {Mongo} from 'meteor/mongo';


var database;
if(Meteor.isServer){
    database = new MongoInternals.RemoteCollectionDriver("mongodb://localhost:27017/test");

    //database = new MongoInternals.RemoteCollectionDriver("mongodb://admin:1234@localhost:27017/test");
}

new Mongo.Collection('hospital',{_driver: database})
// export const SERVICE_CENTER = new Mongo.Collection('SERVICE_CENTER',{_driver: database});




// Connect with buildIn MongoDb

// export const register = new Mongo.Collection('register')
// export const SERVICE_CENTER = new Mongo.Collection('SERVICE_CENTER',{_driver: database});
