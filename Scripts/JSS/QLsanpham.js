App.controller("AdminSanPhamCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listSP= [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;

    $scope.Item;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadDanhSach = function (page, limit) {
        $http({
            method: 'GET',
            url: 'https://localhost:44333/Sanpham/GetDanhSach/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listSP = response.data.list;
                $scope.total = response.data.total;
            } else {
               /* window.location.replace("/Admin/Login");*/
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listSP = $scope.LoadDanhSach($scope.currentPage, $scope.numPerPage);
    });

    $scope.AjaxAddSanPham = function () {
        var action = $('#btnSubmit').find('span').html();
        let sp = {};

        sp.TenSP = $('#TenSP').val();
        sp.Giamoi = $('#Giamoi').val();
        sp.Giacu = $('#Giacu').val();
        sp.Khuyenmai = $('#khuyenmai').val();
        sp.Mota = $('#mota').val();
        var file = document.getElementById('file').files[0];

        if (action === "Thêm mới") {

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: formData,
                    url: 'https://localhost:44333/Admin/Upload',
                }).then(function (res) {
                    sp.Anh = res.data;
                    $http({
                        method: 'POST',
                        url: 'https://localhost:44333/Admin/AjaxAddSanPham',
                        datatype: 'json',
                        data: JSON.stringify(sp)
                    }).then(function (response) {
                        if (response.data == 1) {
                            alert('Thêm thành công');
                            location.reload();

                        }
                        else {
                            alert('Có lỗi');
                        }
                    });
                });
            } else {
                $http({
                    method: 'POST',
                    url: 'http://localhost:51668/Admin/AjaxAddSanPham',
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
            }
        } else {
            sp.MaSP = $scope.Item.MaSP;
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: formData,
                    url: 'http://localhost:51668/Admin/Upload',
                }).then(function (res) {
                    sp.Anh = res.data;
                    $http({
                        method: 'POST',
                        url: 'http://localhost:51668/Admin/AjaxUpdateSanPham',
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
                });
            } else {
                sp.anh = $scope.Item.anh;
                $http({
                    method: 'POST',
                    url: 'http://localhost:51668/Admin/AjaxUpdateSanPham',
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
        }

    };

    $scope.Sua = function (item) {
        $scope.Item = item;
        $('#TenSP').val(item.TenSP);
        $('#Giamoi').val(item.Giamoi);
      
        $('#Giacu') = val(item.Giacu);
        $('#Khuyenmai') = val(item.khuyenmai);
        $('Mota') = val('item.mota');
        $('#btnSubmit').find('span').html('Lưu lại');
    };
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'http://localhost:51668/Admin/AjaxXoaSanPham',
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
        $('#btnSubmit').find('span').html('Thêm mới');
    }

});





