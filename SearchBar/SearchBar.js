let searchBar = document.querySelector('.searchBar');
let lgSearchBtn = document.querySelector('.lg-search-icon');
let lgSearchTxt = document.querySelector('.lg-search-icon-txt');
let searchPosition = document.querySelector('.search-position');
let locationPart = document.querySelector('.location');
let searchPeople = document.querySelector('.search-people');
let peoplePart = document.querySelector('.people');
let peopleControl = document.querySelectorAll('.people-control');
let peopleValue = document.getElementById('people-value');
const cancelBtn = document.querySelector('.sm-cancel');
const rwdWidth = 750;

// 搜尋按下去的畫面
searchPosition.addEventListener('click', (e) => {
  // 手機板
  if (document.body.clientWidth < rwdWidth) {
    locationPart.style.marginLeft = 'unset';
    locationPart.classList.remove('show','toggle');
    locationPart.classList.add('rwdShow');
    searchBar.classList.add('toggle');
    searchBar.parentElement.style.backgroundColor = '#fff';
    searchPosition.style.backgroundColor = 'transparent';
    cancelBtn.style.display = 'block';
  }
  // 電腦版
  else {
    peoplePart.classList.remove('toggle');
    locationPart.classList.remove('toggle');
    locationPart.classList.add('show');
    locationPart.style.marginLeft = `${searchBar.offsetLeft}px`;
  }
});

// 手機板的搜尋取消
cancelBtn.addEventListener('click', () => {
  locationPart.classList.remove('rwdShow');
  searchBar.classList.remove('toggle');
  searchBar.parentElement.style.backgroundColor = 'transparent';
  cancelBtn.style.display = 'none';
});

searchPeople.addEventListener('click', (e) => {
  if(locationPart.style.display === '')
    locationPart.classList.add('toggle');

  peoplePart.classList.add('toggle');
  peoplePart.style.marginLeft = `${searchBar.offsetLeft + searchBar.offsetWidth - peoplePart.offsetWidth}px`;
  focus(e.target);
});

let temp = 0;
let toddler = 0;
let adultNumber = document.getElementById('adult');
// 新增人數
peopleControl.forEach((x) => {
  // 增加人數
  x.querySelector('.plus').addEventListener('click', (e) => {
    e.target.previousSibling.innerText = `${Number(e.target.previousSibling.innerText) + 1}`;

    if (x.getAttribute('id') === 'toddler') {
      if (temp === 0) {
        temp += 1;
        toddler += 1;
        adultNumber.innerText = '1';
      } 
      else 
        toddler += 1;
    } 
    else if (x.getAttribute('id') === 'child' && temp === 0) {
      temp += 2;
      adultNumber.innerText = '1';
    } 
    else
      temp += 1;

    peopleValue.innerText = `${temp}位，${toddler}位嬰幼兒`;
  });

  // 減少人數
  x.querySelector('.minus').addEventListener('click', (e) => {
    if (e.target.nextSibling.innerText > 0) {
      e.target.nextSibling.innerText = `${Number(e.target.nextSibling.innerText) - 1}`;

      if (x.getAttribute('id') === 'toddler')
        toddler -= 1;
      else
        temp -= 1;

      peopleValue.innerText = `${temp}位，${toddler}位嬰幼兒`;
    }

    // 沒人時清空
    if (temp === 0)
      peopleValue.innerText = '新增人數';
  });
});

let banner = document.getElementById('banner');
// 電腦版搜尋按下去會跑出'搜尋'
searchBar.addEventListener('click', (e) => {
  // 鎖定
  if (document.body.clientWidth > rwdWidth) {
    lgSearchBtn.classList.add('toggle');
    lgSearchTxt.style.display = 'block';
    banner.style.display = 'block';
    banner.addEventListener('click', (e) => {
      // 復原
      e.target.style.display = 'none';
      locationPart.classList.add('toggle');
      peoplePart.classList.remove('toggle');
      lgSearchBtn.classList.remove('toggle');
      lgSearchTxt.style.display = 'none';
    });
  }
});

// 日期
const t1 = document.getElementById('in-date-time');
const t2 = document.getElementById('out-date-time');

t1.addEventListener('click',()=>{change()});
t2.addEventListener('click',()=>{change()});

function change(){
  peoplePart.classList.remove('toggle');
  locationPart.classList.add('toggle');
}

const picker = makePicker(t1);
const picker2 = makePicker(t2);

function makePicker(el){
  return new Litepicker({
    element: el,
    format: 'DD MMM YYYY',
    minDate: new Date() - 1,
    autoApply: true,
    useResetBtn: true,
    buttonText: {
      apply: 'Done',
      reset: 'Reset',
    },
    tooltipText: {
      one: 'night',
      other: 'nights',
    },
    mobileFriendly: true,
    moduleRanges: false,
    numberOfMonths: 2,
    numberOfColumns: 2,
    singleMode: false,
    moduleNavKeyboard: true,
    setup: (picker) => {
      picker.on('selected', (date1, date2) => {
        t1.querySelector('.placeholder').innerText = date1.format('M月DD日');
        t2.querySelector('.placeholder').innerText = date2.format('M月DD日');
      });
    }
  });
}