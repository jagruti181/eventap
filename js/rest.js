var adminurl="http://digitalmindsinc.co/eglapp11/admin/index.php/";
var apiServer ="http://digitalmindsinc.co/eglapp11/admin/index.php/";
var restservicemod = angular.module('restservicemod', [])
.factory('RestService',function($http)
{
    var demovar="hello";
	return {
		login:function(user,password){
            return $http.get(adminurl+"user/login?email="+user+"&password="+password,{});
        },
        authenticate: function(){
            var authenticate=$.jStorage.get('authenticate');
            if(authenticate)
            {
                return authenticate;
            }
            else
            {
                return false;
            }
        },
        getmap: function(data){
            return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+data+"&key=AIzaSyAj0OXepKIgjTlZiPe_ZVYTDjL8rYpobgQ",{});
        },
        findoneuser: function (data) {
            return $http.get(adminurl+"user/findone",{params: {id:data}});
        },
        logout: function () {
            $.jStorage.flush();
            return $http.get(adminurl+"user/logout",{});
        },
        findcategoryevent: function (id) {
            return $http.get(adminurl+"category/findalleventbycategory",{params: {category:id}});
        },
        find: function (data) {
            return $http.get(adminurl+"event/find",{});
        },
        findone: function (data) {
            return $http.get(adminurl+"event/findone?id="+data,{});
        },
        getuserticket: function (user) {
            return $http.get(adminurl+"order/viewalleventsbookedbyuser?user="+user,{});
        },
        printticket: function (id,eid) {
            return $http.get(adminurl+"order/viewticket?user="+id+"&event="+eid,{});
        },
        savedevents: function (uid,id) {
            return $http.get(adminurl+"event/savedevents?user="+uid+"&event="+id,{});
        },
        getsavedevents: function (uid) {
            return $http.get(adminurl+"event/getsavedevents?user="+uid,{});
        },
        createevent: function (data) {
            return $http({
                url: 'http://digitalmindsinc.co/eglapp11/admin/index.php/event/create',
                method: "POST",
               data: {'title':data.title,
                      'locationlat':data.locationlat,
                      'locationlon':data.locationlon,
                      'venue':data.venue,
                      'location':data.location,
                      'startdate':data.startdate,
                      'enddate':data.enddate,
                      'description':data.description,
                      'organizer':data.organizer,
                      'listingtype':data.listingtype,
                      'showremainingticket':data.showremainingticket,
                      'logo':data.logo,
                      'category':data.category,
                      'topic':data.topic,
                      'starttime':data.starttime,
                      'endtime':data.endtime,
                      'ticketname':data.ticketname,
                      'ticketqty':data.ticketqty,
                      'ticketprice':data.ticketprice,
                      'ticketpricetype':data.ticketpricetype,
                      'email':data.email,
                      'publicemail':data.publicemail,
                      'state':data.state,
                      'pin':data.pin,
                      'street':data.street,
                      'city':data.city,
                      'above18':data.above18,
                      'sponsorship':data.sponsorship}
            });
        },
        saveticket: function (user,event,ticketid,ticketquantity) {
            return $http.get(adminurl+"order/create?user="+user+"&event="+event+"&ticketid="+ticketid+"&ticketquantity="+ticketquantity,{});
        }
    }
});


restservicemod.factory('TopicService', function ($http) {


    return {
        getmydetails: function () {
            return $http.get(apiServer+"topic/find",{})
        },
        createevent: function (data) {
            return $http.get(adminurl+"event/create",{params:data});
        }
    }
});

restservicemod.factory('CategoryService', function ($http) {


    return {
        getmydetails: function () {
            return $http.get(apiServer+"category/find",{})
        },
        findone: function(data){
            return $http.get(adminurl+"category/findone?id="+data,{});
        }
    }
});


