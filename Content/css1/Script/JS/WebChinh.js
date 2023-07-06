var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");//lấy về 1 tập các element có class là mySlide
  for (i = 0; i < slides.length; i++) { //duyệt từng element
    slides[i].style.display = "none"; //cho từng cái display = none
  }
  slideIndex++;//bắt đầu chạy từ slideIndex
  if (slideIndex > slides.length) {//nếu vượt quá length của tập element thì cho quay về ảnh thứ 2
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block"; //cái ảnh trước sẽ được hiển thị nghĩa là ảnh đầu tiên
  setTimeout(showSlides, 2000); // Change image every 2 second: vòng lặp lại để hiển thị ảnh theo thời gian thôi cụ thể là 2000 mini s cứ 2000 thì ản hiện 1 ảnh
}

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

function LogOut() {
  localStorage.setItem('user', null);
  localStorage.setItem('usernv', null);
  window.location.href = "WebLogIn.html";
}

function LogOutKH() {
  localStorage.setItem('userkh', null);
  window.location.href = "TrangChu.html";
}

var count = 0;
function AddKhachHang() {
  var KhachHangList = JSON.parse(localStorage.getItem('khachhang'));
  if (KhachHangList == null) KhachHangList = [];
  else KhachHangList = JSON.parse(localStorage.getItem('khachhang'));
  //var index = document.getElementById('index').value
  var txt_hoten = document.getElementById('txt_hoten').value
  var txt_date = document.getElementById('txt_date').value
  var txt_gioitinh = document.getElementById('txt_gioitinh').value
  var txt_email = document.getElementById('txt_email').value
  var txt_UserName = document.getElementById('txt_UserName').value
  var txt_pass = document.getElementById('txt_pass').value
  var txt_dchi = document.getElementById('txt_dchi').value
  var txt_dienthoai = document.getElementById('txt_dienthoai').value
  var khachhang = {
    'txt_hoten': txt_hoten,
    'txt_date': txt_date,
    'txt_gioitinh': txt_gioitinh,
    'txt_email': txt_email,
    'txt_UserName': txt_UserName,
    'txt_pass': txt_pass,
    'txt_dchi': txt_dchi,
    'txt_dienthoai': txt_dienthoai
  }

  KhachHangList.push(khachhang)
  localStorage.setItem('khachhang', JSON.stringify(KhachHangList))
  showKhachHang();
}

function showKhachHang() {
  var KhachHangList = JSON.parse(localStorage.getItem('khachhang'));
  if (KhachHangList == null) KhachHangList = [];
  else KhachHangList = JSON.parse(localStorage.getItem('khachhang'));
  var str = "";
  var n = 0;
  if (KhachHangList.length > 0)
    for (var i = 0; i < KhachHangList.length; i++) {
      str += `<tr>
						<td>${i + 1}</td>
					  <td>${i + 1}</td>
						<td>${KhachHangList[i].txt_hoten}</td>
						<td>${KhachHangList[i].txt_date}</td>
						<td>${KhachHangList[i].txt_gioitinh}</td>						
						<td>${KhachHangList[i].txt_email}</td>          
            <td>${KhachHangList[i].txt_UserName}</td>
            <td>${KhachHangList[i].txt_pass}</td>
            <td>${KhachHangList[i].txt_dchi}</td>
            <td>${KhachHangList[i].txt_dienthoai}</td>
						<td><button class="btn btn-danger" onclick="deleteKhachHang(event)"><i class="fa fa-trash" style="color:blue"></button></td>
					</tr>`;
    }
  document.getElementById("bodykh").innerHTML = str;
}


function searchNameKH() {
  window.localStorage.removeItem('searchKH'); // xóa local có tên searhKH để tránh bị lặp lại ký tự đã tìm
  var searchKH = JSON.parse(localStorage.getItem('searchKH'));
  if (searchKH == null) searchKH = [];
  else searchKH = JSON.parse(localStorage.getItem('searchKH'));


  var keySearchKH = document.getElementById('keySearchKH').value; // lấy giá trị value đã đc nhập trong text có id là keySearchKH
  var KhachHangList = JSON.parse(localStorage.getItem('khachhang'));
  if (KhachHangList == null) KhachHangList = [];
  else KhachHangList = JSON.parse(localStorage.getItem('khachhang'));
  var str = "";
  if (KhachHangList.length > 0) {
    for (var i = 0; i < KhachHangList.length; i++) {
      if (KhachHangList[i].txt_hoten.search(new RegExp(keySearchKH, "i")) >= 0) { //tìm kiếm chuỗi con có tên keySearchKh trong chuỗi cha có tên KhachHangList[i].txt_hoten
        //new RegExp là bỏ qua ký tự hoa thường đều tìm đc
        //nếu tìm thấy chuỗi tồn tại trong chuỗi cha kết quả trả ra sẽ là vị trí của chuỗi con
        // nên nếu tìm thấy thì mặc định sẽ >= 0 còn không thấy sẽ trả lại giá trị -1
        searchKH.push(KhachHangList[i]);
        localStorage.setItem('searchKH', JSON.stringify(searchKH));
      }

    }
  }
  var searchKH = JSON.parse(localStorage.getItem('searchKH'));
  if (searchKH) {
    for (var i = 0; i < searchKH.length; i++) {
      str += `<tr>
      <td>${i + 1}</td>
      <td>${i + 1}</td>
      <td>${searchKH[i].txt_hoten}</td>
      <td>${searchKH[i].txt_date}</td>
      <td>${searchKH[i].txt_gioitinh}</td>						
      <td>${searchKH[i].txt_email}</td>          
      <td>${searchKH[i].txt_UserName}</td>
      <td>${searchKH[i].txt_pass}</td>
      <td>${searchKH[i].txt_dchi}</td>
      <td>${searchKH[i].txt_dienthoai}</td>
      <td><button class="btn btn-danger" onclick="deleteKhachHang(event)"><i class="fa fa-trash" style="color:blue"></button></td>
    </tr>`;
    }
  }

  document.getElementById("bodykh").innerHTML = str;
}

