var assert = require('assert');
var manager = require('../../Managers/SkillManager.js');

var blank = undefined;

module.exports = {
	Test: function(){
	
		describe('Public functions:', function(){
			it('Get != undefined', function(){
				assert.notEqual(manager.Get, undefined);
			});
			it('GetByCharacter != undefined', function(){
				assert.notEqual(manager.GetByCharacter, undefined);
			});
		})

		describe('Get:', function(){
			var valid = 1;
			var invalid = 0;
			var invalidFormat = 'invalid';

			describe('Valid:', function(){
				it('Result != undefined', function(done){
					manager.Get(valid, function(result){
						assert.notEqual(result, undefined);
						done();
					});
				})
				it('Reason == undefined', function(done){
					manager.Get(valid, function(result){
						assert.equal(result.Reason, undefined);
						done();
					});
				})
				it('Valid', function(done){
					manager.Get(valid, function(result){	
						assert.notEqual(result.ID, undefined);	
						assert.notEqual(result.Name, undefined);
						done();
					});
				})
			})
		
			describe('Invalid "ID" Value:', function(){
				it('Result != undefined', function(done){
					manager.Get(invalid, function(result){
						assert.notEqual(result, undefined);
						done();
					});
				})
				it('Reason != undefined', function(done){
					manager.Get(invalid, function(result){
						assert.notEqual(result.Reason, undefined);
						done();
					});
				})
				it('Valid', function(done){
					manager.Get(invalid, function(result){	
						assert.equal(result.ID, undefined);
						assert.equal(result.Name, undefined);
						done();
					});
				})
			})
		
			describe('Invalid "ID" Format:', function(){
				it('Result != undefined', function(done){
					manager.Get(invalidFormat, function(result){
						assert.notEqual(result, undefined);
						done();
					});
				})
				it('Reason != undefined', function(done){
					manager.Get(invalidFormat, function(result){
						assert.notEqual(result.Reason, undefined);
						done();
					});
				})
				it('Valid', function(done){
					manager.Get(invalidFormat, function(result){	
						assert.equal(result.ID, undefined);
						assert.equal(result.Name, undefined);
						done();
					});
				})
			})
		
			describe('Missing "ID":', function(){
				it('Result != undefined', function(done){
					manager.Get(blank, function(result){
						assert.notEqual(result, undefined);
						done();
					});
				})
				it('Reason != undefined', function(done){
					manager.Get(blank, function(result){
						assert.notEqual(result.Reason, undefined);
						done();
					});
				})
				it('Valid', function(done){
					manager.Get(blank, function(result){	
						assert.equal(result.ID, undefined);
						assert.equal(result.Name, undefined);
						done();
					});
				})
			})
		})

		describe('GetByCharacter:', function(){
			var valid = 1;
			var invalid = 0;
			var invalidFormat = 'invalid';

			describe('Valid:', function(){
				it('Result != undefined', function(done){
					manager.GetByCharacter(valid, function(result){
						assert.notEqual(result, undefined);
						done();
					});
				})
				it('Result == array', function(done){
					manager.GetByCharacter(valid, function(result){
						assert.equal(result.length > 0, true);
						done();
					});
				})
				it('Valid', function(done){
					manager.GetByCharacter(valid, function(result){
						assert.notEqual(result[0].CharacterID, undefined);
						assert.notEqual(result[0].Skill, undefined);
						assert.notEqual(result[0].Ranks, undefined);
						assert.notEqual(result[0].Info, undefined);
						assert.notEqual(result[0].MiscModifier, undefined);
						done();
					});
				})
			})
		
			describe('Invalid "ID" Value:', function(){
				it('Result != undefined', function(done){
					manager.GetByCharacter(invalid, function(result){
						assert.notEqual(result, undefined);
						done();
					});
				})
				it('Success == false', function(done){
					manager.GetByCharacter(invalid, function(result){
						assert.equal(result.Success, false);
						done();
					});
				})
				it('Reason != undefined', function(done){
					manager.GetByCharacter(invalid, function(result){
						assert.notEqual(result.Reason, undefined);
						done();
					});
				})
			})
		
			describe('Invalid "ID" Format:', function(){
			})
		
			describe('Missing "ID":', function(){
			})
		})
	}
};