register = new Mongo.Collection('hospital');

Template.register.events({
	'click #submit'() {
		if (Session.get('hospcode')) {
			register.update({ _id: Session.get('hospcode') }, {
				$addToSet: {
					person: {
						cid: $('#cid').val(),
						fullname: $('#name').val() + ' ' + $('#lname').val(),
						sex: $('#sex').val(),
						birth: new Date($('#birth').val()),
						weight: parseInt($('#weight').val()),
						height: parseInt($('#height').val())
					}
				}
			}, function () {
				$('#cid').val("")
				$('#name').val("")
				$('#lname').val("")
				$('#birth').val("")
				$('#sex').val("")
				$('#weight').val("")
				$('#height').val("")
			})
		} else {
			alert('กรุณาเลือกรพ ที่สังกัต')
		}
	},
	'click #edit'() {
		var sp_name = this.fullname.split(" ")
		var now = new Date(this.birth);

		var day = ("0" + now.getDate()).slice(-2);
		var month = ("0" + (now.getMonth() + 1)).slice(-2);

		var today = now.getFullYear() + "-" + (month) + "-" + (day);
		$('#change_selecthospital').val(Session.get('e_hospcode'));
		$('#datePicker').val(today);
		$('#e_name').val(sp_name[0]);
		$('#e_lname').val(sp_name[1]);
		$('#e_cid').val(this.cid);
		$('#e_sex').val(this.sex)
		$('#e_birth').val(today);
		$('#e_weight').val(this.weight);
		$('#e_height').val(this.height);
		Session.set('edit_id', Session.get('e_hospcode'))
	},
	'click #btn_edit'() {
		if (Session.get('edit_id')) {
			Meteor.call('upDateperson', $('#e_cid').val(), $('#e_name').val(), $('#e_lname').val(), $('#e_sex').val(), $('#e_birth').val(), $('#e_weight').val(), $('#e_height').val(), function (err, res) {
				$('#myModal').modal('hide');
			})
			Session.set('Invokefunc', Math.random())

		} else {
			alert('เกิดข้อผิดพลาดกรุณาเลือกรพ.เพื่อเรียกข้อมูลใหม่')
		}
	},
	'click #remove'() {
		if (Session.get('edit_id')) {
			if (confirm("ต้องการลบข้อมูลหรือไม่")) {
				Meteor.call('deletePerson', $('#e_cid').val(), Session.get('edit_id'), function (err, res) {

					Session.set('Invokefunc', Math.random())
				});
			}
		} else {
			alert('เกิดข้อผิดพลาดกรุณาเลือกรพ.เพื่อเรียกข้อมูลใหม่')
		}

	},
	'change #e_selecthospital'(event) {
		Session.set('e_hospcode', event.target.value);
	},
	'change #selecthospital'(event) {
		Session.set('hospcode', event.target.value);
	}
});

Template.register.helpers({
	listdata() {
		Session.get('Invokefunc')
		var data = register.find({ _id: Session.get('e_hospcode') }).fetch()
		if (data) {
			return data[0].person;
		}
	},
	listhospital() {
		return register.find({}).fetch()
	}
});

Template.registerHelper('changeDate', function (data) {
	var th_year = parseInt(moment(data).format('YYYY')) + 543;
	return moment(data).format('DD/MM/' + th_year + ' HH:mm');
})

Template.registerHelper('getSex', function (data) {
	if (data == "male") {
		return "ชาย"
	} else if (data == "female") {
		return "หญิง"
	} else {
		return ""
	}
})

Template.registerHelper('getAge', function (data) {
	var today = new Date();
	var birthDate = new Date(data);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())); {
		age--;
	}
	return age;
})

