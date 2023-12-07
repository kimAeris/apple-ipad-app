import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

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
searchCloserEl.addEventListener('click', function(event) {
    event.stopPropagation() // textfield 가 클릭되는 현상 막기
    hideSearch()
})
searchshadowEl.addEventListener('click', hideSearch)

function showSearch() {
    headerEl.classList.add('searching')
    stopScroll();

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
    playScroll();

    headerMenuEls.reverse().forEach((el, index) => {
        el.style.transitionDelay = `${index * .4 / headerMenuEls.length}s`;
    })

    searchDelayEls.reverse().forEach((el,index) => {
        el.style.transitionDelay = `${index * .4 / searchDelayEls.length}s`;
    })
    searchDelayEls.reverse();       // 원래대로

    searchInputEl.value = '';
}


function playScroll(){
    document.documentElement.classList.remove('fixed')
}

function stopScroll(){
    document.documentElement.classList.add('fixed')
}

// 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function(){
    if(headerEl.classList.contains('menuing')){
        headerEl.classList.remove('menuing')
        searchInputEl.value = '';
        playScroll();
    } else {
        headerEl.classList.add('menuing');
        stopScroll();
    }
})

// 헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl =document.querySelector('header .search-canceler')

searchTextFieldEl.addEventListener('click', function () {
    headerEl.classList.add('searching--mobile')
    searchInputEl.focus();
})

searchCancelEl.addEventListener('click', function() {
    headerEl.classList.remove('searching--mobile')
})

window.addEventListener('resize', function() {
    if(window.innerWidth <= 740){       // 모바일 모드
        headerEl.classList.remove('searching')
    }
    else {
        headerEl.classList.remove('searching--mobile')
    }
})

// 
const navEl = document.querySelector('nav')
const navMenuToggleEl = document.querySelector('nav .menu-toggler')
const navMenuShadowEl = document.querySelector('nav .shadow')
navMenuToggleEl.addEventListener('click', function() {
    if(navEl.classList.contains('menuing')){
        hideNavMenu();
    } else {
        showNavMenu();
    }
})

navEl.addEventListener('click', function(event){
    event.stopPropagation();
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)

function showNavMenu(){
    navEl.classList.add('menuing')
}
function hideNavMenu(){
    navEl.classList.remove('menuing')
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


// 비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
    video.play();
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function () {
    video.pause();
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
})


// 당신에게 맞는 iPad는? 랜더링 
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(ipad => {
    const itemEl = document.createElement('div')
    itemEl.classList.add('item')

    let colorList = ''
    ipad.colors.forEach(color => {
        colorList += /* html */`
            <li style="background-color: ${color}"></li>
        `
    })

    itemEl.innerHTML = /* html */ `
        <div class="thumbnail">
            <img src="${ipad.thumbnail}" alt="${ipad.name}" />
        </div>
        <ul class="colors">
            ${colorList}
        </ul>
        <h3 class="name">${ipad.name}</h3>
        <p class="tagline">${ipad.tagline}</p>
        <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
        <button class="btn">구입하기</button>
        <a href="${ipad.url}" class="link">더 알아보기</a>
    `
    
    itemsEl.append(itemEl)
})

const navigationEl = document.querySelector('footer .navigations')
navigations.forEach(nav => {
    const mapEl = document.createElement('div')
    mapEl.classList.add('map')

    let mapList = '';
    nav.maps.forEach(map => {
        mapList += /* html */ `
            <li>
                <a href="${map.url}">${map.name}</a>
            </li>
        `
    })

    mapEl.innerHTML = /* html */ `
        <h3>
            <span class="text">${nav.title}</span>
            <span class="icon">+</span>
        </h3>
        <ul>
            ${mapList}
        </ul>
    `

    navigationEl.append(mapEl)
})


// 올해 연도를 적용!
const thisYearEl = document.querySelector('.this-year')
thisYearEl.textContent = new Date().getFullYear()


// 푸터 내비게이션 맵 아코디언
const mapEls = [...document.querySelectorAll('footer .navigations .map')]
mapEls.forEach(el => {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', () => {
    el.classList.toggle('active')
  })
})