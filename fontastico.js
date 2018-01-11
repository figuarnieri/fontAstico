document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" href="style.css" />`);
const iconConfig = [
  {
    "url": "fonts/ionicons/css/ionicons.min.css",
    "name": "Ionicons",
    "family": "Ionicons",
    "version": "2.0.1",
    "cdn": "https://cdn.rawgit.com/figuarnieri/fontAstico/master/fonts/ionicons/css/ionicons.css"
  },
  {
    "url": "fonts/fontawesome/css/fontawesome-all.css",
    "name": "Font Awesome",
    "family": "FontAwesome",
    "version": "5.0.2",
    "cdn": "https://cdn.rawgit.com/figuarnieri/fontAstico/master/fonts/fontawesome/css/fontawesome-all.css"
  },
  {
    "url": "fonts/hawcons/css/style.css",
    "name": "Hawcons Stroke",
    "family": "Hawcons",
    "version": "1.0.0",
    "cdn": "https://cdn.rawgit.com/figuarnieri/fontAstico/master/fonts/hawcons/css/style.css"
  },
  {
    "url": {
      "font": "https://fonts.googleapis.com/icon?family=Material+Icons",
      "codepoint": "https://cdn.rawgit.com/google/material-design-icons/master/iconfont/codepoints",
    },
    "name": "Material Icons",
    "family": "Material Icons",
    "version": "3.0.1",
    "cdn": "https://fonts.googleapis.com/icon?family=Material+Icons"
  }
];
iconConfig.map((config, i) => {
  const url = typeof config.url === 'object' ? config.url.codepoint : config.url;
  fetch(url).then(res => res.text()).then(file => {
    const css = file.replace(/\n|\s/g,''),
    iconItem = css.match(/\.(\w|-)+:before((.{1,40}|.{1,70})(?=}))/g),
    main = document.querySelector('.main'),
    cssCdn = typeof config.url === 'object' ? config.url.font : config.url;
    main.insertAdjacentHTML('beforeend',`<h2 class="icon--title">${config.name} <small class="icon--version">(v${config.version})</small><button class="icon--toggle" data-toggle></button><a href="${config.cdn}" class="icon--network" data-cdn data-clipboard-text="${config.cdn}"><svg class="icon--network-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.2 195.6"><path d="M157.1,82.1H83V71l6-8.9v-3.9h-6V0h74.1v58.2h-7.5v3.9l7.5,8.9V82.1z M240.2,195.6h-74.1v-11.1l6-8.9v-3.9h-6v-58.2h74.1 v58.2h-7.5v3.9l7.5,8.9V195.6z M157.8,126.6h-14.5l5.1-5.3l-17.6-17.6l-5.6,5.1V94.2h15l-5.1,4.9l17.7,17.6l4.9-4.9V126.6z  M115,109l-5.6-5.1l-17.6,17.6l4.9,5.1H82.3v-14.5l5.1,5.1l17.6-17.7l-5.1-5.2H115V109z M143.9,148.2l-10.8,10v-7h-24.9v7.2 l-11.7-10.1l11.7-10.4v7H133v-7L143.9,148.2z M74.1,195.6H0v-11.1l6-8.9v-3.9H0v-58.2h74.1v58.2h-7.5v3.9l7.5,8.9V195.6z  M149.8,45.7V7.3c0-1.6-0.7-2.4-2.3-2.4H92.7c-1.6,0-2.4,0.8-2.4,2.4v38.4c0,1.6,0.8,2.4,2.4,2.4h54.8 C149,48.1,149.8,47.3,149.8,45.7z M232.9,159.2v-38.4c0-1.6-0.8-2.4-2.2-2.4h-54.8c-1.6,0-2.4,0.8-2.4,2.4v38.4 c0,1.6,0.8,2.4,2.4,2.4h54.8C232.1,161.6,232.9,160.8,232.9,159.2z M66.8,159.2v-38.4c0-1.6-0.8-2.4-2.3-2.4H9.7 c-1.6,0-2.4,0.8-2.4,2.4v38.4c0,1.6,0.8,2.4,2.4,2.4h54.8C66,161.6,66.8,160.8,66.8,159.2z"/></svg></a></h2><div class="icon--wrap"></div>`);
    document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" href="${cssCdn}" />`);
    if(!iconItem){
      const iconItemFix = file.match(/.+\n/g);
      iconItemFix.map(icon => {
        const iconArray = icon.split(' ');
        main.lastChild.insertAdjacentHTML('beforeend',`<div class="icon--item"><div class="icon--symbol" style="font-family: '${config.family}'">${iconArray[0]}</div><div class="icon--name" data-clipboard data-clipboard-text="${iconArray[0]}">${iconArray[0]}</div><div class="icon--unicode" data-clipboard data-clipboard-text="\\${iconArray[1]}">\\${iconArray[1]}</div></div>`);
      });
    } else {
      iconItem.map(icon => {
        const iconFont = icon.match(/font-family:.{1,35};/) ? icon.match(/font-family:.{1,35};/)['0'].replace(/font-family:|;/g,'') : config.family,
        iconCode = icon.match(/:before{content:\W+\w+/)['0'].replace(/:before{content:|\W/g,''),
        iconName = icon.match(/\..{1,40}:before/)['0'].replace(/\.|:before/g,'');
        main.lastChild.insertAdjacentHTML('beforeend',`<div class="icon--item"><div class="icon--symbol" style="font-family: ${iconFont}">&#x${iconCode}</div><div class="icon--name" data-clipboard data-clipboard-text="${iconName}">${iconName}</div><div class="icon--unicode" data-clipboard data-clipboard-text="\\${iconCode}">\\${iconCode}</div></div>`);
      });
    }
    document.querySelector('.header--counter').textContent = document.querySelectorAll('.icon--item').length;
  });
});
document.querySelector('[data-search]').addEventListener('input', (event) => {
    var regex = new RegExp(event.target.value, 'gi');
    document.querySelectorAll('.icon--name').forEach(item => {
        var txt = item.textContent;
        regex.test(txt) ? item.parentNode.classList.remove('icon--item-hidden') : item.parentNode.classList.add('icon--item-hidden');
    });
    document.querySelector('.header--counter').textContent = document.querySelectorAll('.icon--item:not(.icon--item-hidden)').length;
});
document.addEventListener('click', (event) => {
  const that = event.target;
  if(that.hasAttribute('data-toggle')){
    that.parentNode.nextElementSibling.classList.toggle('icon--wrap-active');
    that.parentNode.classList.toggle('icon--title-active');
  }
  if(that.hasAttribute('data-cdn')){
    event.preventDefault();
  }
});
const log = (msg) => {
  const tag = document.querySelector('.log');
  tag.innerHTML = msg;
  tag.classList.add('log--success');
  clearTimeout(window.logTimer);
  window.logTimer = setTimeout(() => {
    tag.classList.remove('log--success');
  }, 2000);
}