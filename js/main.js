// 헤더 - 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function(event) {
    event.stopPropagation();    // 버튼을 클릭했을 때 basket 요소가 닫히지 않게한다.
    if (basketEl.classList.contains('show')){
        hideBasket();
    } else {
        showBasket();
    }
})

basketEl.addEventListener('click', function (event) {
    event.stopPropagation();    // basket 내부를 클릭했을 때 basket 요소가 닫히지 않게한다.
})

window.addEventListener('click', function() {
    hideBasket();
})

function showBasket(){
    basketEl.classList.add('show')
}
function hideBasket(){
    basketEl.classList.remove('show')
}


// 헤더 - 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchshadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchshadowEl.addEventListener('click', hideSearch)

function showSearch() {
    headerEl.classList.add('searching')
    document.documentElement.classList.add('fixed')

    headerMenuEls.reverse().forEach((el, index) => {
        el.style.transitionDelay = `${index * .4 / headerMenuEls.length}s`;
    })

    searchDelayEls.forEach((el,index) => {
        el.style.transitionDelay = `${index * .4 / searchDelayEls.length}s`;
    })

    setTimeout( function () {
        searchInputEl.focus();
    }, 600)
}
function hideSearch() {
    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed')

    headerMenuEls.reverse().forEach((el, index) => {
        el.style.transitionDelay = `${index * .4 / headerMenuEls.length}s`;
    })

    searchDelayEls.reverse().forEach((el,index) => {
        el.style.transitionDelay = `${index * .4 / searchDelayEls.length}s`;
    })
    searchDelayEls.reverse();       // 원래대로

    searchInputEl.value = '';
}


// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return
        }
        entry.target.classList.add('show');
    })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(el => {
    io.observe(el)
})