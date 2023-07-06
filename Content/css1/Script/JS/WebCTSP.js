function quantity1()
{
    var inc = document.getElementsByClassName('increase')[0];
    var dec = document.getElementsByClassName('decrease')[0];
    var inputQuantity = document.getElementById('number');
    inc.addEventListener('click',(e)=>
    {
        inputQuantity.value++;
        if(inputQuantity.value<=0|| isNaN(inputQuantity.value))
        {
            inputQuantity.value=1;
        }
    });
    dec.addEventListener('click',(e)=>{
        inputQuantity.value--;
        if(inputQuantity.value<=0|| isNaN(inputQuantity.value))
        {
            inputQuantity.value=1;
        }
    })
    inputQuantity.addEventListener('change',(e)=>
    {
        if(inputQuantity.value<=0|| isNaN(inputQuantity.value))
        {
            inputQuantity.value=1;
        }
    })
    var bigAva = document.getElementsByClassName('bigava1')[0].children[0];
    var tra = document.getElementById('1000');
    var soco = document.getElementById('2000');
//     trang.addEventListener('change',(e)=>{
//         if(trang.checked){
//             bigAva.src = 'img/aotrang.jpg';
//     }
// })
//     doo.addEventListener('change',(e)=>{
//         if(doo.checked){
//             bigAva.src = 'img/aodo.jpg';
//         }
//     }) 
//     den.addEventListener('change',(e)=>{
//         if(den.checked){
//             bigAva.src = 'img/aoden.jpg';
//         }
//     }) 
    $('ul').on('change','input',(e)=>{
        if(tra.checked){
            bigAva.src = 'PictureDA/CTKem1.jpg';
    }
    else if(soco.checked){
        bigAva.src = 'PictureDA/CTKem2.jpg';
    }
    })



    var smallAva = document.getElementsByClassName('smallava1')[0].children[0];
    var tra1 = document.getElementById('1000');
    var soco1 = document.getElementById('2000');
//     trang.addEventListener('change',(e)=>{
//         if(trang.checked){
//             bigAva.src = 'img/aotrang.jpg';
//     }
// })
//     doo.addEventListener('change',(e)=>{
//         if(doo.checked){
//             bigAva.src = 'img/aodo.jpg';
//         }
//     }) 
//     den.addEventListener('change',(e)=>{
//         if(den.checked){
//             bigAva.src = 'img/aoden.jpg';
//         }
//     }) 
    $('ul').on('change','img',(e)=>{
        if(tra1.checked){
            smallAva.src = 'PictureDA/CTKem1.jpg';
    }
    else if(soco1.checked){
        smallAva.src = 'PictureDA/CTKem2.jpg';
    }
    })
}

