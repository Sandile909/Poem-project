var mainApp = angular.module('mainApp', ['ngRoute', 'ngAnimate']);

mainApp.config(['$routeProvider', function($routeProvider){
$routeProvider
.when('/', {
templateUrl: 'home.html'
})
.when('/admin', {
templateUrl: 'admin.html'
})
.otherwise({
redirectTo: '/'
})
}]);

mainApp.controller('mainCtrl', ['$scope', '$location', '$http', '$interval', function($scope, $location, $http, $interval){
//defaults
$interval(function(){
$http.get('https://poem-community.onrender.com/poems').then(function(response){
$scope.poems = response.data
}).catch(function(error){
console.log('getting poems error: ' + error)
})
}, 1000);
//end of defaults

//Routing
$scope.showLoginForm = false;
$scope.showSignupForm = false;
$scope.showPoemForm = false;
$scope.loginError = false;
$scope.forms = true;
$scope.showPasswordForm = false;

$scope.loginPage = function(){
$scope.showLoginForm = true;
$scope.showPoemForm = false;
$scope.showSignupForm = false;
$scope.showPasswordForm = false;
}

$scope.signupPage = function(){
$scope.showLoginForm = false;
$scope.showPoemForm = false;
$scope.showSignupForm = true;
$scope.showPasswordForm = false;
}

$scope.forgotPassword = function(){
$scope.showLoginForm = false;
$scope.showPoemForm = false;
$scope.showSignupForm = false;
$scope.showPasswordForm = true;
}

$scope.homePage = function(){
$location.path('/')
sideBar.close();
}

$scope.adminPage = function(){
$location.path('/admin')
sideBar.close();
}

$scope.developer = function(){
sideBar.close();
window.location.href = 'https://wa.me/27605683291'
}
//end of Routing

//sidebar functions
var sideBar = document.querySelector('.sideBar');
$scope.sideBarOpen = function(){
sideBar.showModal();
}

$scope.sideBarClose = function(){
sideBar.close();
}
//end of sidebar functions

//forms
$scope.loginData = {};
$scope.signupData = {};
$scope.poemData = {};
$scope.forgotPasswordData = {};

$scope.loginFormSubmit = function(){
$http.post('https://poem-community.onrender.com/login', $scope.loginData).then(function(response){
if(response.data.success){
alert('Welcome Back, ' + $scope.loginData.username)
$scope.loginError = false;
$scope.showPoemForm = true;
$scope.forms = false;
$scope.showLoginForm = false;
$scope.showSignupForm = false;
$scope.showPasswordForm = false;
}else{
$scope.loginError = true;
$scope.forms = true;
$scope.showPoemForm = false;
$scope.showPasswordForm = false;
$scope.showLoginForm = true;;
$scope.showSignupForm = false;
$scope.loginErrorMsg = response.data.message
}
}).catch(function(error){
console.log('login form error: ' + error)
})
}

$scope.signupFormSubmit = function(){
$http.post('https://poem-community.onrender.com/signup', $scope.signupData).then(function(response){
console.log('signup success ' + response.data)
$scope.showPoemForm = true;
$scope.forms = false;
$scope.showLoginForm = false;
$scope.showSignupForm = false;
$scope.showPasswordForm = false;
}).catch(function(error){
console.log('signup error: ' + error)
$scope.showPoemForm = false;
$scope.forms = true;
$scope.showLoginForm = false;
$scope.showSignupForm = true;
$scope.showPasswordForm = false;
})
}

$scope.poemFormSubmit = function(){
$http.post('https://poem-community.onrender.com/admin', $scope.poemData).then(function(response){
console.log('Poem Submitted')
$scope.showPoemForm = true;
$scope.showLoginForm = false;
$scope.showSignupForm = false;
$scope.showPasswordForm = false;
$scope.forms = false;
$scope.poemData = {};
$location.path('/')
}).catch(function(error){
console.log('Poem not submitted, ' + error)
$scope.showPoemForm = true;
$scope.showLoginForm = false;
$scope.showSignupForm = false;
$scope.showPasswordForm = false;
$scope.forms = false;
})
}

$scope.passwordFormSubmit = function() {
alert('Coming soon')
/*$http.get('https://poem-community.onrender.com/users').then(function(response) {
$scope.users = response.data;
const user = $scope.users.find((user) => user.email === $scope.forgotPasswordData.email);
if (user) {
console.log('User found:', user);
alert('Email found!');

// Send email to user
$http.post('/send-email', {
to: user.email,
subject: 'Your account information',
body: 'Here is your account information: ' + JSON.stringify(user)
}).then(function(response) {
console.log('Email sent successfully!');
alert('Email sent successfully!');
}).catch(function(error) {
console.log('Error sending email:', error);
});
} else {
alert('Email not found!');
}
}).catch(function(error) {
console.log('getting users error: ' + error);
});*/
};
//end of forms

/* end of angular*/ }]);
