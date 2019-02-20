import { updateUsername, updatePassword } from './reducer'
import {  UPDATE_PASSWORD } from './reducer'

test('updateUsername(username) should return "UPDATE_USENAME"', function(){
    expect(updateUsername().type).toEqual('UPDATE_USERNAME');
});

test('updatePassword(password) should return "UPDATE_PASSWORD"',function(){
    expect(updatePassword().type).toEqual('UPDATE_PASSWORD');
});

test('Type should equal "UPDATE_PASSWORD"', function(){
    expect('UPDATE_PASSWORD').toEqual('UPDATE_PASSWORD');
});

test('Type should equal "UPDATE_PASSWORD"', function(){
    expect('UPDATE_PASSWORD').toEqual('UPDATE_PASSWORD');
});
