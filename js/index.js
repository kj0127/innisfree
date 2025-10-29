// HTML 문서 구조가 준비되면 이 안의 코드를 먼저 실행합니다.
document.addEventListener('DOMContentLoaded', function() {

    // 1. 농심 스타일 헤더 (배경 변경만 담당)
const header = document.querySelector('header');
const submenuWrap = document.querySelector('.submenu-wrap');
const mainActiveBar = document.querySelector('.main-active-bar'); // 변수 선언을 위로 이동
const mainMenuItems = document.querySelectorAll('.gnb .main-menu li'); // 변수 선언을 위로 이동

header.addEventListener('mouseenter', () => {
    // 이제 헤더 배경 변경만 담당합니다.
    header.classList.add('is-active');
});

header.addEventListener('mouseleave', () => {
    // 헤더 영역 전체를 나갔을 때 모든 효과를 초기화합니다.
    if (window.scrollY === 0) {
        header.classList.remove('is-active');
    }
    submenuWrap.classList.remove('is-active'); // 서브메뉴 닫기
    mainActiveBar.style.width = '0px'; // 메인 메뉴 바 숨기기
    mainMenuItems.forEach(item => item.classList.remove('active-main-item')); // 텍스트 색상 초기화
});

// 스크롤 이벤트는 그대로 유지
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('is-active');
    } else if (!header.matches(':hover')) {
        header.classList.remove('is-active');
    }
});

    // 2. 상단 메뉴 움직이는 바
    const topMenuItems = document.querySelectorAll('.top-menu li');
    const activeBar = document.querySelector('.active-bar');

    function moveBar(target) {
        topMenuItems.forEach(item => item.classList.remove('active'));
        target.classList.add('active');
        const targetRect = target.getBoundingClientRect();
        const containerRect = target.parentElement.parentElement.getBoundingClientRect();
        activeBar.style.left = `${targetRect.left - containerRect.left}px`;
        activeBar.style.width = `${targetRect.width}px`;
    }

    topMenuItems.forEach(item => item.addEventListener('mouseenter', () => moveBar(item)));
    
    const initialActiveItem = document.querySelector('.top-menu li.active');
    if (initialActiveItem) moveBar(initialActiveItem);

    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // ▼▼▼ 이 내비게이션 옵션을 추가해주세요! ▼▼▼
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

// 아래로 가는 버튼 작동 코드
const scrollBtn = document.querySelector('.scroll-down-btn a');
const rankingSection = document.querySelector('#ranking-section');

if (scrollBtn && rankingSection) {
    scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        rankingSection.scrollIntoView({ behavior: 'smooth' });
    });
}
// ▲▲▲ 여기까지 전부 교체 ▲▲▲

    // 4. 스크롤 애니메이션
    ScrollReveal().reveal('.scroll-section', {
        delay: 200, distance: '50px', origin: 'bottom',
        duration: 800, easing: 'ease-in-out',
        interval: 150, reset: false
    });
    
    // 5. 메인 메뉴용 움직이는 바 및 서브메뉴 제어
const gnb = document.querySelector('.gnb');
const logo = document.querySelector('.logo'); // 로고 선택
const utilMenu = document.querySelector('.util-menu'); // 아이콘 메뉴 선택

// gnb(메인 메뉴) 영역에 마우스를 올리면 서브메뉴가 나타남
gnb.addEventListener('mouseenter', () => {
    submenuWrap.classList.add('is-active');
});

// ▼ 로고 영역으로 마우스가 들어가면 서브메뉴를 닫음
logo.addEventListener('mouseenter', () => {
    submenuWrap.classList.remove('is-active');
});

// ▼ 아이콘 영역으로 마우스가 들어가면 서브메뉴를 닫음
utilMenu.addEventListener('mouseenter', () => {
    submenuWrap.classList.remove('is-active');
});


function moveMainMenuBar(target) {
    mainMenuItems.forEach(item => item.classList.remove('active-main-item'));
    target.classList.add('active-main-item');

    const targetRect = target.getBoundingClientRect();
    const gnbRect = gnb.getBoundingClientRect();

    mainActiveBar.style.left = `${targetRect.left - gnbRect.left}px`;
    mainActiveBar.style.width = `${targetRect.width}px`;
}

mainMenuItems.forEach(item => {
    item.addEventListener('mouseenter', () => moveMainMenuBar(item));
});

mainMenuItems.forEach(item => {
    item.addEventListener('mouseenter', () => moveMainMenuBar(item));
});

    // 6. 랭킹 카테고리 메뉴바
const rankingNavContainer = document.querySelector('.ranking-nav-container');
const rankingNavItems = document.querySelectorAll('.ranking-nav li');
const rankingActiveBar = document.querySelector('.ranking-active-bar');

function moveRankingBar(target) {
    const targetRect = target.getBoundingClientRect();
    const containerRect = rankingNavContainer.getBoundingClientRect();
    const scrollLeft = rankingNavContainer.scrollLeft;
    rankingActiveBar.style.left = `${targetRect.left - containerRect.left + scrollLeft}px`;
    rankingActiveBar.style.width = `${targetRect.width}px`;
}

rankingNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        rankingNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        moveRankingBar(item);
    });
});

// 페이지 로드 시 첫 번째 아이템 기준으로 바 위치 설정
const initialRankingItem = document.querySelector('.ranking-nav li.active');
if (initialRankingItem) {
    setTimeout(() => moveRankingBar(initialRankingItem), 100);
}

const benefitsSwiper = new Swiper(".benefits-swiper", {
        loop: true, // 무한 반복
        autoplay: {
          delay: 3000, // 3초마다 자동으로 넘어감
          disableOnInteraction: false, // 사용자가 조작해도 자동 재생 계속
        },
        // ▼▼▼ 아래 옵션들을 추가해주세요 ▼▼▼
        slidesPerView: 'auto', // 한 화면에 보일 슬라이드 개수를 자동으로 조절
        centeredSlides: true, // 활성 슬라이드를 가운데로 정렬
        spaceBetween: 20, // 슬라이드 사이의 간격 (픽셀 단위)
        // ▲▲▲ 여기까지 추가 ▲▲▲
        // // pagination: { // 필요하다면 페이지네이션 추가
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        // navigation: { // 필요하다면 좌우 버튼 추가
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
      });

});