var databaseObject = require('./Database.js');

function Version(row){
	if(row == undefined)
		return new Failed('Missing parameter');

	this.ID = row.ID;
	this.Name = row.Name;
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
			databaseObject.Procedure('sp_GetVersion', [intID], function(rows){
				if(rows.length > 0){
					var value = new Version(rows[0]);
					callback(value);
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
	Get: function (id, callback){
		Get(id, callback);
	},
	FromObject: function(row){
		return new Version(row);
	},
	FromID: function(id, callback){
		//
	}
};