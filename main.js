(function () {
      // 1. Scroll progress bar
      var progressBar = document.getElementById('scroll-progress');
      function updateScrollProgress() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
        if (progressBar) {
          progressBar.style.transform = 'scaleX(' + progress + ')';
        }
      }
      window.addEventListener('scroll', updateScrollProgress, { passive: true });
      updateScrollProgress();

      // 2. Toast notification
      var toast = document.getElementById('toast');
      var toastMessage = document.getElementById('toast-message');
      var toastTimer = null;
      function showToast(msg) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = msg;
        toast.classList.add('visible');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toast.classList.remove('visible');
        }, 2800);
      }

      // 3. Mobile navigation drawer
      var mobileMenuBtn = document.getElementById('mobile-menu-btn');
      var mobileMenu = document.getElementById('mobile-menu');
      var menuIconOpen = document.getElementById('menu-icon-open');
      var menuIconClose = document.getElementById('menu-icon-close');

      function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('hidden');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }

      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
          var isHidden = mobileMenu.classList.contains('hidden');
          if (isHidden) {
            mobileMenu.classList.remove('hidden');
            if (menuIconOpen) menuIconOpen.classList.add('hidden');
            if (menuIconClose) menuIconClose.classList.remove('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
          } else {
            closeMobileMenu();
          }
        });
      }

      var mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
      mobileNavLinks.forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
      });

      // 4. Selected Work Filter Tabs
      var filterBtns = document.querySelectorAll('.work-filter-btn');
      var workCards = document.querySelectorAll('.work-card');
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var filter = btn.getAttribute('data-filter');
          filterBtns.forEach(function (b) {
            b.classList.remove('active');
          });
          btn.classList.add('active');

          workCards.forEach(function (card) {
            var cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });

      // 5. Expandable System Flow Diagrams
      var archBtns = document.querySelectorAll('.toggle-arch-btn');
      archBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = btn.getAttribute('data-target');
          var targetEl = document.getElementById(targetId);
          var spans = btn.querySelectorAll('span');
          if (!targetEl) return;
          var isHidden = targetEl.classList.contains('hidden');
          if (isHidden) {
            targetEl.classList.remove('hidden');
            if (spans[0]) spans[0].textContent = 'Hide System Flow';
            if (spans[1]) spans[1].textContent = '▴';
          } else {
            targetEl.classList.add('hidden');
            if (spans[0]) spans[0].textContent = 'Inspect System Flow';
            if (spans[1]) spans[1].textContent = '▾';
          }
        });
      });

      // 6. Copy Email Button
      var copyEmailBtn = document.getElementById('copy-email-btn');
      if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function () {
          var email = 'assisdevassy@gmail.com';
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(function () {
              showToast('Copied assisdevassy@gmail.com');
            }).catch(function () {
              fallbackCopy(email);
            });
          } else {
            fallbackCopy(email);
          }
        });
      }

      function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showToast('Copied ' + text);
        } catch (err) {
          showToast('Email: ' + text);
        }
        document.body.removeChild(ta);
      }

      // 7. Portrait Photo Previewer
      var photoInput = document.getElementById('photo-upload-input');
      var portraitPreview = document.getElementById('portrait-preview');
      var portraitPlaceholder = document.getElementById('portrait-placeholder');
      var resetPhotoBtn = document.getElementById('reset-photo-btn');
      var photoActionLabel = document.getElementById('photo-action-label');

      if (photoInput && portraitPreview && portraitPlaceholder) {
        photoInput.addEventListener('change', function (e) {
          var file = e.target.files && e.target.files[0];
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function (ev) {
            portraitPreview.src = ev.target.result;
            portraitPreview.classList.remove('hidden');
            portraitPlaceholder.classList.add('hidden');
            if (resetPhotoBtn) resetPhotoBtn.classList.remove('hidden');
            if (photoActionLabel) photoActionLabel.textContent = 'Change Photo';
            showToast('Portrait preview updated');
          };
          reader.readAsDataURL(file);
        });
      }

      if (resetPhotoBtn) {
        resetPhotoBtn.addEventListener('click', function () {
          if (portraitPreview) {
            portraitPreview.src = '';
            portraitPreview.classList.add('hidden');
          }
          if (portraitPlaceholder) portraitPlaceholder.classList.remove('hidden');
          resetPhotoBtn.classList.add('hidden');
          if (photoActionLabel) photoActionLabel.textContent = '+ Preview Photo';
          if (photoInput) photoInput.value = '';
          showToast('Reverted to monogram placeholder');
        });
      }

      // 8. 1-Page CV Modal
      var resumeModal = document.getElementById('resume-modal');
      var openResumeBtns = [
        document.getElementById('open-resume-btn'),
        document.getElementById('open-resume-mobile-btn'),
        document.getElementById('open-resume-inline-btn'),
        document.getElementById('open-resume-footer-btn')
      ];
      var closeResumeBtns = [
        document.getElementById('close-resume-btn'),
        document.getElementById('close-resume-footer-btn')
      ];

      function openResumeModal() {
        if (!resumeModal) return;
        closeMobileMenu();
        resumeModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add('hidden');
        document.body.style.overflow = '';
      }

      openResumeBtns.forEach(function (btn) {
        if (btn) btn.addEventListener('click', openResumeModal);
      });

      closeResumeBtns.forEach(function (btn) {
        if (btn) btn.addEventListener('click', closeResumeModal);
      });

      if (resumeModal) {
        resumeModal.addEventListener('click', function (e) {
          if (e.target === resumeModal) closeResumeModal();
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && resumeModal && !resumeModal.classList.contains('hidden')) {
          closeResumeModal();
        }
      });
    })();
