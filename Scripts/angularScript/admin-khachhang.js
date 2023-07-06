app.controller("AdminKhachhangCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listKH = [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;

    $scope.Item;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadDanhSachKH = function (page, limit) {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Admin/GetDanhSachKH/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listKH = response.data.list;
                $scope.total = response.data.total;
            } else {
                window.location.replace("/Admin/Index");
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listKH = $scope.LoadDanhSachKH($scope.currentPage, $scope.numPerPage);
    });

    $scope.AjaxAddKH = function () {
        var action = $('#btnSubmit4').find('span').html();
        let sp = {};
        sp.TenKH = $('#TenKH').val();
        sp.DiachiKH = $('#DiachiKH').val();
        sp.SDTKH = $('#SDTKH').val();
        sp.Email = $('#mail').val();
        if (action === "Thêm mới") {

            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxAddKH',
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
            sp.MaKH = $scope.Item.MaKH;
            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxUpdateKH',
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
        $('#TenKH').val(item.TenKH);
        $('#DiachiKH').val(item.DiachiKH);
        $('#SDTKH').val(item.SDTKH);
        $('#mail').val(item.Email);

        $('#btnSubmit4').find('span').html('Lưu lại');
    };
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxXoaKH',
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
        $('#btnSubmit4').find('span').html('Thêm mới');
    }

});





