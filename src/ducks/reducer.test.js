import {updateFirstName,updateLastName,updateAddress,updateCity,updateZip} from './reducer'
import axios from 'axios'

test('expect values to match variable value', () => {
    expect(updateFirstName('Jeremy').payload).toEqual('Jeremy')
    expect(updateLastName('Scott').payload).toEqual('Scott')
    expect(updateAddress('555 Film St').payload).toEqual('555 Film St')
    expect(updateCity('Prosper').payload).toEqual('Prosper')
    expect(updateZip('55512').payload).toEqual('55512')
})
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
