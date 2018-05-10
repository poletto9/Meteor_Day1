
Template.temp1.onRendered(function(){
	console.log('Template 1 is now Render')
	setInterval(function(){
		Session.set('Time',moment(new Date()).format('DD/MM/YYYY HH:mm:ss'))
	},500)
});
Template.temp1.helpers({
	temp1_helper(){
		var arr = [{name:"lookkid",lname:"vinijchaikul"},
				   {name:"Athiwat",lname:"Saikhum"},
				   {name:"phatcharee",lname:"yangyuen"}]
		return arr
	},
	temp1_helper2(){
		
		return false
	},
	temp1_helper3(){
		return Session.get('returnText')
	},
	temp1_helper4(){

		return Session.get('Time')
	}	
})
Template.temp1.events({
	'click #but_temp1'(events){
		Router.go('/temp2')
	},
	'keyup #text_temp1'(events){
		Session.set('returnText',events.target.value)
	}
})