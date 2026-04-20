// ========== BLOCK: Navigation & Page Switching START ==========

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const staticTransition = createStaticTransition();

  // 导航切换
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.dataset.section;
      switchSection(targetSection);
    });
  });

  function switchSection(targetId) {
    // 显示噪音过渡
    staticTransition.classList.add('active');

    setTimeout(() => {
      // 切换section
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === `${targetId}-section`) {
          section.classList.add('active');
        }
      });

      // 更新导航状态
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === targetId) {
          link.classList.add('active');
        }
      });

      // 移除过渡效果
      setTimeout(() => {
        staticTransition.classList.remove('active');
      }, 300);
    }, 250);
  }

  function createStaticTransition() {
    const div = document.createElement('div');
    div.className = 'static-transition';
    div.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-base);
      z-index: 10000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(div);
    
    // 添加激活状态的样式
    const style = document.createElement('style');
    style.textContent = `
      .static-transition.active {
        opacity: 1;
        pointer-events: all;
      }
    `;
    document.head.appendChild(style);
    
    return div;
  }

  // 黑胶唱片播放控制
  const vinylPlayer = document.getElementById('vinyl-player');
  const ambientNoise = document.getElementById('ambient-noise');
  let isPlaying = false;

  if (vinylPlayer && ambientNoise) {
    vinylPlayer.addEventListener('click', () => {
      if (isPlaying) {
        ambientNoise.pause();
        vinylPlayer.style.opacity = '0.7';
      } else {
        ambientNoise.play();
        vinylPlayer.style.opacity = '1';
      }
      isPlaying = !isPlaying;
    });
  }

  // Intersection Observer - 滚动触发动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  // 观察所有需要动画的元素
  const animatedElements = document.querySelectorAll(
    '.character-card, .beautify-item, .preset-card, .vinyl-item'
  );
  
  animatedElements.forEach(el => observer.observe(el));

  // 移动端导航切换
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});

// ========== BLOCK: Navigation & Page Switching END ==========

// ========== BLOCK: Lightbox Functionality START ==========

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

let currentImageIndex = 0;
let currentImages = [];

function openLightbox(imageSrc, caption, images = []) {
  if (!lightbox || !lightboxImg) return;
  
  lightboxImg.src = imageSrc;
  if (lightboxCaption) {
    lightboxCaption.textContent = caption || '';
  }
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  currentImages = images;
  currentImageIndex = images.findIndex(img => img.src === imageSrc);
}

function closeLightbox() {
  if (!lightbox) return;
  
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
      closeLightbox();
    }
  });
}

// 键盘导航
document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  }
});

function navigateLightbox(direction) {
  if (currentImages.length === 0 || !lightboxImg) return;
  
  currentImageIndex = (currentImageIndex + direction + currentImages.length) % currentImages.length;
  const newImage = currentImages[currentImageIndex];
  lightboxImg.src = newImage.src;
  if (lightboxCaption) {
    lightboxCaption.textContent = newImage.caption || '';
  }
}

// 上一张/下一张按钮
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

if (prevBtn) {
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => navigateLightbox(1));
}

// ========== BLOCK: Lightbox Functionality END ==========

// ========== 自定义鼠标 ==========
const cursor = document.querySelector('.custom-cursor');

if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // 鼠标悬停效果
  const interactiveElements = document.querySelectorAll('a, button, .nav-link, .character-card, .vinyl-record');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// 开屏动画完成后启用自定义鼠标
document.addEventListener('openingComplete', () => {
  if (cursor) {
    cursor.style.display = 'block';
  }
  // 可选：隐藏默认鼠标
  // document.body.style.cursor = 'none';
});


