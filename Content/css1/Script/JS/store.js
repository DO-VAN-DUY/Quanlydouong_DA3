

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready());
}
else{
   
    ready();
}




function ready(){
    onLoadCartNumbers();
    var increase = document.getElementsByClassName('increase');
		var decrease = document.getElementsByClassName('decrease');
        console.log(increase.length, decrease);
		for(var i=0;i<increase.length;i++){
			var button = increase[i];
			button.addEventListener('click', function(event){
				var buttonClicked = event.target;
                console.log(buttonClicked);
				var cartItemInput = buttonClicked.parentElement.parentElement.children[4].children[1];
				cartItemInput.value++;	
				if(isNaN(cartItemInput.value) || cartItemInput.value<1){
					cartItemInput.value=1;
				}		
                UpdateTotal();
                
			})
            
		}
		for(var i=0;i<decrease.length;i++){
			var button = decrease[i];
			button.addEventListener('click', function(event){
				var buttonClicked = event.target;
				var cartItemInput = buttonClicked.parentElement.parentElement.children[4].children[1];
				cartItemInput.value--;		
				if(isNaN(cartItemInput.value) || cartItemInput.value<1){
					cartItemInput.value=1;
				}	
                
                UpdateTotal();	
			})
		}
    var removeCartItemButtons = document.getElementsByClassName('removebutton');
    for(var i=0;i<removeCartItemButtons.length;i++){
        var button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var addToCartButtons = document.getElementsByClassName('buttongio');
    for(var i=0;i<addToCartButtons.length;i++){
         var button = addToCartButtons[i];
         button.addEventListener('click', clickAddCart);
         
    }
    table = document.getElementsByClassName('table')[0];
}

function clickAddCart(event){

    var buttonClicked = event.target;
    var itemClicked = buttonClicked.parentElement.parentElement;
    console.log(itemClicked);
    var nameItem = itemClicked.getElementsByClassName('tieudesp')[0].innerText
    var priceItem = itemClicked.querySelectorAll('.giasp span:nth-child(2)')[0].innerText;
    var imgItem = itemClicked.getElementsByClassName('imgsp')[0].src;
    var idItem = itemClicked.getElementsByClassName('tieudesp')[0].id;
    addItemToCart(nameItem, priceItem, imgItem, idItem);
    ready();
	
}


function onLoadCartNumbers(){
    var list = JSON.parse(localStorage.getItem('cart'));
    var cartNumbers =0;
    if(list==null){
        cartNumbers=0;
        
    }
    else{
        cartNumbers = JSON.parse(localStorage.getItem('cart')).length;
    }
    document.querySelector('.cartNumbers').textContent = cartNumbers;
}

function addItemToCart(nameItem, priceItem, imgItem, idItem){
    var list = JSON.parse(localStorage.getItem('cart'));
	var item = {nameItem: nameItem, priceItem: priceItem,imgItem:imgItem,idItem:idItem};
	let ok = true;
	if(list==null){
	list=[];
}
    for(var i=0;i<list.length;i++){
        if(list[i].nameItem== nameItem)
        {
            alert("Hang da ton tai trong gio");
		ok = false;
            return;
        }
    }
	if(ok){
	list.push(item);
}
	localStorage.setItem("cart", JSON.stringify(list));
	alert("Đã thêm giở hàng thành công");
}



function  XoaCart() {
    localStorage.setItem('cart', null);
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    UpdateTotal();
}

function UpdateTotal(){
    var gio_hang = document.getElementsByClassName('table')[0];
    var list_gio_hang_item = gio_hang.getElementsByClassName('item');
    var total=0;
    for(var i =0;i<list_gio_hang_item.length;i++){
        var gio_hang_item = list_gio_hang_item[i];
        var priceElement =  gio_hang_item.getElementsByClassName('giasp')[0];
      
        var quantityElement = gio_hang_item.getElementsByClassName('number')[0]; 
        var price = parseFloat(priceElement.innerText.replace('đ', ''));
        var quantity = quantityElement.value;
        total =total+ price * quantity;
    }
    document.getElementsByClassName('tongtien')[0].innerText = numberWithCommas(total) +'đ';

}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // \B: tìm chữ mà nó ko ở đầu hoặc cuối
    // ?=n: tìm chữ mà sau nó là chữ n
    // \d{x}: tìm số 0-9 và match với số lượng chữ số x
    // +: tìm chữ chứa ít nhất 1 ký tự cần match
    // ?!n: tìm chữ mà sau nó không là chữ n
    // g: tiếp tục tìm thay vì dừng lại sau khi tìm xong lần đầu
}
