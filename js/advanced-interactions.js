/* ========== BLOCK: Opening Animation Logic START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const openingScreen = document.querySelector('.opening-screen');
  const skipButton = document.querySelector('.skip-button');
  const mainContent = document.querySelector('.main-content');
  
  // 隐藏主内容直到开屏动画完成
  if (mainContent) {
    mainContent.style.opacity = '0';
  }
  
  // 开屏动画总时长
  const animationDuration = 4000; // 4秒
  
  function finishOpening() {
    if (openingScreen) {
      openingScreen.classList.add('finished');
      setTimeout(() => {
        openingScreen.style.display = 'none';
        if (mainContent) {
          mainContent.style.opacity = '1';
          mainContent.style.transition = 'opacity 1s';
        }
      }, 1000);
    }
  }
  
  // 自动完成
  setTimeout(finishOpening, animationDuration);
  
  // 跳过按钮
  if (skipButton) {
    skipButton.addEventListener('click', finishOpening);
  }
});
/* ========== BLOCK: Opening Animation Logic END ========== */

/* ========== BLOCK: Custom Cursor START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // 跟踪鼠标位置
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('active');
    
    // 创建粒子轨迹（节流）
    if (Math.random() > 0.7) {
      createTrail(e.clientX, e.clientY);
    }
  });
  
  // 平滑跟随
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // 悬停效果
  const interactiveElements = document.querySelectorAll('a, button, .nav-link, .filter-tag, .card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
  
  // 创建粒子轨迹
  function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
      trail.remove();
    }, 800);
  }
});
/* ========== BLOCK: Custom Cursor END ========== */

/* ========== BLOCK: Scroll Reveal Animation START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
});
/* ========== BLOCK: Scroll Reveal Animation END ========== */

/* ========== BLOCK: Parallax Effect START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((el, index) => {
      const speed = el.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
});
/* ========== BLOCK: Parallax Effect END ========== */

/* ========== BLOCK: Magnetic Effect START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const magneticElements = document.querySelectorAll('.magnetic-element');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.3;
      const moveY = y * 0.3;
      
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
});
/* ========== BLOCK: Magnetic Effect END ========== */

/* ========== BLOCK: Page Transition Effect START ========== */
function createPageTransition() {
  const transition = document.querySelector('.page-transition');
  if (!transition) return;
  
  transition.classList.add('active');
  
  setTimeout(() => {
    transition.classList.remove('active');
  }, 1200);
}

// 在导航链接上应用
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      createPageTransition();
    });
  });
});
/* ========== BLOCK: Page Transition Effect END ========== */

/* ========== BLOCK: Glitch Text Trigger START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const glitchTexts = document.querySelectorAll('.glitch-text');
  
  glitchTexts.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.classList.add('active');
      setTimeout(() => {
        el.classList.remove('active');
      }, 300);
    });
  });
});
/* ========== BLOCK: Glitch Text Trigger END ========== */
