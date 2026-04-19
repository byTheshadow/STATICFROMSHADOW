/* ========== BLOCK: Pacman Ghost Opening Animation Script START ========== */

document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    screen: document.getElementById('opening-screen'),
    ghost: document.getElementById('ghost'),
    dots: document.querySelectorAll('.dot'),
    flash: document.getElementById('screen-flash'),
    text404: document.getElementById('text-404'),
    textWait: document.getElementById('text-wait'),
    textWelcome: document.getElementById('text-welcome'),
    mazeBg: document.getElementById('maze-bg'),
    dotsPath: document.getElementById('dots-path'),
    skipBtn: document.getElementById('skip-btn'),
    gameContainer: document.getElementById('game-container')
  };

  // 如果没有找到屏幕，说明动画已播放过或被移除，直接跳过
  if (!elements.screen) return;

  let timeline = [];

  const clearTimeline = () => {
    timeline.forEach(clearTimeout);
    timeline = [];
  };

  const finishOpening = () => {
    clearTimeline();
    // 触发 CSS 中的 screenShatter 撕裂动画
    elements.screen.classList.add('finished');
    
    setTimeout(() => {
      elements.screen.remove(); // 从 DOM 中彻底清理
      // 通知 printer.js 喵喵机可以开始打印了
      document.dispatchEvent(new CustomEvent('openingComplete'));
    }, 800);
  };

  // ⏱️ 1. 幽灵开始移动并吃豆豆 (0-3s)
  elements.ghost.classList.add('moving');
  
  const eatTimes = [700, 1400, 2100, 2800];
  elements.dots.forEach((dot, i) => {
    timeline.push(setTimeout(() => dot.classList.add('eaten'), eatTimes[i]));
  });

  // ⏱️ 2. 屏幕闪烁，像素字体显示 404 (4s)
  timeline.push(setTimeout(() => {
    elements.flash.classList.add('active');
    elements.ghost.classList.add('hidden');
    elements.mazeBg.classList.add('hidden');
    elements.dotsPath.classList.add('hidden');
    elements.text404.classList.remove('hidden');
    
    // 移除闪烁效果
    setTimeout(() => elements.flash.classList.remove('active'), 500);
  }, 4000));

  // ⏱️ 3. 涂鸦字体显示 wait, really? (5.5s)
  timeline.push(setTimeout(() => {
    elements.text404.classList.add('hidden');
    elements.textWait.classList.remove('hidden');
  }, 5500));

  // ⏱️ 4. 幽灵转身，哥特字体 + 酸性中文 (7s)
  timeline.push(setTimeout(() => {
    elements.textWait.classList.add('hidden');
    
    // 幽灵重新出现并转身
    elements.ghost.classList.remove('hidden', 'moving');
    elements.ghost.style.left = '50%';
    elements.ghost.style.top = '50%';
    elements.ghost.classList.add('turn-around');
    
    elements.textWelcome.classList.remove('hidden');
  }, 7000));

  // ⏱️ 5. 幽灵消散成粒子 (9s)
  timeline.push(setTimeout(() => {
    elements.ghost.classList.add('dissolve');
    createParticles();
  }, 9000));

  // ⏱️ 6. 画面撕裂进入主界面 (10.5s)
  timeline.push(setTimeout(() => {
    finishOpening();
  }, 10500));

  // 🎮 交互：支持跳过动画
  elements.skipBtn.addEventListener('click', finishOpening);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') finishOpening();
  });

  // ✨ 粒子生成器
  function createParticles() {
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      // 随机爆炸方向
      const tx = (Math.random() - 0.5) * 400 + 'px';
      const ty = (Math.random() - 0.5) * 400 + 'px';
      particle.style.setProperty('--tx', tx);
      particle.style.setProperty('--ty', ty);
      particle.style.left = '50%';
      particle.style.top = '50%';
      elements.gameContainer.appendChild(particle);
      
      // 2秒后清理粒子
      setTimeout(() => particle.remove(), 2000);
    }
  }
});

/* ========== BLOCK: Pacman Ghost Opening Animation Script END ========== */



