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
        RestService.find().success(home);
})        
.controller('MyeventsCtrl', function($scope, $stateParams, RestService) {
       var home=function(data, status){
            console.log(data);
            $scope.find=data;
        };
        $scope.id="3";
        RestService.find().success(home);
})        
.controller('MyprofileCtrl', function($scope, $stateParams, RestService) {
       
})       
.controller('SponsorCtrl', function($scope, $stateParams, RestService) {
       
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

.controller('CreateeventCtrl', function($scope, $stateParams, RestService, TopicService, CategoryService) {
    //aunthenticate
        var user=function(data,status){
            console.log(data);
            $scope.organizername=data.firstname;
            $scope.form.organizer=data.id;
        };
        if(RestService.authenticate()!=false)
          {
              
          RestService.findoneuser(authenticate.id).success(user);
              console.log(authenticate);
            $scope.uid=authenticate.id;
              console.log(authenticate.id);
            $scope.isloggedin=1;
            $scope.loginlogout="Logout";
          }
    //aunthenticate
    $scope.ipath="templates/f2.php?id=event";
      $scope.form={};
     //map //###########################################Map#########################################################https://www.google.co.in/maps/search//@19.2107346,73.1063761,15z
     $scope.visible=false;
     $scope.showmap=function(){
         $scope.visible=true;
     };
     $scope.hidemap=function(){
         $scope.visible=false;
     };
     var mapp=function(data, state){
         console.log(data.results[0].geometry.location.lat);
         console.log(data.results[0].geometry.location.lng);
         $scope.form.locationlat=data.results[0].geometry.location.lat;
         $scope.form.locationlon=data.results[0].geometry.location.lng;
         
     };
     $scope.getmap=function(location,state,pin,street){
         console.log(location);
         console.log(state);
         console.log(street);
         console.log(pin);
         $scope.lmap=location+","+pin+","+state+","+street;
         console.log($scope.lmap);
         RestService.getmap($scope.lmap).success(mapp);
     };
                
     //###########################################Map#########################################################
    //########################################################################################
     $scope.form.tickets=[];
     $scope.form.category=[];
     $scope.form.topic=[];
      //$scope.total=0;
      $scope.visible=false;
     $scope.addticket=function(type){
         $scope.visible=true;
        
         $scope.userfreeticket={"name":"","qty":"","price":0,"pricetype":type};
       // $scope.userfreeticket=$scope.userfreeticket.join();
         $scope.form.tickets.push($scope.userfreeticket);
          $scope.total=$scope.form.tickets.qty;
     };
  
     
      $scope.remove=function(index){
          console.log("index:"+index);
        $scope.form.tickets.splice(index, 1);
     };
     //########################################################################################
    var topics = function (data, status) {
                $scope.topics = data;

            };
            TopicService.getmydetails().success(topics);

         var categories = function (data, status) {
             $scope.categories = data;

         };

         CategoryService.getmydetails().success(categories);
    
    // on submit
    var created = function (data, state) {
            //console.log(data);
            $scope.form.id=data;
            alert("Event Saved");
        };
    
    $scope.onsubmit = function (form) {
            console.log(form);
           // alert(form);
        form.ticketname=form.tickets[0].name;
        form.ticketqty=form.tickets[0].qty;
        form.ticketprice=form.tickets[0].price;
        form.ticketpricetype=form.tickets[0].pricetype;
        for(var i= 1;i<form.tickets.length;i++)
        {
        form.ticketname+=","+form.tickets[i].name;
        form.ticketqty+=","+form.tickets[i].qty;
        form.ticketprice+=","+form.tickets[i].price;
        form.ticketpricetype+=","+form.tickets[i].pricetype;
        }

        //form.category=form.category.join();
        //form.topic=form.topic.join();
        RestService.createevent(form).success(created);
        };
    // on submit
    
    
})

.controller('PrintticketCtrl', function($scope, $stateParams, RestService) {
    $scope.uid=$stateParams.uid;
    $scope.id=$stateParams.id;
    var printticket=function(data, status){
            console.log(data.usertickets);
          $scope.addticket=0;  
        for(var i= 0;i<data.usertickets.length;i++)
        {
        $scope.addticket=$scope.addticket+parseInt(data.usertickets[i].quantity);
        }
        console.log($scope.addticket);
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
