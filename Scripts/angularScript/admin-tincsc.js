app.controller("AdminTinCSCCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listtin = [];

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.total = 0;

    $scope.Item;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadDanhSachTLQ = function (page, limit) {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Admin/GetDanhSachTLQ/?page=' + page + '&limit=' + limit,
        }).then(function (response) {
            if (response.data != null) {
                $scope.listtin = response.data.list;
                $scope.total = response.data.total;
            } else {
                window.location.replace("/Admin/Index");
            }
        });
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.listtin = $scope.LoadDanhSachTLQ($scope.currentPage, $scope.numPerPage);
    });
    $scope.AjaxAddtin = function () {
        var action = $('#btnSubmit5').find('span').html();
        let sp = {};
        sp.MaNV = $('#Ma').val();
        sp.Tentin = $('#Tentin').val();
        sp.Noidung= $('#Noidung').val();
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
                        url: 'https://localhost:44342/Admin/AjaxAddtin',
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
                    url: 'https://localhost:44342/Admin/AjaxAddtin',
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
            sp.Matin = $scope.Item.Matin;
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
                        url: 'https://localhost:44342/Admin/AjaxUpdatetin',
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
                    url: 'https://localhost:44342/Admin/AjaxUpdatetin',
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
        $('#Ma').val(item.MaNV);
        $('#Tentin').val(item.Tentin);
        $('#Noidung').val(item.Noidung);
        $('#Anh').val(item.Anh);
        $('#btnSubmit5').find('span').html('Lưu lại');
    };
    $scope.Xoa = function (item) {
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Admin/AjaxXoatin',
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
        $('#btnSubmit5').find('span').html('Thêm mới');
    }

});





