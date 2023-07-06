app.controller("AdminLoaiSanPhamCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listLSP = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;

    $scope.Item;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadDanhSachLoai = function (page, limit) {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Admin/GetDanhSachLoai/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listLSP = response.data.list;
                $scope.total = response.data.total;
            } else {
                window.location.replace("/Admin/Index");
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listLSP = $scope.LoadDanhSachLoai($scope.currentPage, $scope.numPerPage);
    });

    $scope.AjaxAddLoaiSP = function () {
        var action = $('#btnSubmit1').find('span').html();
        let sp = {};
        sp.Tenloai = $('#Tenloai').val();
        sp.Ghichu = $('#Ghichu').val();
        if (action === "Thêm mới") {

            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxAddLoaiSP',
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
            sp.Maloai = $scope.Item.Maloai;
            $http({
                method: 'POST',
                url: 'https://localhost:44342/Admin/AjaxUpdateLoaiSP',
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
        $('#Tenloai').val(item.Tenloai);
        $('#Ghichu').val(item.Ghichu);
        $('#btnSubmit1').find('span').html('Lưu lại');
    };
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxXoaLoaiSP',
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
        $('#btnSubmit1').find('span').html('Thêm mới');
    }

});





