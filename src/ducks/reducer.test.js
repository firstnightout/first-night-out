import {updateFirstName,updateLastName,updateAddress,updateCity,updateZip} from './reducer'
import axios from 'axios'

test('expect values to match variable value', () => {
    expect(updateFirstName('Jeremy').payload).toEqual('Jeremy')
    expect(updateLastName('Scott').payload).toEqual('Scott')
    expect(updateAddress('555 Film St').payload).toEqual('555 Film St')
    expect(updateCity('Prosper').payload).toEqual('Prosper')
    expect(updateZip('55512').payload).toEqual('55512')
})