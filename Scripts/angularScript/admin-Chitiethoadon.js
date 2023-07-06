app.controller("AdminCTBCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listCTB = [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;

    $scope.Item;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadDanhSachCTB = function (page, limit) {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Admin/GetDanhSachCTHD/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listCTB = response.data.list;
                $scope.total = response.data.total;
            } else {
                window.location.replace("/Admin/Index");
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listCTB = $scope.LoadDanhSachCTB($scope.currentPage, $scope.numPerPage);
    });

    $scope.AjaxAddCTB = function () {
        var action = $('#btnSubmit8').find('span').html();
        let sp = {};
        sp.MaCTB = $('#MaCTB').val();
        sp.MaHD = $('#MaHD').val();
        sp.MaSP= $('#MaSP').val();
        sp.Soluong = $('#Soluong').val();
        if (action === "Thêm mới") {

            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxAddCTHD',
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
            });

        } else {
            sp.MaCTB = $scope.Item.MaCTB;
            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxUpdateCTHD',
                datatype: 'json',
                data: JSON.stringify(sp)
            }).then(function (response) {
                if (response.data == 1) {
                    alert('Cập nhật thành công');
                    location.reload();
                }
                else {
                    alert('Có lỗi');
                }
            });
        }

    };

    //$scope.Sua = function (item) {
    //    $scope.Item = item;

    //    $('#MaSP').val(item.MaSP);
    //    $('#Soluong').val(item.Soluong);
        

    //    $('#btnSubmit8').find('span').html('Lưu lại');
    //};
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxXoaCTHD',
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
        $('#btnSubmit8').find('span').html('Thêm mới');
    }

});





