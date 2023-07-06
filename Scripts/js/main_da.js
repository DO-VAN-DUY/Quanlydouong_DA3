$(document).ready(function name(params) {
    var stt=0;
    strarImg=$("img.slide:first").attr("stt");
    endImg=$("img.slide:last").attr("stt");
    $("img.slide").each(function () {
        if($(this).is(':visible'))
            stt=$(this).attr("stt");
    });
    $("#next").click(function() {
            
              next = ++stt;
              if(stt==endImg)
              {
                  stt=-1;
              }
              $("img.slide").hide();
              $("img.slide").eq(next).show();     
    });
    $("#prev").click(function() {
        if(stt==0)
        {
            stt=endImg;
            prev=stt++;
        }
        prev = --stt;
        $("img.slide").hide();
        $("img.slide").eq(prev).show();    
    }); 
    setInterval(function name(params) {
              $("#next").click();
    },5000);
})
 /* Đổi ảnh phản hồi*/
$(document).ready(function name(params) {
    var stt=0;
    strarImg=$("div.tents:first").attr("stt");
    endImg=$("div.tents:last").attr("stt");
    $("div.tents").each(function () {
        if($(this).is(':visible'))
            stt=$(this).attr("stt");
    });
    $(".Showleft").click(function() {
                
            next = ++stt;
            if(stt==endImg)
            {
                stt=-1;
            }
            $("div.tents").hide();
            $("div.tents").eq(next).show();     
    });
    $(".Showright").click(function() {
    if(stt==0)
    {
        stt=endImg;
        prev=stt++;
    }
    prev = --stt;
    $("div.tents").hide();
    $("div.tents").eq(prev).show();    
    }); 
    setInterval(function name(params) {
              $(".Showleft").click();
    },4000);
})


$(document).ready(function()
{
  $("#toggle").click(function()
  {
    $('nav').slideToggle(2000);
  })
})
$(document).ready(function()
{
  $("#tog").click(function()
  {
    $('.submenu').slideToggle(2000);
  })
})
function addToCart(item) {
    debugger;  
    var addToCartButtons = document.getElementsByClassName('sanpham');  //trả về một tập      
        item.quantity=1;
        console.log(item.quantity);//sẽ in ra tất cả các giá trị 
        var list;
        if (localStorage.getItem('sanpham') == null) {// trả về giá trị của mục Đối tượng lưu trữ được chỉ định nếu =null
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('sanpham')) || [];
        let ok = true;
        for (let x of list) {
            if (x.id == item.id) {
            x.quantity += 1;
            ok = false;
            break;
            }
        }
        if(ok){
            list.push(item); 
        } 
        localStorage.setItem('sanpham',JSON.stringify(list));
        }
    var addToCartButtons = document.getElementsByClassName('giohang');        
    item.quantity=1;
    console.log(item.quantity);
    var list;
    if (localStorage.getItem('giohang') == null) {
        list = [item];
    } else {
        list = JSON.parse(localStorage.getItem('giohang')) || [];
    let ok = true;
    for (let x of list) {
        if (x.id == item.id) {
        x.quantity += 1;
        ok = false;
        break;
        }
    }
    if(ok){
        list.push(item); 
    } 
    }
    localStorage.setItem('giohang',JSON.stringify(list));
    alert("Đã thêm giở hàng thành công");
    }

//////////////////////////////////////
    function LoadSLH() {
        var gio = JSON.parse(localStorage.getItem('giohang'));
        var sl = 0;
        for (x of gio) {
            sl += x.quantity;
        }
        $("#soluong").text(sl);
        $("#tongslspban").text(sl);
        $("#tongslspban1").text(sl);
       
    }
   
   