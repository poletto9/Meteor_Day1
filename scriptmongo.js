db.hospital.insert([{
	"hcode":"11130",
	"hname":"โรงพยาบาลสันทราย",
	"province":"เชียงใหม่",
	"district":"สันทราย"
},{
	"hcode":"11131",
	"hname":"โรงพยาบาลสันดิน",
	"province":"เชียงใหม่",
	"district":"สันดิน"
}])

// update specific field
db.hospital.update({"hcode":"11130"},{
	$set:{
		"hname":"San Sai Hospital",
		"province":"Chiang Mai",
		"district":"San Sai"
	}
})

db.hospital.update({"hcode":"11131"},{
	$set:{
		"hname":"San Din Hospital",
		"province":"Chiang Mai",
		"district":"San Din"
	}
})

//Relation with Embedded Document

db.hospital.update({hcode:"11130"},{
	$push:{
		person:{
			"cid" : "123456",
            "name" : "invisiblemancnx",
            "sex" : "male",
            "birth" : new Date("1975-05-15"),
            "weight" : 70,
            "height" : 174
		}
	}
})

db.hospital.update({hcode:"11130"},{
	$push:{
		person:{
			"cid":"98765",
			"name":"Dee Dee",
			"sex":"female",
			"birth": new Date("2012-04-15"),
			"weight":90,
			"height":165
		}
	}
})



//Update value in Embedded Document
db.hospital.update(
	{
		person:{
			$elemMatch:{
				cid:"98765"
			}
		}
	},
	{
		$set:{
			"person.$.name":"Somsri Jaid"
		}
	}
)

//remove value in Embedded Document

db.hospital.update({
	hcode:"11130"
},
{
	$pull:{
		person:{
			cid:"98765"
		}
	}
})

//Aggregation Stage
db.hospital.aggregate(
	[
		{
			$unwind:"$person"
		}
	]
).pretty()


//Aggregation Stage from specific field
db.hospital.aggregate(
	[
		{
			$unwind:"$person"
		},{
			$project:{
				pid:"$person.cid",
				name:"$person.fullname",
				sex:"$person.sex",
				hx2:{$multiply:["$person.height",2]},
				hdivid:{$divide:["$person.height",2]},
				hpow:{$pow:["$person.height",2]},
				y_born:{$year:"$person.birth"},
				th:{$sum:[{$year:"$person.birth"},543]}
			}
		},{
			$match:{
				hx2:{$gte:349}
			}
		},{
			$group:{
				_id:"$sex",
				count:{$sum:1}
			}
		}
	]
).pretty()

//Example
//1.How many male in hospital
db.hospital.aggregate(
	[
		{
			$unwind:"$person"
		},{
			$project:{
				hospcode:"$hospcode",
				pid:"$person.cid",
				name:"$person.fullname",
				sex:"$person.sex"
			}
		},{
			$match:{
				sex:{$eq:"male"}
			}
		},{
			$group:{
				_id:"$hospcode",
				sex:{$last:"$sex"},
				count:{$sum:1}
			}
		}
	]
).pretty()


//2.Show each BMI
db.hospital.aggregate(
	[
		{
			$unwind:"$person"
		},{
			$project:{
				pid:"$person.cid",
				name:"$person.fullname",
				BMI:{$divide:["$person.weight",{$pow:[{$divide:["$person.height",100]},2]}]}
			}
		}
	]
).pretty()


//convert_m:{$divide:["$person.height",100]},
//hpow:{$pow:[{$divide:["$person.height",100]},2]},