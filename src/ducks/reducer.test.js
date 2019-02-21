import {resetUser, resetPlaces, addPlaceToRoute, updateProfilePic} from './reducer'
import {updateFirstName,updateLastName,updateAddress,updateCity,updateZip} from './reducer'
import { updateUsername, updatePassword } from './reducer'
import {  UPDATE_PASSWORD } from './reducer'
import axios from 'axios';

test('resetUser() should return a type of "RESET_USER"', () => {
    expect(resetUser().type).toEqual('RESET_USER')
})
test('resetPlaces() should return a type of "RESET_PLACES"', () => {
    expect(resetPlaces().type).toEqual('RESET_PLACES')
})
test('addPlaceToRoute should return a type of "RESET_PLACES" and a value of the passed in place', () => {
    expect(addPlaceToRoute('New York').type).toEqual('UPDATE_PLACES')
    expect(addPlaceToRoute('New York').payload).toEqual('New York');
})
test('updateProfilePic() should return a type of "UPDATE_PROFILE_PIC" and a payload of the passed in url', () => {
    expect(updateProfilePic('http://www.google.com').type).toEqual('UPDATE_PROFILE_PIC')
    expect(updateProfilePic('http://www.google.com').payload).toEqual('http://www.google.com')
})

test('expect values to match variable value', () => {
    expect(updateFirstName('Jeremy').payload).toEqual('Jeremy')
    expect(updateLastName('Scott').payload).toEqual('Scott')
    expect(updateAddress('555 Film St').payload).toEqual('555 Film St')
    expect(updateCity('Prosper').payload).toEqual('Prosper')
    expect(updateZip('55512').payload).toEqual('55512')
})

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
