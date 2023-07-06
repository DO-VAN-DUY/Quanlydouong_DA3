
function LogOut() {
    localStorage.setItem('login', null);
    window.location.href = "login.html";
}
function nameNV()
{
    var ten=JSON.parse(localStorage.getItem('QLnhanviens'));          
    for(x of ten)
    {
      $('#tennhanvien').html(x.name);
    }
}/*Xem ảnh thông tin*/
function changeImage(id)
{
 let imges_Path= document.getElementById(id).getAttribute('src');
  document.getElementById('img_main').setAttribute('src',imges_Path);
  document.getElementById("src").style.opacity=1;
}
/*cachs 2 -------------------------*/
/*$(()=>{
  $('#imgbe img').click(function()
  {
    let imgPath=$(this).attr('src');
    $('img_main').attr('src',imgPath);
  })
})*/
function trangchu() {
  window.location.href = "btl_da.html";
}
function LoadTaiKhoan() {
  var user = JSON.parse(localStorage.getItem('Customerr'));
  if (user != null) {
      document.getElementById("boxrighttop").style.display = "none";
      
  }
  else if (user == null) {
      document.getElementById("box-t").style.display = "none";
      
  }
}

function TTLogOut() {
  localStorage.setItem('Customerr', null);
  window.location.href = "btl_da.html";
}
function TTloginAdmin()
{
  window.location.href="login.html"
}
function TTloginAdmin()
{
  window.location.href="login.html"
}
function Tienhang()
{
  var tien=JSON.parse(localStorage.getItem('giohang'))
  var t=0;
  var s=0;
  for(x of tien)
  {
    t+=x.price*x.quantity;
    s=t;
    $('#tongtienhdb').html(s);
    $('#tongtienhdb1').html(s);
  }
}
function tonghoadon()
{
  var tong =JSON.parse(localStorage.getItem('Thanhtoantien'))
  var thd=0;
  thd+=
    $('#soluongHDB').html(thd);
}

