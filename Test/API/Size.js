var assert = require('assert');
var dndAPI = require('../../MageHandAPI.js');

var validUsername = 'Test1';
var validPassword = 'password';
//	TODO:	Tests
module.exports = {
	Test: function(){
	
		describe('Public functions:', function(){
			if('GetSize != undefined', function(done){
				assert.notEqual(dndAPI.GetSize, undefined);
				done();
			});
		})

		describe('GetSize:', function(){
		
			describe('Valid call:', function(){
				it('Should return Success:true', function(done){
					dndAPI.Login(validUsername, validPassword, function(loginResponse){
						dndAPI.GetSize(loginResponse.AID, loginResponse.SID, 1, function(result){
							assert.equal(result.Auth.Success, true);
							done();
						});
					});
				})
				it('Should return a Result', function(done){
					dndAPI.Login(validUsername, validPassword, function(loginResponse){
						dndAPI.GetSize(loginResponse.AID, loginResponse.SID, 1, function(result){
							assert.notEqual(result.Result, undefined);
							done();
						});
					});
				})
				it('Should return Result.ID: 1', function(done){
					dndAPI.Login(validUsername, validPassword, function(loginResponse){
						dndAPI.GetSize(loginResponse.AID, loginResponse.SID, 1, function(result){
							assert.equal(result.Result.ID, 1);
							assert.equal(result.Result.Name, 'Small');
							done();
						});
					});
				})
			})

			describe('Invalid call (missing param: "SizeID"):', function(){
				it('Should return a Result', function(done){
					dndAPI.Login(validUsername, validPassword, function(loginResponse){
						dndAPI.GetSize(loginResponse.AID, loginResponse.SID, undefined, function(result){
							assert.notEqual(result.Result, undefined);
							done();
						});
					});
				})
				it('Should return Success:false', function(done){
					dndAPI.Login(validUsername, validPassword, function(loginResponse){
						dndAPI.GetSize(loginResponse.AID, loginResponse.SID, undefined, function(result){
							assert.equal(result.Result.Success, false);
							done();
						});
					});
				})
				it('Should return a result with error information', function(done){
					dndAPI.Login(validUsername, validPassword, function(loginResponse){
						dndAPI.GetSize(loginResponse.AID, loginResponse.SID, undefined, function(result){
							assert.equal(result.Result.Success, false);
							assert.notEqual(result.Result.Reason, undefined);
							done();
						});
					});
				})
			})
		})
	}
};