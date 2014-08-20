var adminurl="http://digitalmindsinc.co/eglapp11/admin/index.php/";
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
        logout: function () {
            $.jStorage.flush();
            return $http.get(adminurl+"user/logout",{});
        },
        findcategoryevent: function (id) {
            return $http.get(adminurl+"category/findalleventbycategory",{params: {category:id}});
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
        saveticket: function (user,event,ticketid,ticketquantity) {
            return $http.get(adminurl+"order/create?user="+user+"&event="+event+"&ticketid="+ticketid+"&ticketquantity="+ticketquantity,{});
        }
    }
});


