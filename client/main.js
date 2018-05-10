/*
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/


Template.temp1.onRendered(function () {
    console.log('template 1 is now render')

    setInterval(function () {
        Session.set('Show_Time',moment(new Date()).format('DD/MM/YYYY HH:mm:ss'))
    },500)
});


Template.temp1.helpers({
    temp1_helper1(){
        // return "I'm helper1"

        var arr = [{name:"pro",lname:"tewapong"},
                   {name:"may",lname:"suwimol"},
                   {name:"ko",lname:"ritipong"}]
        return arr
    },
    temp1_helper2(){
        return true
    },
    temp1_helper3(){
        return Session.get('returnText')
    },
    temp1_helper4(){
        // return new Date();
        return Session.get('Show_Time')
    }
})

//show result via Console
Template.temp1.events({
    'click #btn_temp1'(){
        // console.log('Hello!!')
        Router.go('/tmp2')
    },
    'keyup #text_temp1'(events){
        // console.log('Hi!!')
        // console.log(events.target.value)
        Session.set('returnText',events.target.value)
    }
})