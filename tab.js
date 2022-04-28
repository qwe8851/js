let tabBtn = $('.tab-button');
let tabCont = $('.tab-content');
// let className = 

for(let i = 0; i<3; i++){
    tabBtn.eq(i).on('click', function(){
        tabBtn.removeClass('orange');
        tabBtn.eq(i).addClass('orange');
        tabCont.removeClass('show');
        tabCont.eq(i).addClass('show');
    }); 
}

tabBtn.eq(0).on('click', function(){
    tabBtn.removeClass('orange');
    tabBtn.eq(0).addClass('orange');
    tabCont.removeClass('show');
    tabCont.eq(0).addClass('show');
});

// tabBtn.eq(1).on('click', function(){
//     tabBtn.removeClass('orange');
//     tabBtn.eq(1).addClass('orange');
//     tabCont.removeClass('show');
//     tabCont.eq(1).addClass('show');
// });
// tabBtn.eq(2).on('click', function(){
//     tabBtn.removeClass('orange');
//     tabBtn.eq(2).addClass('orange');
//     tabCont.removeClass('show');
//     tabCont.eq(2).addClass('show');
// });

