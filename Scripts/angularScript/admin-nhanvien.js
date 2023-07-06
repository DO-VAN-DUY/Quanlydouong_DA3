app.controller("AdminNhanVienCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listNV = [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
   

    $scope.Item;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadDanhSachNV = function (page, limit) {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Admin/GetDanhSachNV/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listNV = response.data.list;
                $scope.total = response.data.total;
            } else {
                window.location.replace("/Admin/Index");
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listNV = $scope.LoadDanhSachNV($scope.currentPage, $scope.numPerPage);
    });

    $scope.AjaxAddNV = function () {
        var action = $('#btnSubmit2').find('span').html();
        let sp = {};
        sp.TenNV = $('#TenNV').val();
        sp.SDTNV = $('#SDT').val();
        sp.DiachiKH = $('#Diachi').val();
        sp.Email = $("#mail").val();
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
                    url: 'https://localhost:44342/Admin/Upload',
                }).then(function (res) {
                    sp.Anh = res.data;
                    $http({
                        method: 'POST',
                        url: 'https://localhost:44342/Admin/AjaxAddNV',
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
                    url: 'https://localhost:44342/Admin/AjaxAddNV',
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
            sp.MaNV = $scope.Item.MaNV;
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: formData,
                    url: 'https://localhost:44342/Admin/UploadNV',
                }).then(function (res) {
                    sp.Anh = res.data;
                    $http({
                        method: 'POST',
                        url: 'https://localhost:44342/Admin/AjaxUpdateNV',
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
                sp.Anh = $scope.Item.Anh;
                $http({
                    method: 'POST',
                    url: 'https://localhost:44342/Admin/AjaxUpdateNV',
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
        $('#TenNV').val(item.TenNV);
        $('#SDT').val(item.SDTNV)
        $('#Diachi').val(item.DiachiKH);
        $('#mail').val(item.Email);
        $('#btnSubmit2').find('span').html('Lưu lại');
    };
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxXoaNV',
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
        $('#btnSubmit2').find('span').html('Thêm mới');
    }

});





