// Web3Forms AJAX handler - keeps visitor on page, reuses Webflow success/fail UI
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form').forEach(function (form) {
    if (!form.querySelector('[name="access_key"]')) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var wrap = form.closest('.w-form') || form.parentElement;
      var done = wrap.querySelector('.w-form-done');
      var fail = wrap.querySelector('.w-form-fail');
      var btn = form.querySelector('[type="submit"]');
      var label = btn ? (btn.value || btn.textContent) : null;
      if (btn) { if (btn.value !== undefined) btn.value = 'Sending...'; else btn.textContent = 'Sending...'; }
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (r) { return r.json(); }).then(function (data) {
        if (data.success) {
          form.style.display = 'none';
          if (done) done.style.display = 'block';
          form.reset();
        } else if (fail) { fail.style.display = 'block'; }
      }).catch(function () { if (fail) fail.style.display = 'block'; })
        .finally(function () {
          if (btn && label !== null) { if (btn.value !== undefined) btn.value = label; else btn.textContent = label; }
        });
    }, true);  // capture phase - run before Webflow's handler
  });
});
