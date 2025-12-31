
(function(){
  const btn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-navlinks]');
  if(btn && nav){
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
    });
  }

  // Contact form: lightweight mailto fallback + success message
  const form = document.querySelector('form[data-contact-form]');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const level = form.querySelector('[name="level"]').value;
      const message = form.querySelector('[name="message"]').value.trim();
      const subject = encodeURIComponent('Legacy Music Academy — Lesson Inquiry');
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nLevel: ${level}\n\nMessage:\n${message}`
      );
      const email = form.getAttribute('data-email');
      // Open user's default email client
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      const ok = document.querySelector('[data-success]');
      if(ok){ ok.classList.add('show'); }
      form.reset();
    });
  }

  // Copy-to-clipboard buttons
  document.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const text = btn.getAttribute('data-copy');
      try{
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(()=>btn.textContent=old, 1200);
      }catch(e){
        // fallback
        window.prompt('Copy this:', text);
      }
    });
  });
})();
