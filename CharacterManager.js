var async = require('async');
var databaseObject = require('./Database.js');
var classManager = require('./ClassManager.js');
var raceManager = require('./RaceManager.js');

function Character(data, callback){
	if(data == undefined)
		return new Failed('Missing parameter');
	async.parallel([
			function(parallelCallback){
				classManager.Get(data.ClassID, function(classResult){
					parallelCallback(null, classResult)
				});
			},
			function(parallelCallback){
				raceManager.Get(data.RaceID, function(raceResult){
					parallelCallback(null, raceResult)
				});
			}
		],
		function(err, results){
			if(results.length > 1){
				var object = {};
				object.ID = data.ID;
				object.Name = data.Name;
				object.AccountAID = data.AccountAID;
				object.Experiance = data.Experiance;
				object.Age = data.Age;
				object.Height = data.Height;
				object.Strength = data.Strength;
				object.Dexterity = data.Dexterity;
				object.Constitution = data.Constitution;
				object.Inteligence = data.Inteligence;
				object.Wisdom = data.Wisdom;
				object.Charisma = data.Charisma;
				object.HP = data.HP;
				object.AC = data.AC;
				object.Initative = data.Initative
				object.Fortitude = data.Fortitude
				object.Reflex = data.Reflex;
				object.Will = data.Will;
				object.Grapple = data.Grapple;
				object.BaseAttack = data.BaseAttack;
				object.SpellResistance = data.SpellResistance;
				object.TouchAC = data.TouchAC;
				object.FlatFootedAC = data.FlatFootedAC;
				object.Class = results[0];
				object.Race = results[1];
				callback(object);
			}
		}
	);
}

function Failed(reason){
	this.Success = false;
	this.Reason = reason;
}

function Get(id, callback){
	if(id == undefined){
		callback(new Failed('Missing parameter'));
	}
	else{
		var intID = parseInt(id);
		if(intID > 0){
			databaseObject.Procedure('sp_GetCharacterByID', [intID], function(data){
				if(data.length > 0){
					Character(data[0], function(character){
						callback(character);
					});
				}
				else{
					callback(new Failed('No matching results'));
				}
			});
		}
		else{
			callback(new Failed('Invalid parameter'));
		}
	}
}

function GetByAccount(id, callback){
	if(id == undefined){
		callback(new Failed('Missing parameter'));
	}
	else{
		var intID = parseInt(id);
		if(intID > 0){
			databaseObject.Procedure('sp_GetCharacterByAccount', [intID], function(data){
				if(data.length > 0){
					//	TODO:	This needs to be recoded using a parallel statement of some sort... whats the overhead of doing something like this?
					async.map(data, function(item, eachCallback){
						Character(item, function(character){
							eachCallback(null, character);
						});
					},
					function(err, results){
						if(err != undefined){
							console.log('Error');
						}
						else{
							callback(results);
						}
					});
				}
				else{
					callback(new Failed('No matching results'));
				}
			});
		}
		else{
			callback(new Failed('Invalid parameter'));
		}
	}
}

module.exports = {
	Get: function(id, callback){
		Get(id, callback);
	},
	GetByAccount: function(id, callback){
		GetByAccount(id, callback);
	},
	FromObject: function(data, callback){
		Character(data, callback);
	},
	FromID: function(id, callback){
		//
	}
};