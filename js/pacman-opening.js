/* ========== BLOCK: Pacman Ghost Opening Animation Logic START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const openingScreen = document.querySelector('.opening-screen');
  const skipButton = document.querySelector('.skip-button');
  const mainContent = document.querySelector('.main-content');
  
  // 隐藏主内容
  if (mainContent) {
    mainContent.style.opacity = '0';
  }
  
  let animationSkipped = false;
  
  // 动画时间轴
  const timeline = {
    dotsEaten: 3000,      // 3s - 豆豆吃完
    show404: 4000,        // 4s - 显示404
    showWait: 5500,       // 5.5s - 显示wait really
    showWelcome: 7000,    // 7s - 显示welcome
    ghostDissolve: 9000,  // 9s - 幽灵消散
    finish: 10000         // 10s - 完成
  };
  
  // 生成豆豆
  function generateDots() {
    const dotsPath = document.querySelector('.dots-path');
    if (!dotsPath) return;
    
    const positions = [
      { x: 20, y: 50 }, { x: 30, y: 40 }, { x: 40, y: 30 },
      { x: 50, y: 35 }, { x: 60, y: 45 }, { x: 70, y: 55 },
      { x: 80, y: 50 }, { x: 85, y: 40 }, { x: 75, y: 30 },
      { x: 65, y: 25 }, { x: 55, y: 30 }, { x: 45, y: 40 },
      { x: 35, y: 50 }, { x: 25, y: 60 }, { x: 35, y: 70 },
      { x: 50, y: 65 }, { x: 65, y: 70 }, { x: 75, y: 65 }
    ];
    
    positions.forEach((pos, index) => {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.left = `${pos.x}%`;
      dot.style.top = `${pos.y}%`;
      dotsPath.appendChild(dot);
      
      // 逐个吃掉豆豆
      setTimeout(() => {
        if (!animationSkipped) {
          dot.classList.add('eaten');
        }
      }, 150 * index);
    });
  }
  
  // 场景1: 幽灵吃豆豆
  generateDots();
  
  // 场景2: 显示404
  setTimeout(() => {
    if (animationSkipped) return;
    
    const gameContainer = document.querySelector('.game-container');
    const openingText = document.querySelector('.opening-text');
    const screenFlash = document.querySelector('.screen-flash');
    
    if (gameContainer) gameContainer.style.opacity = '0';
    if (screenFlash) {
      screenFlash.classList.add('active');
      setTimeout(() => screenFlash.classList.remove('active'), 500);
    }
    
    if (openingText) {
      openingText.innerHTML = `
        <div class="text-404">404</div>
        <div class="text-not-found">NOT FOUND!!</div>
      `;
      openingText.style.opacity = '1';
    }
  }, timeline.show404);
  
  // 场景3: 显示 wait really
  setTimeout(() => {
    if (animationSkipped) return;
    
    const openingText = document.querySelector('.opening-text');
    if (openingText) {
      openingText.innerHTML = `
        <div class="text-wait">wait, really?.....</div>
      `;
    }
  }, timeline.showWait);
  
  // 场景4: 显示 welcome
  setTimeout(() => {
    if (animationSkipped) return;
    
    const openingText = document.querySelector('.opening-text');
    const ghost = document.querySelector('.ghost');
    const gameContainer = document.querySelector('.game-container');
    
    if (gameContainer) gameContainer.style.opacity = '1';
    if (ghost) {
      ghost.classList.add('turn-around');
      ghost.style.animation = 'none';
      ghost.style.left = '50%';
      ghost.style.top = '50%';
    }
    
    if (openingText) {
      openingText.innerHTML = `
        <div class="text-welcome">WELCOME TO<br>SHADOW'S PLACE!!</div>
        <div class="text-subtitle">玉元一的噪音档案</div>
      `;
    }
  }, timeline.showWelcome);
  
  // 场景5: 幽灵消散
  setTimeout(() => {
    if (animationSkipped) return;
    
    const ghost = document.querySelector('.ghost');
    if (ghost) {
      ghost.classList.add('dissolve');
      createParticles(ghost);
    }
  }, timeline.ghostDissolve);
  
  // 场景6: 完成
  setTimeout(() => {
    if (!animationSkipped) {
      finishOpening();
    }
  }, timeline.finish);
  
  // 创建粒子效果
  function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = (Math.PI * 2 * i) / 30;
      const distance = 100 + Math.random() * 100;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 2000);
    }
  }
  
  // 完成动画
  function finishOpening() {
    animationSkipped = true;
    
    if (openingScreen) {
      openingScreen.classList.add('finished');
      setTimeout(() => {
        openingScreen.style.display = 'none';
        if (mainContent) {
          mainContent.style.opacity = '1';
          mainContent.style.transition = 'opacity 1s';
        }
      }, 800);
    }
  }
  
  // 跳过按钮
  if (skipButton) {
    skipButton.addEventListener('click', finishOpening);
  }
  
  // 按任意键跳过
  document.addEventListener('keydown', (e) => {
    if (!animationSkipped) {
      finishOpening();
    }
  }, { once: true });
});
/* ========== BLOCK: Pacman Ghost Opening Animation Logic END ========== */

/* ========== BLOCK: Custom Cursor START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('active');
    
    // 创建粒子轨迹（节流）
    if (Math.random() > 0.8) {
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
  const interactiveElements = document.querySelectorAll('a, button, .nav-link, .filter-tag, .card, .vinyl-container, .cassette, .sticker');
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
    
    setTimeout(() => trail.remove(), 800);
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

/* ========== BLOCK: Page Transition Effect START ========== */
function createPageTransition() {
  const transition = document.querySelector('.page-transition');
  if (!transition) return;
  
  transition.classList.add('active');
  
  setTimeout(() => {
    transition.classList.remove('active');
  }, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      createPageTransition();
    });
  });
});
/* ========== BLOCK: Page Transition Effect END ========== */
