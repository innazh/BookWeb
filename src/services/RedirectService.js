export const redirectSignIn = function (props) {
	props.history.push('/signin');
}

export const redirectSignUp = function (props) {
	props.history.push('/signup');
}

export const redirectBooks = function (props) {
	props.history.push('/books');
}

export const redirectAddBook = function (props) {
	props.history.push('/addbook');
}

export const redirectHome = function (props) {
	props.history.push('/home');
}