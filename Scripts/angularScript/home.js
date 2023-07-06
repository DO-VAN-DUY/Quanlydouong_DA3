app.controller("HomeCtrl", function ($scope, $http, $window, $timeout) {
    /*================== Danh sách các biến =================================== */
    
    $scope.listLoaiSP = {};
    $scope.listSPMoi = {};
    $scope.listSPGG = {};
    $scope.listSPGC = {};
    $scope.listtuvan = {};
    $scope.listTimkiem = {};
    $scope.total = 0;
   
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadLoaiSP = function () {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Home/GetLoaiSP',
        }).then(function (response) {
            $scope.listLoaiSP = response.data;
        });
    };
    $scope.LoadTimSP = function (TenSP) {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Timkiem/KQTimkiem/?TenSP=' + TenSP,
        }).then(function (response) {
            $scope.listTimSP = response.data;
        });
    };
  
    $scope.Loadtuvan = function () {
        $http({
            method: "GET",
            url: 'https://localhost:44342/Home/Gettuvan',
        }).then(function (response) {
            $scope.listtuvan = response.data;
        })
    };
    $scope.LoadSPMoi = function () {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Home/GetSPMoi',
        }).then(function (response) {
            $scope.listSPMoi = response.data;

            //$timeout(function () {
            //    $('.hiraola-product-tab_slider-2').slick({
            //        infinite: true,
            //        arrows: true,
            //        dots: false,
            //        speed: 2000,
            //        slidesToShow: 3,
            //        slidesToScroll: 1,
            //        prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
            //        nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
            //        responsive: [{
            //            breakpoint: 1501,
            //            settings: {
            //                slidesToShow: 3
            //            }
            //        },
            //        {
            //            breakpoint: 1200,
            //            settings: {
            //                slidesToShow: 3
            //            }
            //        },
            //        {
            //            breakpoint: 992,
            //            settings: {
            //                slidesToShow: 2
            //            }
            //        },
            //        {
            //            breakpoint: 768,
            //            settings: {
            //                slidesToShow: 2
            //            }
            //        },
            //        {
            //            breakpoint: 575,
            //            settings: {
            //                slidesToShow: 1
            //            }
            //        }
            //        ]
            //    });
            //}, 0);

        });
    };
   
    $scope.LoadSPGG = function () {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Home/GetSPGG',
        }).then(function (response) {
            $scope.listSPGG = response.data;

            //$timeout(function () {
            //    $('.hiraola-product_slider').slick({
            //        infinite: true,
            //        arrows: true,
            //        dots: false,
            //        speed: 2000,
            //        slidesToShow: 3,
            //        slidesToScroll: 1,
            //        prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
            //        nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
            //        responsive: [{
            //            breakpoint: 1501,
            //            settings: {
            //                slidesToShow: 3
            //            }
            //        },
            //        {
            //            breakpoint: 1200,
            //            settings: {
            //                slidesToShow: 3
            //            }
            //        },
            //        {
            //            breakpoint: 992,
            //            settings: {
            //                slidesToShow: 2
            //            }
            //        },
            //        {
            //            breakpoint: 768,
            //            settings: {
            //                slidesToShow: 2
            //            }
            //        },
            //        {
            //            breakpoint: 575,
            //            settings: {
            //                slidesToShow: 1
            //            }
            //        }
            //        ]
            //    });
            //}, 0);

        });
    };

    $scope.LoadSPGC = function () {
        $http({
            method: 'GET',
            url: 'https://localhost:44342/Home/GetSPGC',
        }).then(function (response) {
            $scope.listSPGC = response.data;

            //$timeout(function () {
            //    $('.hiraola-product_slider').slick({
            //        infinite: true,
            //        arrows: true,
            //        dots: false,
            //        speed: 2000,
            //        slidesToShow: 3,
            //        slidesToScroll: 1,
            //        prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
            //        nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
            //        responsive: [{
            //            breakpoint: 1501,
            //            settings: {
            //                slidesToShow: 3
            //            }
            //        },
            //        {
            //            breakpoint: 1200,
            //            settings: {
            //                slidesToShow: 3
            //            }
            //        },
            //        {
            //            breakpoint: 992,
            //            settings: {
            //                slidesToShow: 2
            //            }
            //        },
            //        {
            //            breakpoint: 768,
            //            settings: {
            //                slidesToShow: 2
            //            }
            //        },
            //        {
            //            breakpoint: 575,
            //            settings: {
            //                slidesToShow: 1
            //            }
            //        }
            //        ]
            //    });
            //}, 0);

        });
    };


    $scope.addToCart = function (sp) {
        let item = {};
        item.MaSP = sp.MaSP,
            item.MaLoai = sp.Maloai,
            item.TenSP = sp.TenSP,
            item.Anh = sp.Anh,
            item.Gia = sp.Gia,
            item.GiaKM = sp.GiaKM,
            item.Khuyenmai = sp.Khuyenmai,
            item.Mota = sp.Mota,
        item.quantity = 1;
        console.log(sp)
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of list) {
                if (x.MaSP == item.MaSP) {
                    x.quantity += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
        alert("Đã thêm giở hàng thành công");
       
    }
});


