let tabBtn = $('.tab-button');
let tabCont = $('.tab-content');

for(let i = 0; i<tabBtn.length; i++){
    tabBtn.eq(i).on('click', function(){
        tabBtn.removeClass('orange');
        tabBtn.eq(i).addClass('orange');
        tabCont.removeClass('show');
        tabCont.eq(i).addClass('show');
    }); 
}

