var mypopup=0;
var authenticate=$.jStorage.get("authenticate");

angular.module('starter.controllers', ['restservicemod'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, RestService) {
  // Form data for the login modal
  $scope.loginData = {};
   $scope.loginlogout="Login";
    $scope.isloggedin=0;
    //authentication
    
        if(RestService.authenticate()!=false)
          {
            //$scope.uid=data.id;
             // console.log(data.id);
            $scope.isloggedin=1;
            $scope.loginlogout="Logout";
          }
        
    //authentication
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
      if($scope.isloggedin==0)
      {
        $scope.modal.show();
      }else{
          var logout=function(data, status){
            $scope.loginlogout="Login";
            $scope.isloggedin=0;
          };
        RestService.logout().success(logout);
      }
  };

  // Perform the login action when the user submits the login form
    var loginn=function(data, status){
       $.jStorage.set('authenticate',data);
        authenticate=$.jStorage.get('authenticate');
        console.log(authenticate.id);
        $scope.isloggedin=1;
            $scope.loginlogout="Logout";
    };
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
      RestService.login($scope.loginData.username,$scope.loginData.password).success(loginn);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('RegisterEvent',function($scope, $ionicPopup, $timeout, $stateParams, RestService) {
    // Pop up for event registered
    $scope.id=$stateParams.id;
    $scope.uid=$stateParams.uid;
    var find= function (data, status) {
            console.log(data);
             
             $scope.event = data;
            console.log($scope.event.tickets[0].id)
        };
    RestService.findone($stateParams.id).success(find);
    
    var ticketsaved=function(data, status){
            console.log(data);
            alert("ticketsaved");
        mypopup = $ionicPopup.show({
            title: 'See you at the event',
            template: '<div class="text-center"><h1 class="ion-ios7-checkmark balanced"></h1>            <p>Registration Complete</p>            <div class="padding">                <button class="button button-block button-light">Discover more events</button>                <button class="button button-block button-stable">View Tickets</button>            </div>        </div>'
        });
        $timeout(function() {
      mypopup.close();
    }, 1000);
        };
    $scope.eventRegistered = function() {
        RestService.saveticket($stateParams.uid,$stateParams.id,$scope.event.tickets[0].id,1).success(ticketsaved);
       /* */
        
        
    };
    
})
        
.controller('DiscoverCtrl', function($scope, $stateParams, RestService) {
        var home=function(data, status){
            console.log(data);
            $scope.find=data;
        };
        $scope.id="3";
        RestService.findcategoryevent($scope.id).success(home);
})

.controller('DiscoverinnerCtrl', function($scope, $stateParams, RestService) {
        $scope.id=$stateParams.id;
        console.log($scope.id);
    
    //aunthenticate
       
        if(RestService.authenticate()!=false)
          {
              console.log(authenticate);
            $scope.uid=authenticate.id;
              console.log(authenticate.id);
            $scope.isloggedin=1;
            $scope.loginlogout="Logout";
          }
        
    //aunthenticate
    
        var find= function (data, status) {
            console.log(data);
             $scope.event = data;
        };
        
            RestService.findone($stateParams.id).success(find);
    //savedevents#########################3
        var saved=function(data, status){
            if(data==1)
            {
                alert("Event Saved");
            }else{
                alert("Already Saved");
            }
        };
        $scope.saveevent=function(){
            RestService.savedevents($scope.uid,$scope.id).success(saved);
        };
    //savedevents#########################3
})

.controller('MyticketsCtrl', function($scope, $stateParams, RestService) {
    $scope.loginlogout="Login";
    $scope.isloggedin=0;
    var userticket=function(data,status){
           console.log(data);
           $scope.data=data;
       };
    
    
    if(RestService.authenticate()!=false)
          {
           // $scope.uid=data.id;
              RestService.getuserticket(authenticate.id).success(userticket);
              console.log(authenticate.id);
            $scope.isloggedin=1;
            $scope.loginlogout="Logout";
          }
        
    
})

.controller('CreateeventCtrl', function($scope, $stateParams, RestService) {
    
})

.controller('PrintticketCtrl', function($scope, $stateParams, RestService) {
    $scope.uid=$stateParams.uid;
    $scope.id=$stateParams.id;
    var printticket=function(data, status){
            console.log(data);
            $scope.printticket=data;
        };
    RestService.printticket($stateParams.uid,$stateParams.id).success(printticket);
})

.controller('SavedeventsCtrl', function($scope, $stateParams, RestService) {
    //aunthenticate
        var getevents=function(data, status){
        console.log(data);
        $scope.uevent=data;
        };
        if(RestService.authenticate()!=false)
          {
            $scope.uid=authenticate.id;
              console.log(authenticate.id);
              RestService.getsavedevents(authenticate.id).success(getevents);
            $scope.isloggedin=1;
            $scope.loginlogout="Logout";
          }
    //aunthenticate
    
    
});
