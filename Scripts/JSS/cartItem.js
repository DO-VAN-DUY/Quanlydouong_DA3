function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');

    }
    return x1 + x2;
    //hiển thị thông tin giỏ hang
    function giohangs(id) {
        $.get("/Home/Giohangs", { id: id }, function (data) {
            $("#count-cart").html(data.soluong);
            $("#total_price").html(formatNumber(data.tongtien, ".", ","));
            $("#show-cart").html("");
            $.each(data.giohang, function (i, val) {
                var thanhtien = val.soluong * val.gia
            })
          
        })
    }
}