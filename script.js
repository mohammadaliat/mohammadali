document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  const myProjectBtn = document.getElementById('myProject');
  if (myProjectBtn) {
    myProjectBtn.addEventListener('click', () => {
      window.open('https://mohammadali.site', '_blank');
    });
  }

  const moreBtn = document.querySelector('.dropdownbutton');
  const dropdown = document.querySelector('.dropdown-content');

  if (moreBtn && dropdown) {
      moreBtn.addEventListener('click', (e) => {
          e.preventDefault(); 
          e.stopPropagation();
          dropdown.classList.toggle('show-dropdown');
      });

      window.addEventListener('click', (e) => {
          if (!moreBtn.contains(e.target) && !dropdown.contains(e.target)) {
              dropdown.classList.remove('show-dropdown');
          }
      });
  }
});

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

(function(){
  const form = document.getElementById('submit-form');
  if (!form) return;
  const successDisplayMs = 5000;

  let msg = document.getElementById('submitMessage');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'submitMessage';
    msg.className = 'submit-message';
    msg.setAttribute('role', 'status');
    msg.setAttribute('aria-live', 'polite');
    msg.style.marginTop = '10px';
    form.parentNode.insertBefore(msg, form.nextSibling);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let didSucceed = false;
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';
    const url = 'https://script.google.com/macros/s/AKfycbwL3lpOH4V5UBBz1TI-BXiOkRnnaFYHfY1D7ckuFAsJubYI6tOTAHyZnbOLgGPRtdyD/exec';

    const showMessage = (type, text) => {
      msg.textContent = text;
      msg.classList.remove('success', 'error');
      msg.classList.add(type);
      // auto-hide success messages after 5s
      if (type === 'success') {
        setTimeout(() => { msg.textContent = ''; msg.classList.remove('success'); }, 7000);
      }
    };

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.setAttribute('aria-busy', 'true');
      }

      const formData = new FormData(form);
      const body = new URLSearchParams();
      for (const pair of formData) body.append(pair[0], pair[1]);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: body.toString()
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const successBtnText = 'Thank you :)';
      if (submitBtn) {
        submitBtn.textContent = successBtnText;
        submitBtn.disabled = true;
        submitBtn.classList.add('success');
      }

      showMessage('success', "Thanks❤️! Your message was sent successfully — i'll get back to you soon. ✅");
      form.reset();
      didSucceed = true;

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText || 'Send Message';
          submitBtn.classList.remove('success');
        }
        window.location.reload();
      }, successDisplayMs);
    } catch (err) {
      console.error('Form submit error', err);
      showMessage('error', 'Sorry, something went wrong. Please try again later or contact me directly.');
    } finally {
      if (submitBtn) {
        if (!didSucceed) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText || 'Submit';
        }
        submitBtn.removeAttribute('aria-busy');
      }
    }
  });
})();

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); 
  });

// --- Active Link on Scroll Logic ---
const sections = document.querySelectorAll('section[id]');
const navLinkElems = document.querySelectorAll('.nav-links a');

const options = {
    threshold: 0.6
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinkElems.forEach(link => {
                link.classList.remove('active-link');
                // Check if the link href matches the current section id
                if (link.getAttribute('href').includes(`#${id}`)) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}, options);

// Start observing each section
sections.forEach(section => observer.observe(section));

