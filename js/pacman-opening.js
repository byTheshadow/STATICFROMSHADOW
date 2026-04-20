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
    elements.screen.classList.add('finished');
    
    setTimeout(() => {
      elements.screen.remove();
      document.dispatchEvent(new CustomEvent('openingComplete'));
    }, 800);
  };

  // ⏱️ 1. 幽灵开始移动并吃豆豆 (0-3s)
  elements.ghost.classList.add('moving');
  
  const eatTimes = [700, 1400, 2100, 2800];
  elements.dots.forEach((dot, i) => {
    timeline.push(setTimeout(() => {
      dot.classList.add('eaten');
    }, eatTimes[i]));
  });

  // ⏱️ 2. 屏幕闪烁，显示 404 NOT FOUND!! (4s)
  timeline.push(setTimeout(() => {
    elements.flash.classList.add('active');
    elements.ghost.classList.add('hidden');
    elements.mazeBg.classList.add('hidden');
    elements.dotsPath.classList.add('hidden');
    
    // 显示 404 文字
    elements.text404.classList.remove('hidden');
    elements.text404.style.opacity = '1';
    
    // 移除闪烁效果
    setTimeout(() => elements.flash.classList.remove('active'), 500);
  }, 4000));

  // ⏱️ 3. 老旧电视机开机，显示恐怖消息 (5.5s)
  timeline.push(setTimeout(() => {
    elements.text404.style.opacity = '0';
    setTimeout(() => {
      elements.text404.classList.add('hidden');
      
      // 电视机开机
      elements.textWait.classList.remove('hidden');
      elements.textWait.classList.add('power-on');
      
      // 第一条消息："wait" (电视机开机后 0.8s)
      setTimeout(() => {
        const msgWait = document.getElementById('msg-wait');
        msgWait.classList.add('show');
        
        // 添加电视机抖动
        elements.textWait.classList.add('glitch');
        setTimeout(() => elements.textWait.classList.remove('glitch'), 300);
      }, 800);
      
      // 第二条消息："really?" (电视机开机后 2.3s)
      setTimeout(() => {
        const msgReally = document.getElementById('msg-really');
        msgReally.classList.add('show');
        
        // 再次抖动
        elements.textWait.classList.add('glitch');
        setTimeout(() => elements.textWait.classList.remove('glitch'), 300);
      }, 2300);
      
    }, 300);
  }, 5500));

  // ⏱️ 4. 幽灵转身，显示 WELCOME TO SHADOW'S PLACE!! (9.5s - 给足够时间展示两条消息)
  timeline.push(setTimeout(() => {
    // 电视机淡出
    elements.textWait.style.opacity = '0';
    elements.textWait.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      elements.textWait.classList.add('hidden');
      
      // 幽灵重新出现并转身
      elements.ghost.classList.remove('hidden', 'moving');
      elements.ghost.style.left = '50%';
      elements.ghost.style.top = '50%';
      elements.ghost.classList.add('turn-around');
      
      // 显示欢迎文字
      elements.textWelcome.classList.remove('hidden');
      elements.textWelcome.style.opacity = '1';
    }, 500);
  }, 9500));

  // ⏱️ 5. 幽灵消散成粒子 (11.5s)
  timeline.push(setTimeout(() => {
    elements.ghost.classList.add('dissolve');
    createParticles();
  }, 11500));

  // ⏱️ 6. 画面撕裂进入主界面 (13s)
  timeline.push(setTimeout(() => {
    finishOpening();
  }, 13000));

  // 🎮 交互：支持跳过动画
  elements.skipBtn.addEventListener('click', finishOpening);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      finishOpening();
    }
  });

  // ✨ 粒子生成器
  function createParticles() {
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const tx = (Math.random() - 0.5) * 400 + 'px';
      const ty = (Math.random() - 0.5) * 400 + 'px';
      particle.style.setProperty('--tx', tx);
      particle.style.setProperty('--ty', ty);
      particle.style.left = '50%';
      particle.style.top = '50%';
      elements.gameContainer.appendChild(particle);
      
      setTimeout(() => particle.remove(), 2000);
    }
  }
});

/* ========== BLOCK: Pacman Ghost Opening Animation Script END ========== */





