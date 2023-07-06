var app = angular.module("CaycanhApp", []);
app.controller("LoginCtrl", function ($scope, $http, $window, $timeout) {
    $scope.listSP = [];
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.Login = function () {
        let Login = {};
        Login.Email = $('#TaiKhoan').val();
        Login.MatKhau = $('#MatKhau').val();
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxLogin',
            datatype: 'json',
            data: JSON.stringify(Login)
        }).then(function (response) {
            if (response.data.ok == 1) {
                window.location.replace("/Admin/Index");
            }
            else {
                alert('Có lỗi');
            }
        });
    };
    
});

 



