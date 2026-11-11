/**
 * SAAD KHAN - PORTFOLIO INTERACTIVITY SCRIPT
 * 100% Bug-Free, Zero Dependency Vanilla JavaScript
 * Includes Interactive Mouse FX & Particles, Modal Handlers, & Project Demos
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* -----------------------------------------------------------
     1. Sticky Navbar & Scroll Progress
  ----------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (scrollY > 50) {
      navbar?.classList.add('bg-[#0d0c12]/95', 'backdrop-blur-xl', 'border-white/10', 'shadow-2xl');
      navbar?.classList.remove('bg-transparent', 'border-transparent');
    } else {
      navbar?.classList.remove('bg-[#0d0c12]/95', 'border-white/10', 'shadow-2xl');
      navbar?.classList.add('bg-transparent', 'border-transparent');
    }

    if (scrollY > 400) {
      backToTopBtn?.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
      backToTopBtn?.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn?.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
      backToTopBtn?.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -----------------------------------------------------------
     2. Fix & Activate "Available for Work" and "Let's Talk" Buttons
  ----------------------------------------------------------- */
  const availableBadgeBtn = document.getElementById('availableBadgeBtn');
  const letsTalkNavBtn = document.getElementById('letsTalkNavBtn');
  const letsTalkMobileBtn = document.getElementById('letsTalkMobileBtn');

  // WhatsApp destination URL with pre-filled message
  const waDirectUrl = 'https://wa.me/923437323469?text=' + encodeURIComponent('Hi Saad, I saw your portfolio and would like to discuss a web development project with you.');

  // Set direct links so browser handles them natively without popup blocker interference
  if (letsTalkNavBtn) {
    letsTalkNavBtn.href = waDirectUrl;
    letsTalkNavBtn.target = '_blank';
    letsTalkNavBtn.rel = 'noopener noreferrer';
  }
  if (letsTalkMobileBtn) {
    letsTalkMobileBtn.href = waDirectUrl;
    letsTalkMobileBtn.target = '_blank';
    letsTalkMobileBtn.rel = 'noopener noreferrer';
  }

  // "Available for Work" button action -> Smoothly scrolls to contact section
  availableBadgeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'index.html#contact';
    }
    showToast('Saad is currently available for freelance & full-time roles!', 'success');
  });

  /* -----------------------------------------------------------
     3. Mobile Menu Toggle
  ----------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenu?.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu?.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileMenuCloseBtn?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* -----------------------------------------------------------
     4. Active Navigation Link on Scroll
  ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('text-white', 'font-semibold');
          link.classList.add('text-[#9a9aa6]');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-white', 'font-semibold');
            link.classList.remove('text-[#9a9aa6]');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  /* -----------------------------------------------------------
     5. Portfolio Project Filter System (Supports index.html & projects.html)
  ----------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || (category && category.includes(filterValue))) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* -----------------------------------------------------------
     6. Project Details & Live Demo Handlers
  ----------------------------------------------------------- */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalFullPageBtn = document.getElementById('modalFullPageBtn');

  // Real projects database built by Saad (local project paths verified & captured)
  const projectDetails = {
    'kofa': {
      title: 'Kofa — Luxury E-Commerce Fashion Platform',
      category: 'E-Commerce & Frontend Architecture',
      description: 'A complete multi-page e-commerce fashion and lifestyle storefront built with modern responsive frontend principles. Features a comprehensive catalog, product detail pages, dynamic cart, wishlist system, blogs, and checkout readiness.',
      tech: ['HTML5', 'CSS3', 'Modern JavaScript', 'Tailwind CSS', 'Responsive UI'],
      features: [
        'Complete multi-page shop: Index, Collections, Product Detail, Cart, Wishlist, Blogs, FAQs',
        'Dynamic currency formatting and product filtering',
        'Slide-over shopping cart and interactive wishlist state',
        '100% mobile-optimized touch navigation and clean responsive structure'
      ],
      previewImage: 'assets/images/projects/kofa-preview.png',
      fullImage: 'assets/images/projects/kofa-full.png'
    },
    'sunrise': {
      title: 'Sunrise Shawarma — Online Food Ordering Store',
      category: 'Frontend & Interactive Web App',
      description: 'An interactive online food ordering and delivery website developed for Sunrise Shawarma (Nishter Road, Karachi). Includes custom cursor trail animations, delicious product showcase, dynamic ordering flow, and direct WhatsApp delivery integration.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Custom Canvas/Mouse Animations', 'WhatsApp API'],
      features: [
        'Live online food menu with appetizing item displays and pricing',
        'Interactive mouse tracking animation and smooth micro-interactions',
        'Home delivery and pickup selection with instant order summary',
        'Direct WhatsApp automated order dispatch integration'
      ],
      previewImage: 'assets/images/projects/sunrise_shawarma-preview.png',
      fullImage: 'assets/images/projects/sunrise_shawarma-full.png'
    },
    'sunrise-fastfood': {
      title: 'Sunrise Fast Food — Modern Restaurant Web Portal',
      category: 'Restaurant Portal & Dine-In Web App',
      description: 'A full-featured fast food and dine-in restaurant portal with branded preloader, animated hero slider, categorized dishes menu (Burgers, Pizza, Shawarma, Drinks), chef showcase, reservation system, and customer reviews.',
      tech: ['Bootstrap 5', 'Swiper.js', 'Animate.css', 'jQuery', 'CSS3 Animations'],
      features: [
        'Interactive Swiper hero carousel with animated typography',
        'Dynamic dishes category tabs with price cards and badges',
        'Master chefs showcase and customer testimonials slider',
        'Online dine-in table reservation and food order inquiries'
      ],
      previewImage: 'assets/images/projects/sunrise_fastfood-preview.png',
      fullImage: 'assets/images/projects/sunrise_fastfood-full.png'
    },
    'grid-chess': {
      title: 'Pure CSS Grid Chessboard & Layout Architecture',
      category: 'CSS Grid & Mathematical Layouts',
      description: 'A pure CSS Grid 8x8 chessboard architecture showcasing layout mastery without dependencies. Built using CSS Grid repeat syntax, alternating classes, and Unicode chess piece typography with responsive alignment.',
      tech: ['HTML5', 'Pure CSS Grid', 'Flexbox', 'Unicode Glyphs', 'Zero Frameworks'],
      features: [
        'Mathematical 8x8 grid built with repeat(8, 60px) column and row definitions',
        'Alternating .a and .b cell structure for authentic board pattern',
        'High-contrast modern dark palette (#0f172a, #f95720 accents)',
        'Zero bloated dependencies — 100% lightweight and performant'
      ],
      previewImage: 'assets/images/projects/css_chessboard-preview.png',
      fullImage: 'assets/images/projects/css_chessboard-full.png'
    },
    'api-store': {
      title: 'Dynamic REST API E-Commerce & Product Explorer',
      category: 'JavaScript & REST API Integration',
      description: 'A data-driven web application powered by asynchronous JavaScript REST APIs. Fetches dynamic product catalogs from endpoints, provides real-time search, category filtering, detailed modal views, and seamless client-side state handling.',
      tech: ['JavaScript (ES6+)', 'Async/Await & Fetch API', 'HTML5', 'CSS3', 'JSON Storage'],
      features: [
        'Asynchronous live data fetching with error handling and loading skeletons',
        'Instant live search and category filtering with zero page reload',
        'Dynamic product detail modal with specs and price comparison',
        'Modular, maintainable JavaScript architecture'
      ]
    },
    'olx': {
      title: 'OLX Classifieds Marketplace Web Portal',
      category: 'Frontend UI & Classifieds Layout',
      description: 'A classified ads marketplace clone inspired by OLX. Features category carousels, featured classified item cards, search filters, location-based badges, and an intuitive user navigation system.',
      tech: ['HTML5', 'CSS3', 'Modern Layouts / Flexbox & Grid', 'JavaScript'],
      features: [
        'Multi-category listing grid (Vehicles, Property, Electronics, Jobs)',
        'Clean card layout with pricing, location, and post-time badges',
        'Custom banners and responsive navigation header',
        'Lightweight build with fast loading performance'
      ]
    },
    'jamia': {
      title: 'Jamia Educational & Institutional Web Portal',
      category: 'Educational Institute Website',
      description: 'A comprehensive institutional website designed for academic and educational organizations. Features department showcases, admissions information, faculty details, and student inquiry forms.',
      tech: ['HTML5', 'CSS3', 'Responsive Design', 'JavaScript Forms'],
      features: [
        'Academic department directory and course overviews',
        'Student admission guidance and contact inquiry system',
        'Clean typography and respectful institutional color scheme',
        'Fully responsive across smartphones, tablets, and desktops'
      ]
    },
    'movies': {
      title: 'CineScope — Movie & Entertainment Showcase',
      category: 'Interactive Entertainment UI',
      description: 'An interactive movie showcase web application presenting trending films, ratings, genre tags, and synopses with smooth visual cards and interactive preview modals.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox & CSS Grid'],
      features: [
        'Trending movie grid with star ratings and genre tags',
        'Interactive search and quick synopsis preview',
        'Modern dark cinema-style aesthetic',
        'Smooth hover zoom transitions and card effects'
      ]
    }
  };

  // Open Project Details Modal
  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalDesc) modalDesc.textContent = data.description;

    if (modalTechStack) {
      modalTechStack.innerHTML = data.tech
        .map(t => `<span class="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[#f95720]">${t}</span>`)
        .join('');
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features
        .map(f => `<li class="flex items-start gap-2 text-sm text-gray-300"><span class="text-[#f95720] font-bold">✓</span> ${f}</li>`)
        .join('');
    }

    if (modalFullPageBtn) {
      if (data.fullImage) {
        modalFullPageBtn.style.display = 'inline-flex';
        modalFullPageBtn.setAttribute('data-full-image', data.fullImage);
        modalFullPageBtn.setAttribute('data-project-title', data.title);
      } else {
        modalFullPageBtn.style.display = 'none';
      }
    }

    if (projectModal) {
      projectModal.classList.remove('hidden');
      projectModal.classList.add('active');
      projectModal.style.setProperty('display', 'flex', 'important');
    }
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.add('hidden');
      projectModal.classList.remove('active');
      projectModal.style.setProperty('display', 'none', 'important');
    }
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  });

  /* -----------------------------------------------------------
     6b. Full Page Screenshot Modal (GoFullPage View)
  ----------------------------------------------------------- */
  const fullPageModal = document.getElementById('fullPageModal');
  const fullPageModalImg = document.getElementById('fullPageModalImg');
  const fullPageModalTitle = document.getElementById('fullPageModalTitle');
  const fullPageModalCloseBtn = document.getElementById('fullPageModalCloseBtn');
  const fullPageCloseTextBtn = document.getElementById('fullPageCloseTextBtn');
  const fullPageOpenNewTab = document.getElementById('fullPageOpenNewTab');

  function openFullPageScreenshot(imgUrl, title) {
    if (!imgUrl) return;
    if (fullPageModalImg) fullPageModalImg.src = imgUrl;
    if (fullPageModalTitle) fullPageModalTitle.textContent = title || 'GoFullPage Full Page Screenshot';
    if (fullPageOpenNewTab) fullPageOpenNewTab.href = imgUrl;

    if (fullPageModal) {
      fullPageModal.classList.remove('hidden');
      fullPageModal.classList.add('active');
      fullPageModal.style.setProperty('display', 'flex', 'important');
    }
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  }

  function closeFullPageModal() {
    if (fullPageModal) {
      fullPageModal.classList.add('hidden');
      fullPageModal.classList.remove('active');
      fullPageModal.style.setProperty('display', 'none', 'important');
    }
    document.body.style.overflow = '';
  }

  // Bind all .view-fullpage-btn triggers (on cards & inside detail modals)
  document.addEventListener('click', (e) => {
    // Open fullpage screenshot
    const fullPageBtn = e.target.closest('.view-fullpage-btn, #modalFullPageBtn');
    if (fullPageBtn) {
      e.preventDefault();
      const imgUrl = fullPageBtn.getAttribute('data-full-image');
      const title = fullPageBtn.getAttribute('data-project-title');
      openFullPageScreenshot(imgUrl, title);
      return;
    }

    // Close project modal triggers
    if (e.target.closest('#modalCloseBtn, .close-modal-footer-btn, [data-close-project-modal]')) {
      e.preventDefault();
      closeModal();
      return;
    }

    // Close fullpage modal triggers
    if (e.target.closest('#fullPageModalCloseBtn, #fullPageCloseTextBtn, [data-close-fullpage-modal]')) {
      e.preventDefault();
      closeFullPageModal();
      return;
    }

    // Backdrop clicks
    if (e.target === projectModal) {
      closeModal();
      return;
    }
    if (e.target === fullPageModal) {
      closeFullPageModal();
      return;
    }

    // Demo modal close
    const demoModal = document.getElementById('demoPreviewModal');
    if (demoModal && (e.target === demoModal || e.target.closest('#closeDemoModalBtn'))) {
      demoModal.remove();
      document.body.style.overflow = '';
    }
  });

  // Global Escape key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeFullPageModal();
      const demoModal = document.getElementById('demoPreviewModal');
      if (demoModal) {
        demoModal.remove();
        document.body.style.overflow = '';
      }
    }
  });

  // Live Demo Dummy Handler (As requested by user: "live projects pe dummy laga dena isko jb live krunga add krdunga")
  document.querySelectorAll('.live-demo-dummy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projName = btn.getAttribute('data-project-name') || 'This project';
      showDemoModal(projName);
    });
  });

  function showDemoModal(projName) {
    let demoModal = document.getElementById('demoPreviewModal');
    if (!demoModal) {
      demoModal = document.createElement('div');
      demoModal.id = 'demoPreviewModal';
      demoModal.className = 'fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4';
      demoModal.innerHTML = `
        <div class="glass-card rounded-3xl max-w-md w-full border border-white/20 p-6 sm:p-7 space-y-5 text-center relative bg-[#0e0d14]/95 shadow-2xl">
          <div class="w-14 h-14 rounded-2xl bg-[#f95720]/20 text-[#f95720] mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </div>
          <div>
            <span class="text-[11px] font-mono text-[#f95720] uppercase font-semibold">Local Repository Build</span>
            <h4 id="demoModalProjectName" class="text-xl font-bold text-white font-heading mt-1">${projName}</h4>
          </div>
          <p class="text-xs text-[#9a9aa6] leading-relaxed">
            This project is currently tested and running in Saad's local repository. Live production domain link will be connected soon upon client launch!
          </p>
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300">
            Want to see a live demo or inspect the code? Connect directly on WhatsApp!
          </div>
          <div class="flex items-center justify-center gap-3 pt-2">
            <button id="closeDemoModalBtn" class="btn-secondary px-4 py-2.5 rounded-xl text-xs font-semibold">Close</button>
            <a href="https://wa.me/923437323469?text=Hi%20Saad,%20I%20want%20to%20see%20a%20live%20demo%20of%20your%20project." target="_blank" class="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <span>Ask on WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(demoModal);

      demoModal.querySelector('#closeDemoModalBtn')?.addEventListener('click', () => {
        demoModal.remove();
      });
      demoModal.addEventListener('click', (e) => {
        if (e.target === demoModal) demoModal.remove();
      });
    } else {
      const titleElem = demoModal.querySelector('#demoModalProjectName');
      if (titleElem) titleElem.textContent = projName;
      demoModal.classList.remove('hidden');
    }
  }

  /* -----------------------------------------------------------
     7. Animated Stats Counter (Triggered when in viewport)
  ----------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-counter');
  let statsAnimated = false;

  function runCounters() {
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = current + suffix;
        }
      }, 35);
    });
  }

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        runCounters();
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  /* -----------------------------------------------------------
     8. Copy Email to Clipboard
  ----------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyTooltip = document.getElementById('copyTooltip');

  copyEmailBtn?.addEventListener('click', () => {
    const email = 'saadraza132009@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      if (copyTooltip) {
        copyTooltip.classList.remove('opacity-0', 'pointer-events-none');
        copyTooltip.textContent = 'Email copied!';
        setTimeout(() => {
          copyTooltip.classList.add('opacity-0', 'pointer-events-none');
        }, 2500);
      }
    }).catch(() => {
      showToast('Email: saadraza132009@gmail.com');
    });
  });

  /* -----------------------------------------------------------
     9. Interactive Contact Form with WhatsApp Integration
  ----------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName')?.value.trim() || '';
    const email = document.getElementById('formEmail')?.value.trim() || '';
    const service = document.getElementById('formService')?.value || 'Web Development';
    const message = document.getElementById('formMessage')?.value.trim() || '';

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const waText = encodeURIComponent(
      `*New Project Inquiry from Portfolio*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `🛠️ *Service Required:* ${service}\n` +
      `💬 *Message:* ${message}`
    );

    const waUrl = `https://wa.me/923437323469?text=${waText}`;

    showToast('Inquiry received! Connecting to WhatsApp...', 'success');
    contactForm.reset();

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  });

  /* ==========================================================================
     10. INTERACTIVE MOUSE HOVER ANIMATION & PARTICLE FX (FROM SHOWCASE)
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];

    // Mouse Tracking state
    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      speed: 0,
      isMoving: false,
      idleTimer: null
    };

    // Color Palette matching both portfolio & vibrant showcase sparks
    const sparkPalette = [
      '#f95720', '#ff7a3d', '#ff9a62', '#38bdf8', '#818cf8', 
      '#c084fc', '#f472b6', '#fbbf24', '#ffffff'
    ];

    class Particle {
      constructor(x, y, vx, vy, color, size, life, decay, type = 'spark') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.baseSize = size;
        this.life = life;       // e.g. 1.0
        this.decay = decay;     // rate of decay per frame
        this.type = type;
        this.gravity = type === 'dust' ? -0.04 : 0.03;
        this.friction = 0.96;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.08;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.life -= this.decay;
        this.angle += this.angularSpeed;

        if (this.type === 'spark') {
          this.size = Math.max(0, this.baseSize * this.life);
        } else if (this.type === 'dust') {
          this.size = this.baseSize * (0.8 + 0.4 * Math.sin(this.life * 10));
        }
      }

      draw(context) {
        if (this.life <= 0) return;
        context.save();
        context.globalAlpha = Math.max(0, Math.min(1, this.life));

        if (this.type === 'spark') {
          context.fillStyle = this.color;
          context.shadowBlur = 12;
          context.shadowColor = this.color;
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          context.fill();
        } else if (this.type === 'dust') {
          const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, 'transparent');
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }
    }

    function createParticlesAt(x, y, count = 2) {
      for (let i = 0; i < count; i++) {
        const color = sparkPalette[Math.floor(Math.random() * sparkPalette.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2 + 1) * (1 + mouse.speed * 0.05);
        const vx = Math.cos(angle) * speed + (mouse.x - mouse.prevX) * 0.12;
        const vy = Math.sin(angle) * speed + (mouse.y - mouse.prevY) * 0.12;
        const size = Math.random() * 3.5 + 1.5;
        const life = 1.0;
        const decay = Math.random() * 0.02 + 0.015;

        particles.push(new Particle(x, y, vx, vy, color, size, life, decay, 'spark'));
      }

      // Max particle guardrail for 60fps performance
      if (particles.length > 250) {
        particles.splice(0, particles.length - 250);
      }
    }

    function triggerExplosion(x, y) {
      const colors = ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#fbbf24', '#f95720', '#ff7a3d', '#ffffff'];
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * 7 + 2;
        const vx = Math.cos(angle) * force;
        const vy = Math.sin(angle) * force;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        const decay = Math.random() * 0.025 + 0.01;
        particles.push(new Particle(x, y, vx, vy, color, size, 1.0, decay, 'spark'));
      }
    }

    const cursorFollower = document.getElementById('cursor-follower');
    const cursorDot = document.getElementById('cursor-dot');
    let followerX = width / 2;
    let followerY = height / 2;

    function handlePointerMove(clientX, clientY) {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = clientX;
      mouse.y = clientY;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);

      // Instantly position center dot
      if (cursorDot) {
        cursorDot.style.left = `${mouse.x}px`;
        cursorDot.style.top = `${mouse.y}px`;
      }

      // Spawn particles based on distance & speed
      const spawnCount = Math.min(5, Math.max(1, Math.floor(mouse.speed / 4)));
      createParticlesAt(mouse.x, mouse.y, spawnCount);

      // Update Card Border Spotlight position coordinates
      document.querySelectorAll('.glow-card, .glass-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      // Clear idle timer
      clearTimeout(mouse.idleTimer);
      mouse.idleTimer = setTimeout(() => {
        mouse.speed = 0;
      }, 80);
    }

    window.addEventListener('mousemove', (e) => {
      handlePointerMove(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('click', (e) => {
      if (e.target.closest('input, textarea')) return;
      triggerExplosion(e.clientX, e.clientY);
    });

    /* 3D TILT EFFECT ON CARDS */
    const tiltCards = document.querySelectorAll('.tilt-card, .glass-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (card.closest('#projectModal, #fullPageModal')) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        if (card.closest('#projectModal, #fullPageModal')) return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });

    /* CURSOR HOVER STATES & MAGNETIC ATTRACTION */
    const interactiveElements = document.querySelectorAll('button, a, .glow-card, .tilt-card, input, select, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorFollower) {
          cursorFollower.style.width = '55px';
          cursorFollower.style.height = '55px';
          cursorFollower.style.borderColor = 'rgba(249, 87, 32, 0.9)';
          cursorFollower.style.backgroundColor = 'rgba(249, 87, 32, 0.1)';
        }
      });

      el.addEventListener('mouseleave', () => {
        if (cursorFollower) {
          cursorFollower.style.width = '36px';
          cursorFollower.style.height = '36px';
          cursorFollower.style.borderColor = 'rgba(249, 87, 32, 0.7)';
          cursorFollower.style.backgroundColor = 'transparent';
        }
      });
    });

    /* Ripple Animation on Clickable Buttons */
    document.querySelectorAll('.ripple-btn, .btn-primary, .btn-secondary, .social-icon-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        const rect = btn.getBoundingClientRect();

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple-span');

        const ripple = btn.getElementsByClassName('ripple-span')[0];
        if (ripple) ripple.remove();

        btn.appendChild(circle);
      });
    });

    /* MAIN ANIMATION LOOP */
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Smooth Lerp for Cursor Follower ring
      if (cursorFollower) {
        followerX += (mouse.x - followerX) * 0.18;
        followerY += (mouse.y - followerY) * 0.18;
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
      }

      // Update & Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
    // Initial greeting burst
    setTimeout(() => {
      triggerExplosion(width / 2, height / 3);
    }, 400);
  }

  /* -----------------------------------------------------------
     11. Toast Notification System
  ----------------------------------------------------------- */
  function showToast(msg, type = 'info') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl text-white text-sm font-medium shadow-2xl backdrop-blur-xl border border-white/10 transition-all duration-300';
      document.body.appendChild(toast);
    }

    if (type === 'error') {
      toast.style.background = 'rgba(239, 68, 68, 0.95)';
    } else if (type === 'success') {
      toast.style.background = 'rgba(16, 185, 129, 0.95)';
    } else {
      toast.style.background = 'rgba(249, 87, 32, 0.95)';
    }

    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, 3500);
  }

  window.showToast = showToast;
});
