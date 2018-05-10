register = new Mongo.Collection('register');

Template.register.events({
	'click #submit'(){
        register.insert({
        	name:$('#name').val(),
        	lname:$('#lname').val(),
            dateAT: new Date()
        },function () {
            $('#name').val("");
            $('#lname').val("");
        })
    },
    'click #edit'(){ //ดึงข้อมูลจากตารางมาแสดงที่ modal
        $('#e_name').val(this.name);
        $('#e_lname').val(this.lname);
        Session.set('edit_id',this._id)
    },
    'click #btn_edit'(){ //update ข้อมูล
        register.update({_id:Session.get('edit_id')},{
            $set:{
                name:$('#e_name').val(),
                lname:$('#e_lname').val(),
                d_update: new Date()
            }
        },function () {
            $('#MyModal').modal('hide')
        })
    },
    'click #remove'(){
        if(confirm("Confirm to remove?")){
            register.remove({_id:this._id})
        }
    }
})

Template.register.helpers({
    listdata(){
        // return register.find().fetch();
        return register.find({},{sort:{dateAT:-1}});
    }
})

Template.registerHelper('changeDate',function (data) {
    var th_year = parseInt(moment(data).format('YYYY'))+543
    return moment(data).format('DD/MM/'+th_year+' HH:mm')
})