import {resetUser, resetPlaces, addPlaceToRoute, updateProfilePic} from './reducer'
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