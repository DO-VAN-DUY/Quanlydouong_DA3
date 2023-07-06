var app = angular.module("CaycanhApp", []);
app.controller("RegisterCtrl", function ($scope, $http, $window, $timeout) {
    $scope.AddRegister = function () {
        let sp = {};
        sp.Taikhoan = $('#Name').val();
        sp.Matkhau = $('#pass').val();
        sp.Email = $('#mail').val();
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxRegister',
            datatype: 'json',
            data: JSON.stringify(sp)
        }).then(function (response) {
            if (response.data.ok == 1) {
                alert('Đăng ký thành công');
                location.reload();
            }
            else {
                alert('Đăng ký thất bại');
            }

        });

    }
});
 






