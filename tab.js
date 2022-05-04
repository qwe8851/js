let tabBtn = $('.tab-button');
let tabCont = $('.tab-content');

$('.list').click(function(e){
    tapOpen(e.target.dataset.id);
    $('list').data('id');
});

// for(let i = 0; i<tabBtn.length; i++){
//     tabBtn.eq(i).on('click', function(){
//         tapOpen(i);
//     }); 
// }
        
function tapOpen(i){
    tabBtn.removeClass('orange');
    tabBtn.eq(i).addClass('orange');
    tabCont.removeClass('show');
    tabCont.eq(i).addClass('show');
}

let car2 = {name : '소나타', price : [50000, 3000, 4000] };

$('.car-title').html(car2.name);
$('.car-price').html(car2.price[0]);