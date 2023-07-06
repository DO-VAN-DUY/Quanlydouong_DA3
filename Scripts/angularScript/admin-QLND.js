app.controller("AdminLoginCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listND = [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;

    $scope.Item;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadDanhSach = function (page, limit) {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Admin/GetDanhSachLogin/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listND = response.data.list;
                $scope.total = response.data.total;
            } else {
                window.location.replace("/Admin/Index");
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listND = $scope.LoadDanhSach($scope.currentPage, $scope.numPerPage);
    });

    $scope.AjaxAddUS = function () {
        var action = $('#btnSubmit7').find('span').html();
        let sp = {};
        sp.Taikhoan = $('#Taikhoan').val();
        sp.Matkhau = $('#Matkhau').val();
        sp.Email = $('#mail').val();
        if (action === "Thêm mới") {

            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxAddUS',
                datatype: 'json',
                data: JSON.stringify(sp)
            }).then(function (response) {
                if (response.data.ok == 1) {
                    alert('Thêm thành công');
                    location.reload();
                }
                else {
                    alert('Có lỗi');
                }
                $scope.LoadDanhSach();
            });
            } else {
                sp.MaND= $scope.Item.MaND;
                $http({
                    method: 'POST',
                    url: 'https://localhost:44342/Admin/AjaxUpdateUS',
                    datatype: 'json',
                    data: JSON.stringify(sp)
                }).then(function (response) {
                    if (response.data.ok == 1) {
                        alert('Sửa thành công');
                        location.reload();
                    }
                    else {
                        alert('có lỗi');
                    }
                    $scope.LoadDanhSach();
                });
        }
        $scope.LoadDanhSach();
    }

    $scope.Sua = function (item) {
        $scope.Item = item;
        $('#Taikhoan').val(item.Taikhoan);
        $('#Matkhau').val(item.Matkhau);
        $('#mail').val(item.Email);
        $('#btnSubmit7').find('span').html('Lưu lại');
    };
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxXoaTaikhoan',
            datatype: 'json',
            data: JSON.stringify(item)
        }).then(function (response) {
            if (response.data == 1) {
                alert('Xóa thành công');
                location.reload();
            }
            else {
                alert('Có lỗi');
            }
        });
    };
    $scope.Reset = function () {
        $('#btnSubmit7').find('span').html('Thêm mới');
    }

});





