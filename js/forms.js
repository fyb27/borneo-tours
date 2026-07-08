// Web3Forms AJAX handler. Intercepts at document capture phase so it runs
// BEFORE Webflow's own .w-form submit handler (which would otherwise hijack
// the submit, fail cross-origin, and show the "Oops!" error). Reuses Webflow's
// existing .w-form-done / .w-form-fail blocks so the visitor stays on page.
document.addEventListener('submit', function (e) {
  var form = e.target;
  if (!form || !form.querySelector || !form.querySelector('[name="access_key"]')) return;

  e.preventDefault();
  e.stopImmediatePropagation();   // stop Webflow's handler from running

  var wrap = form.closest('.w-form') || form.parentElement;
  var done = wrap ? wrap.querySelector('.w-form-done') : null;
  var fail = wrap ? wrap.querySelector('.w-form-fail') : null;
  var btn = form.querySelector('[type="submit"]');
  var label = btn ? (btn.value !== undefined ? btn.value : btn.textContent) : null;
  var waitTxt = btn ? btn.getAttribute('data-wait') : null;
  if (btn) { if (btn.value !== undefined) btn.value = waitTxt || 'Please wait...'; else btn.textContent = waitTxt || 'Please wait...'; }

  var fd = new FormData(form);
  fd.delete('g-recaptcha-response');  // Web3Forms free plan rejects submissions carrying a reCAPTCHA token (Pro feature)

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: fd
  }).then(function (r) { return r.json(); }).then(function (data) {
    if (data.success) {
      form.style.display = 'none';
      if (done) done.style.display = 'block';
      form.reset();
    } else {
      if (fail) fail.style.display = 'block';
      if (window.console) console.error('Web3Forms error:', data);
    }
  }).catch(function (err) {
    if (fail) fail.style.display = 'block';
    if (window.console) console.error('Web3Forms request failed:', err);
  }).finally(function () {
    if (btn && label !== null) { if (btn.value !== undefined) btn.value = label; else btn.textContent = label; }
  });
}, true);  // capture phase at document level
