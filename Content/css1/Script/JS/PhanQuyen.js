var Url = location.href;
var str = '';
var User = JSON.parse(localStorage.getItem('user'));
if (User.quyen == 'Admin') { //nếu giá trị quyền của item đc lưu là admin thì nó sẽ chạy if này có nghĩ là hiển thị đầy đủ chức năng 
    str += '<li '; 
    if (Url == 'http://127.0.0.1:5500/ListLoaiSanPhamQT.html') {
        str += 'class="active"';
    }
    str += ' ><a href="ListLoaiSanPhamQT.html"><i class="fa fa-cubes"></i> Loại sản phẩm</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/ListNcc.html') {
        str += 'class="active"';
    }
    str += ' ><a href="ListNcc.html"><i class="fas fa-globe"></i>Nhà cung cấp</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/Admin.html') {
        str += 'class="active"';
    }
    str += ' ><a href="Admin.html"><i class="fas fa-cookie"></i> Danh sách sản phẩm</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/QLHDN.html') { 
        str += 'class="active"';
    }
    str += ' ><a href="QLHDN.html"><i class="fas fa-file-invoice-dollar"></i> Hóa đơn nhập</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/HoaDonBanQT.html') {
        str += 'class="active"';
    }
    str += ' ><a href="HoaDonBanQT.html"><i class="fa fa-shopping-basket"></i> Hóa đơn bán</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/KhachHangQT.html') {
        str += 'class="active"';
    }
    str += ' ><a href="KhachHangQT.html"><i class="fa fa-users"></i> Quản lý khách hàng</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/ListNhanVienQT.html') {
        str += 'class="active"';
    }
    str += ' ><a href="ListNhanVienQT.html"><i class="fa fa-users"></i> Quản lý nhân viên</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/ListTinTucQT.html') {
        str += 'class="active"';
    }
    str += ' ><a href="ListTinTucQT.html"><i class="far fa-newspaper"></i> Quản lý tin tức</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/ThongKe.html') { 
        str += 'class="active"';//kiểm tra xem đường dẫn ở trên có trùng vói cái link của trang này ko
        //nếu trùng thì thêm class="active" vào thẻ li của nó
        //để phân biệt với những thẻ ko đc active
        // cụ thể khi click vào li này tboroborrder của nó sẻ chuyển thành màu xanh
    }
    str += ' ><a href="ThongKe.html"><i class="fas fa-chart-line"></i>Thống kê</a></li>';
    str += '<li '; 
    if (Url == 'http://127.0.0.1:5500/QLTonKho.html') {
        str += 'class="active"';
    }
    str += ' ><a href="QLTonKho.html"><i class="fas fa-warehouse"></i> Quản lý kho hàng</a></li>';
} 
else if (User.quyen == 'Nhân viên') { 
    str += '<li '; 
    if (Url == 'http://127.0.0.1:5500/ListLoaiSanPhamQT.html') {
        str += 'class="active"';
    }
    str += ' ><a href="ListLoaiSanPhamQT.html"><i class="fa fa-cubes"></i> Loại sản phẩm</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/ListNcc.html') {
        str += 'class="active"';
    }
    str += ' ><a href="ListNcc.html"><i class="fas fa-globe"></i>Nhà cung cấp</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/Admin.html') {
        str += 'class="active"';
    }
    str += ' ><a href="Admin.html"><i class="fas fa-cookie"></i> Danh sách sản phẩm</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/QLHDN.html') {
        str += 'class="active"';
    }
    str += ' ><a href="QLHDN.html"><i class="fas fa-file-invoice-dollar"></i> Hóa đơn nhập</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/HoaDonBanQT.html') {
        str += 'class="active"';
    }
    str += ' ><a href="HoaDonBanQT.html"><i class="fa fa-shopping-basket"></i> Hóa đơn bán</a></li>';
    str += '<li '
    if (Url == 'http://127.0.0.1:5500/KhachHangQT.html') {
        str += 'class="active"';
    }
    str += ' ><a href="KhachHangQT.html"><i class="fa fa-users"></i> Quản lý khách hàng</a></li>';
    str += '<li '; 
    if (Url == 'http://127.0.0.1:5500/QLTonKho.html') {
        str += 'class="active"';
    }
    str += ' ><a href="QLTonKho.html"><i class="fas fa-warehouse"></i> Quản lý kho hàng</a></li>';
}
document.getElementById("tabBar").innerHTML = str;