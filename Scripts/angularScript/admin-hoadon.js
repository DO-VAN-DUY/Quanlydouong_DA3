app.controller("AdminHoadonCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listHD = [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;

    $scope.Item;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadDanhSach = function (page, limit) {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Admin/GetDanhSachHD/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listHD = response.data.list;
                $scope.total = response.data.total;
            } else {
                window.location.replace("/Admin/Index");
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listHD = $scope.LoadDanhSach($scope.currentPage, $scope.numPerPage);
    });

    $scope.AjaxAddHD = function () {
        var action = $('#btnSubmit6').find('span').html();
        let sp = {};
        sp.Hoten = $('#HoTen').val();
        sp.NgaylapHD = $('#ngaylap').val();
        sp.Diachi = $('#Diachi').val();
        if (action === "Thêm mới") {

            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxAddHD',
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
            sp.MaHD = $scope.Item.MaHD;
            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxUpdateHD',
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

    $scope.Sua = function (item) {
        $scope.Item = item;
        $('#HoTen').val(item.Hoten);
        $('#ngaylap').val(item.NgaylapHD);
        $('#Diachi').val(item.Diachi);

        $('#btnSubmit6').find('span').html('Lưu lại');
    };
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxXoaHD',
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
        $('#btnSubmit6').find('span').html('Thêm mới');
    }

});





