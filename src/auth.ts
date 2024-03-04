import {v4 as uuidv4} from 'uuid'

class Auth {
	constructor() {}

	create_session() {
		return uuidv4()
	}
}

function authenticateUser() {

}
export default Auth