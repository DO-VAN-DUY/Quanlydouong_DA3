// function onLoadCartNumbers(){
//     var list = JSON.parse(localStorage.getItem('cart'));
//     var cartNumbers =0;
//     if(list==null){
//         cartNumbers=0;
//     }
//     else{
//         cartNumbers = JSON.parse(localStorage.getItem('cart')).length;
//     }
//     document.querySelector('.cartNumbers').textContent = cartNumbers;
// }

document.onload = ready();

function addItemToCart(){
    var list = JSON.parse(localStorage.getItem('cart'));
    var str;
    var cartItems = document.getElementsByClassName('table')[0];
    var s = cartItems.getElementsByTagName('tbody')[0];
	for(var i=0;i<list.length;i++){
	if(list==null)
	list=[];
	cartRow = document.createElement('tr');
	cartRow.classList.add('item');
        str =` 
        <tr class="item">
        <td style="width: 5%; border-color: transparent; border-bottom: 1px solid black;"><button class="removebutton">X</button></td>
        <td style="width: 20%; border-color: transparent; border-bottom: 1px solid black;"><img src="${list[i].imgItem}" alt="dongho1"></td>
        <td class="tensp" id=${list[i].idItem}>${list[i].nameItem}</td>
        <td class="giasp">${list[i].priceItem}đ</td>
        <td>
            <div id="value-button" class="decrease" value="Decrease Value">-</div>
            <input type="number" id="number1" class="number" value="1"/>
            <div id="value-button" class="increase" value="Increase Value">+</div>
            
        </td>
        <td style="text-align: center;">${list[i].priceItem}đ</td>
    </tr>	
      `;
      cartRow.innerHTML = str;
     s.appendChild(cartRow);
	str="";
}
	ready();
	UpdateTotal();
}




function ready(){	
    var increase = document.getElementsByClassName('increase');
    var decrease = document.getElementsByClassName('decrease');
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




function capNhat(){
	var list = JSON.parse(localStorage.getItem('cart'));
	var listid =[];
	var item = document.getElementsByClassName('item');
    let ok = false;
	var str;
    var cartItems = document.getElementsByClassName('table')[0];
    var s = cartItems.getElementsByTagName('tbody')[0];
    console.log(item.length);
    if(item.length==0){
        for(var i =0;i<list.length;i++)
       { cartRow = document.createElement('tr');
                cartRow.classList.add('item');
                str =` 
                    <tr class="item">
                    <td style="width: 5%; border-color: transparent; border-bottom: 1px solid black;"><button class="removebutton">X</button></td>
                    <td style="width: 20%; border-color: transparent; border-bottom: 1px solid black;"><img src="${list[i].imgItem}" alt="dongho1"></td>
                    <td class="tensp">${list[i].nameItem}</td>
                    <td class="giasp">${list[i].priceItem}đ</td>
                    <td id=${list[i].idItem}>
                        <div id="value-button" class="decrease" value="Decrease Value">-</div>
                        <input type="number" id="number1" class="number" value="1"/>
                        <div id="value-button" class="increase" value="Increase Value">+</div>
                        
                    </td>
                    <td style="text-align: center;">${list[i].priceItem}đ</td>
                </tr>	
                  `;
                  cartRow.innerHTML = str;
                 s.appendChild(cartRow);
                str="";
               var inc = document.getElementById(list[i].idItem).getElementsByClassName('increase')[0].addEventListener('click',function(event){
                   inc = event.target;
                   var cartItemInput = inc.parentElement.parentElement.children[4].children[1];
                   cartItemInput.value++;	
                   UpdateTotal();
                   if(isNaN(cartItemInput.value) || cartItemInput.value<1){
                       cartItemInput.value=1;
                       
               }});
               var de = document.getElementById(list[i].idItem).getElementsByClassName('decrease')[0].addEventListener('click',function(event){
                de = event.target;
                var cartItemInput = de.parentElement.parentElement.children[4].children[1];
                cartItemInput.value--;	
                UpdateTotal();
                if(isNaN(cartItemInput.value) || cartItemInput.value<1){
                    cartItemInput.value=1;
                    var removeCartItemButtons = document.getElementsByClassName('removebutton');
                    for(var i=0;i<removeCartItemButtons.length;i++){
                        var button = removeCartItemButtons[i];
                        button.addEventListener("click", removeCartItem);
                    }
              
    }});
    
}}
	for(var i=0;i<item.length;i++){
	var itemtrans = item[i];
	var iditem = itemtrans.getElementsByClassName('tensp')[0].id;
	listid.push(iditem);
}
   
	if(item.length< list.length){ console.log(listid);
	for(var i=item.length;i<list.length;i++){
        for(var j=0;j<item.length;j++){
            if(list[i].idItem != listid[j]){
                ok =true;
            }
            else ok=false;
        }
        if(ok)
          {      cartRow = document.createElement('tr');
                cartRow.classList.add('item');
                str =` 
                    <tr class="item">
                    <td style="width: 5%; border-color: transparent; border-bottom: 1px solid black;"><button class="removebutton">X</button></td>
                    <td style="width: 20%; border-color: transparent; border-bottom: 1px solid black;"><img src="${list[i].imgItem}" alt="dongho1"></td>
                    <td class="tensp">${list[i].nameItem}</td>
                    <td class="giasp">${list[i].priceItem}đ</td>
                    <td id=${list[i].idItem}>
                        <div id="value-button" class="decrease" value="Decrease Value">-</div>
                        <input type="number" id="number1" class="number" value="1"/>
                        <div id="value-button" class="increase" value="Increase Value">+</div>
                        
                    </td>
                    <td style="text-align: center;">${list[i].priceItem}đ</td>
                </tr>	
                  `;
                  cartRow.innerHTML = str;
                 s.appendChild(cartRow);
                str="";
               var inc = document.getElementById(list[i].idItem).getElementsByClassName('increase')[0].addEventListener('click',function(event){
                   inc = event.target;
                   var cartItemInput = inc.parentElement.parentElement.children[4].children[1];
                   cartItemInput.value++;	
                   UpdateTotal();
                   if(isNaN(cartItemInput.value) || cartItemInput.value<1){
                       cartItemInput.value=1;
                       
               }});
               var de = document.getElementById(list[i].idItem).getElementsByClassName('decrease')[0].addEventListener('click',function(event){
                de = event.target;
                var cartItemInput = de.parentElement.parentElement.children[4].children[1];
                cartItemInput.value--;	
                UpdateTotal();
                if(isNaN(cartItemInput.value) || cartItemInput.value<1){
                    cartItemInput.value=1;
                    
            }});
            var removeCartItemButtons = document.getElementsByClassName('removebutton');
            for(var i=0;i<removeCartItemButtons.length;i++){
                var button = removeCartItemButtons[i];
                button.addEventListener("click", removeCartItem);
            }
            }
}
        }
        else{ return;}

        UpdateTotal();
                    
//         }
	
// 	{	
// }
// }		
// }  
// 	ready();
	
}

