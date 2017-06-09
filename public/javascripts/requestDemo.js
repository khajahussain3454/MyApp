var appl = angular.module('myApp', []);


appl.controller('requestDemoCtrl', function($scope, $http) {
    $scope.schoolDetails = {};
    $scope.formCheck = true;
    $scope.inValidEmail= false;
    $scope.inValidContact= false;  
    $scope.is_eligible = false;

    
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $scope.demoRequest.$setPristine();
        $scope.inValidContact = false;
        $scope.inValidEmail = false;
        $scope.schoolDetails = {};
        if($scope.formCheck === false){
            $scope.formCheck = true;
            
        }
        $scope.$apply();
    });


    $('#submitButton').on('click', function() {
                var $this = $(this);
                $this.button('loading');
             });
    $('#mobContact').focus(function(){
        $scope.inValidContact = false;
        $scope.$apply();
    });

    $('#emailid').focus(function(){
        $scope.inValidEmail = false;
        $scope.$apply();
    });

    $scope.sub = function(is_valid,is_valid_contact) {       
        if(!is_valid || !(is_valid_contact == 10)){
            $('#submitButton').button('reset');
            return false;
        }
        else{
            var schoolDetail = $scope.schoolDetails            
            $http.post('/demoRequest',$scope.schoolDetails).
            then(function(data) {
                if(data.data.length > 0){
                    if(data.data.indexOf('Email Id') > -1){
                        $('#submitButton').button('reset');
                        $scope.inValidEmail = true;
                    }
                    if(data.data.indexOf('Mobile Number') > -1){
                        $('#submitButton').button('reset');
                          $scope.inValidContact = true;
                    }
                }
                else{
                    $('#submitButton').button('reset')
                    $scope.formCheck = false;
                }
            }).catch(function(data) {
                $('#submitButton').button('reset')
                console.error(data);
            })
        }
    }
});


