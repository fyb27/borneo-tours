(function () {
  var css = [
    '.wa-float{position:fixed;bottom:24px;right:24px;z-index:9000;display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:#25d366;box-shadow:0 4px 12px rgba(0,0,0,.25);text-decoration:none;transition:transform .2s,box-shadow .2s}',
    '.wa-float:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(0,0,0,.3)}',
    '.wa-float img{width:30px;height:30px;display:block}',
    '@media (min-width:768px){.wa-float{width:68px;height:68px;bottom:40px;right:40px}.wa-float img{width:38px;height:38px}}',
    '@keyframes wa-pulse{0%,100%{box-shadow:0 4px 12px rgba(0,0,0,.25),0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 4px 12px rgba(0,0,0,.25),0 0 0 12px rgba(37,211,102,0)}}',
    '.wa-float{animation:wa-pulse 2.5s ease-out infinite}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var a = document.createElement('a');
  a.className = 'wa-float';
  a.href = 'https://wa.me/60192277077?text=Hi%2C%20I%27m%20interested%20in%20a%20Borneo%20tour!';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', 'Chat on WhatsApp');

  var img = document.createElement('img');
  img.src = '/cdn.prod.website-files.com/65cf5380c2fa1e080e064a83/65d5fca43dd948053e4a80fd_whatsapp.svg';
  img.alt = 'WhatsApp';
  img.width = 30;
  img.height = 30;

  a.appendChild(img);
  document.body.appendChild(a);
})();
