const iconConfig = [
  {
    "url": "fonts/ionicons/css/ionicons.min.css",
    "name": "Ionicons",
    "family": "Ionicons",
    "version": "2.0.1",
    "cdn": ""
  },
  {
    "url": "fonts/fontawesome/css/fontawesome-all.css",
    "name": "Font Awesome",
    "family": "FontAwesome",
    "version": "5.0.2",
    "cdn": ""
  },
  {
    "url": "fonts/hawcons/css/style.css",
    "name": "Hawcons Stroke",
    "family": "Hawcons",
    "version": "1.0.0",
    "cdn": ""
  },
  {
    "url": {
      "font": "https://fonts.googleapis.com/icon?family=Material+Icons",
      "codepoint": "https://cdn.rawgit.com/google/material-design-icons/master/iconfont/codepoints",
    },
    "name": "Material Icons",
    "family": "Material Icons",
    "version": "3.0.1",
    "cdn": ""
  }/**/
];
iconConfig.map((config, i) => {
  const url = typeof config.url === 'object' ? config.url.codepoint : config.url;
  fetch(url).then(res => res.text()).then(file => {
    const css = file.replace(/\n|\s/g,''),
    iconItem = css.match(/\.(\w|-)+:before((.{1,40}|.{1,70})(?=}))/g),
    main = document.querySelector('.main'),
    cssCdn = typeof config.url === 'object' ? config.url.font : config.url;
    main.insertAdjacentHTML('beforeend',`<h2 class="icon--title">${config.name} <small class="icon--version">(v${config.version})</small><button class="icon--toggle" data-toggle></button><a href="${cssCdn}" class="icon--network" data-cdn data-clipboard-text="${cssCdn}"></a></h2><div class="icon--wrap"></div>`);
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
        main.lastChild.insertAdjacentHTML('beforeend',`<div class="icon--item"><div class="icon--symbol" style="font-family: ${iconFont}">&#x${iconCode}</div><div class="icon--name" data-clipboard>${iconName}</div><div class="icon--unicode" data-clipboard>\\${iconCode}</div></div>`);
      });
    }
    document.querySelector('.header--counter').textContent = document.querySelectorAll('.icon--item').length;
  });
});

/* widgets ;-) */
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