hos = new Mongo.Collection('hospital');

Template.register2.events({
    'click #submit'(){
        hos.insert({
            cid:$('#cid').val(),
            fullname:$('#fullname').val(),
            sex:$('#sex').val(),
            height:$('#height').val(),
            weight:$('#weight').val(),
            birth:$('#birth').val(),
        })
    },
    'click #edit'(){
        $('#e-fname').val(this.fullname),
            Session.set('edit_id',this._id);
    },
    'click #btn_edit'(){
        hos.update({_id:Session.get('edit_id')},{
            $set:{
                name:$('#e_name').val(),
                lname:$('#e_lname').val(),
                d_update:new Date()
            }
        })
        $('#myModal').modal('hide');
    },
    'click #remove'(){
        if(confirm("Do you want to remove data.")){
            hos.remove({_id:this._id});
        }
    },
    'change #selecthospital'(event){
        console.log(event.target.value);
        Session.set('hospcode',event.target.value);
    }
});

Template.register2.helpers({
    listdata(){
        //return register.find({},{sort:{createAt:-1}}).fetch();
        var data = hos.find({name:Session.get('hospcode')}).fetch()

        return data[0].person;
    },
    listhospital(){
        return hos.find().fetch()
    }
})

Template.registerHelper('changeDate',function(data){
    var th_year = parseInt(moment(data).format('YYYY'))+543;
    return moment(data).format('DD/MM'+th_year+' HH:mm');
    //return moment(data).format('DD/MM/YYYY HH:mm');
})