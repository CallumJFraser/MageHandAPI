var assert = require('assert');
/*
	
*/
var dndAPI = require('../DnDAPI.js');
var validUsername = 'Test1';
var validPassword = 'password';
var authObject = {
	AID: 1,
	SessionID: '',
	Username: validUsername
};
	
describe('GetCharacter:', function(){
	beforeEach(function(done){
		dndAPI.Start(function(){
			done();
		});
	})

	describe('Valid call:', function(){
		it('Should return a Result', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetCharacter(authObject, 1, function(result){
					assert.notEqual(result.Result, undefined);
					done();
				});
			});
		})
		it('Should not return Success:false', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetCharacter(authObject, 1, function(result){
					assert.notEqual(result.Result.Success, false);
					done();
				});
			});
		})
		it('Should return a valid Result', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetCharacter(authObject, 1, function(result){
					var resultObject = result.Result;
					assert.equal(result.Result.ID, 1);
					assert.equal(resultObject.Name, 'Test');
					assert.equal(resultObject.ClassID, 1);
					assert.equal(resultObject.Experiance, 4500);
					assert.equal(resultObject.RaceID, 1);
					assert.equal(resultObject.Age, 100);
					assert.equal(resultObject.Height, 100);
					assert.equal(resultObject.Strength, 10);
					assert.equal(resultObject.Dexterity, 14);
					assert.equal(resultObject.Constitution, 10);
					assert.equal(resultObject.Inteligence, 10);
					assert.equal(resultObject.Wisdom, 10);
					assert.equal(resultObject.Charisma, 19);
					assert.equal(resultObject.HP, 20);
					assert.equal(resultObject.AC, 18);
					assert.equal(resultObject.Fortitude, 3);
					assert.equal(resultObject.Reflex, 3);
					assert.equal(resultObject.Will, 3);
					assert.equal(resultObject.Grapple, 2);
					assert.equal(resultObject.BaseAttack, 3);
					assert.equal(resultObject.SpellResistance, 10);
					assert.equal(resultObject.TouchAC, 18);
					assert.equal(resultObject.FlatFootedAC, 15);
					done();
				});
			});
		})
	})

	describe('Invalid call (missing param: "CharacterID"):', function(){
		it('Should return a Result', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetCharacter(authObject, undefined, function(result){
					assert.notEqual(result.Result, undefined);
					done();
				});
			});
		})
		it('Should return Success:false', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetCharacter(authObject, undefined, function(result){
					assert.equal(result.Result.Success, false);
					done();
				});
			});
		})
		it('Should return a valid Result', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetCharacter(authObject, undefined, function(result){
					assert.equal(result.Result.Success, false);
					assert.notEqual(result.Result.Reason, undefined);
					done();
				});
			});
		})
	})
})
	
describe('GetAccountCharacters:', function(){
	beforeEach(function(done){
		dndAPI.Start(function(){
			done();
		});
	})

	describe('Valid call:', function(){
		it('Should return a Result', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetAccountCharacters(authObject, 1, function(result){
					assert.notEqual(result.Result, undefined);
					done();
				});
			});
		})
		it('Should return a Result array', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetAccountCharacters(authObject, 1, function(result){
					assert.equal(result.Result.length, 2);
					done();
				});
			});
		})
		it('Should return Success:true in results', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetAccountCharacters(authObject, 1, function(result){
					assert.equal(result.Result[0].Success, true);
					done();
				});
			});
		})
		it('Should return a valid Result', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetAccountCharacters(authObject, 1, function(result){
					var resultObject = result.Result[0];
					assert.equal(resultObject.ID, 1);
					assert.equal(resultObject.Name, 'Test');
					assert.equal(resultObject.ClassID, 1);
					assert.equal(resultObject.Experiance, 4500);
					assert.equal(resultObject.RaceID, 1);
					assert.equal(resultObject.Age, 100);
					assert.equal(resultObject.Height, 100);
					assert.equal(resultObject.Strength, 10);
					assert.equal(resultObject.Dexterity, 14);
					assert.equal(resultObject.Constitution, 10);
					assert.equal(resultObject.Inteligence, 10);
					assert.equal(resultObject.Wisdom, 10);
					assert.equal(resultObject.Charisma, 19);
					assert.equal(resultObject.HP, 20);
					assert.equal(resultObject.AC, 18);
					assert.equal(resultObject.Fortitude, 3);
					assert.equal(resultObject.Reflex, 3);
					assert.equal(resultObject.Will, 3);
					assert.equal(resultObject.Grapple, 2);
					assert.equal(resultObject.BaseAttack, 3);
					assert.equal(resultObject.SpellResistance, 10);
					assert.equal(resultObject.TouchAC, 18);
					assert.equal(resultObject.FlatFootedAC, 15);
					done();
				});
			});
		})
	})

	describe('Invalid call (missing param: "AccountAID"):', function(){
		it('Should return Success:false', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetAccountCharacters(authObject, undefined, function(result){
					assert.equal(result.Result.Success, false);
					done();
				});
			});
		})
			//	40
		it('Should return a Result', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetAccountCharacters(authObject, undefined, function(result){
					assert.notEqual(result.Result, undefined);
					done();
				});
			});
		})
		it('Should return a valid Result', function(done){
			dndAPI.Login(validUsername, validPassword, function(loginResponse){
				authObject.SessionID = loginResponse.SessionID;
				dndAPI.GetAccountCharacters(authObject, undefined, function(result){
					assert.equal(result.Result.Success, false);
					assert.notEqual(result.Result.Reason, undefined);
					done();
				});
			});
		})
	})
})