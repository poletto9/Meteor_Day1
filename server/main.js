import { Meteor } from 'meteor/meteor';
import '../imports/db.js';
import { register } from '../imports/db.js'
Meteor.startup(() => {
    Meteor.methods({
        upDateperson(cid,name,lname,sex,birth,weight,height) {
            register.update({ person: { $elemMatch: { cid: cid } } },
                {
                    "$set": {
                        "person.$.fullname": name + ' ' + lname,
                        "person.$.sex": sex,
                        "person.$.birth": new Date(birth),
                        "person.$.weight": parseInt(weight),
                        "person.$.height": parseInt(height),
                    }
                })
        },
        deletePerson(cid,hos_id){
            register.update({ _id: hos_id }, {
                $pull: {
                    person: { cid: cid }
                }
            })
        }
    })
});
