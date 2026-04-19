/* ========== BLOCK: Pacman Ghost Opening Animation (Premium) START ========== */

.opening-screen {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: all;
}

.opening-screen.finished {
  animation: screenShatter 0.8s forwards;
}

@keyframes screenShatter {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); filter: blur(10px); }
  100% { opacity: 0; transform: scale(0.8); filter: blur(20px); visibility: hidden; }
}

/* 游戏容器 */
.game-container {
  position: relative;
  width: 600px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 迷宫背景 */
.maze-bg {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background: 
    repeating-linear-gradient(0deg, transparent, transparent 50px, var(--red-dim) 50px, var(--red-dim) 52px),
    repeating-linear-gradient(90deg, transparent, transparent 50px, var(--red-dim) 50px, var(--red-dim) 52px);
}

/* 豆豆路径 */
.dots-path {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--text-primary);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(215, 215, 215, 0.6);
  opacity: 1;
  transition: opacity 0.2s;
}

.dot.eaten {
  opacity: 0;
  transform: scale(0);
}

/* 幽灵 */
.ghost {
  position: absolute;
  width: 60px;
  height: 70px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ghostMove 3s ease-in-out;
  z-index: 10;
}

/* 幽灵身体 */
.ghost-body {
  width: 100%;
  height: 100%;
  background: var(--red-main);
  border-radius: 50% 50% 0 0;
  position: relative;
  box-shadow: 0 0 20px rgba(142, 27, 27, 0.6), inset 0 -10px 20px rgba(0, 0, 0, 0.3);
  animation: ghostFloat 1s ease-in-out infinite;
}

@keyframes ghostFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* 幽灵底部波浪 */
.ghost-body::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15px;
  background: 
    radial-gradient(circle at 10px 0, transparent 10px, var(--red-main) 10px, var(--red-main) 20px, transparent 20px),
    radial-gradient(circle at 30px 0, transparent 10px, var(--red-main) 10px, var(--red-main) 20px, transparent 20px),
    radial-gradient(circle at 50px 0, transparent 10px, var(--red-main) 10px, var(--red-main) 20px, transparent 20px);
  background-size: 20px 15px;
  background-position: 0 0, 20px 0, 40px 0;
  background-repeat: repeat-x;
}

/* 幽灵眼睛 */
.ghost-eyes {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
}

.ghost-eye {
  width: 12px;
  height: 16px;
  background: #fff;
  border-radius: 50% 50% 40% 40%;
  position: relative;
  animation: eyeBlink 3s infinite;
}

.ghost-eye::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 8px;
  background: #0a0a0a;
  border-radius: 50%;
  animation: eyeMove 2s infinite;
}

@keyframes eyeBlink {
  0%, 96%, 100% { height: 16px; }
  98% { height: 2px; }
}

@keyframes eyeMove {
  0%, 100% { transform: translateX(-50%); }
  50% { transform: translateX(-30%); }
}

/* 幽灵移动路径 */
@keyframes ghostMove {
  0% { left: -10%; top: 50%; }
  25% { left: 30%; top: 30%; }
  50% { left: 50%; top: 50%; }
  75% { left: 70%; top: 70%; }
  100% { left: 110%; top: 50%; }
}

/* 幽灵转身动画 */
.ghost.turn-around {
  animation: ghostTurn 1s forwards;
}

@keyframes ghostTurn {
  0% { transform: translate(-50%, -50%) scaleX(1); }
  50% { transform: translate(-50%, -50%) scaleX(0.2); }
  100% { transform: translate(-50%, -50%) scaleX(-1); left: 50%; top: 50%; }
}

/* 幽灵消散 */
.ghost.dissolve {
  animation: ghostDissolve 1.5s forwards;
}

@keyframes ghostDissolve {
  0% { opacity: 1; filter: blur(0); }
  50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); filter: blur(5px); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(2); filter: blur(20px); }
}

/* 粒子效果 */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--red-bright);
  border-radius: 50%;
  pointer-events: none;
  animation: particleFloat 2s ease-out forwards;
}

@keyframes particleFloat {
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
}

/* ================== 全新高级版文字动画 ================== */

/* 文字容器 */
.opening-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  z-index: 20;
  width: 100%;
}

/* 404 文字 - 完美契合吃豆人的 8-bit 像素风 + 故障抖动 */
.text-404 {
  font-family: var(--font-pixel);
  font-size: clamp(3rem, 10vw, 6rem);
  color: var(--red-bright);
  text-shadow: 
    4px 4px 0 var(--red-dim),
    -3px -3px 0 var(--purple-main);
  margin-bottom: 1.5rem;
  animation: text404Appear 0.5s forwards, pixelGlitch 2s infinite;
}

@keyframes pixelGlitch {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-4px, 4px); }
  40% { transform: translate(4px, -4px); }
  60% { transform: translate(-4px, -4px); }
  80% { transform: translate(4px, 4px); }
}

@keyframes text404Appear {
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}

/* NOT FOUND - 像素风闪烁 */
.text-not-found {
  font-family: var(--font-pixel);
  font-size: clamp(1rem, 4vw, 2rem);
  color: var(--text-primary);
  text-shadow: 2px 2px 0 var(--red-main);
  animation: pixelBlink 1s infinite;
}

@keyframes pixelBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Wait Really 文字 - 狂放的记号笔手写感，仿佛在屏幕上涂鸦 */
.text-wait {
  font-family: var(--font-marker);
  font-size: clamp(2rem, 6vw, 4rem);
  color: var(--text-primary);
  transform: rotate(-5deg);
  animation: waitIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  opacity: 0;
}

@keyframes waitIn {
  0% { opacity: 0; transform: translateY(50px) rotate(-15deg) scale(0.8); }
  100% { opacity: 1; transform: translateY(0) rotate(-5deg) scale(1); }
}

/* Welcome 文字 - 极其华丽暗黑的古典哥特体，带有电影大片般的降临感 */
.text-welcome {
  font-family: var(--font-gothic);
  font-size: clamp(3rem, 8vw, 6rem);
  color: var(--text-primary);
  text-shadow: 
    0 0 30px rgba(142, 27, 27, 0.9),
    3px 3px 0 var(--red-main),
    8px 8px 0 var(--red-dim);
  animation: gothicReveal 1.5s ease-out forwards;
  line-height: 1.2;
}

@keyframes gothicReveal {
  0% { opacity: 0; filter: blur(20px); transform: scale(1.5) translateY(-20px); letter-spacing: -0.5em; }
  100% { opacity: 1; filter: blur(0); transform: scale(1) translateY(0); letter-spacing: normal; }
}

/* 中文副标题 - 现代酸性排版：极细黑体/黄油体，拉开间距，有一种清冷的高级感 */
.text-subtitle {
  font-family: var(--font-thin-cn);
  font-weight: 300;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: var(--red-bright);
  letter-spacing: 0.8em; /* 极大的字间距产生酸性高级感 */
  margin-top: 2rem;
  margin-left: 0.8em; /* 平衡 letter-spacing 造成的居中偏移 */
  opacity: 0;
  transform: translateY(20px);
  animation: acidFadeIn 1.5s 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  text-shadow: 0 0 10px rgba(142, 27, 27, 0.8);
}

@keyframes acidFadeIn {
  to { opacity: 1; transform: translateY(0); }
}

/* 屏幕闪烁效果 */
.screen-flash {
  position: absolute;
  inset: 0;
  background: #fff;
  opacity: 0;
  pointer-events: none;
  z-index: 15;
}

.screen-flash.active {
  animation: flashScreen 0.5s;
}

@keyframes flashScreen {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.8; }
}

/* 跳过按钮也改为硬核像素风 */
.skip-button {
  font-family: var(--font-pixel);
  font-size: 0.6rem;
  text-transform: uppercase;
  position: absolute;
  bottom: 5%;
  right: 5%;
  padding: 1rem 1.5rem;
  background: rgba(142, 27, 27, 0.2);
  border: 2px solid var(--red-main);
  color: var(--text-secondary);
  cursor: pointer;
  pointer-events: all;
  transition: all 0.3s;
  z-index: 30;
  box-shadow: 4px 4px 0 rgba(142, 27, 27, 0.4);
}

.skip-button:hover {
  background: rgba(142, 27, 27, 0.5);
  color: var(--text-primary);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(142, 27, 27, 0.6);
}

/* 隐藏状态 */
.hidden {
  display: none !important;
}
/* ========== BLOCK: Pacman Ghost Opening Animation (Premium) END ========== */
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
      // 🔥 核心通信：通知 printer.js 喵喵机可以开始打印了
      document.dispatchEvent(new CustomEvent('openingComplete'));
    }, 800);
  };

  // ⏱️ 1. 幽灵在迷宫中吃豆豆 (0-3s)
  const eatTimes = [700, 1400, 2100, 2800];
  elements.dots.forEach((dot, i) => {
    timeline.push(setTimeout(() => dot.classList.add('eaten'), eatTimes[i] || 1000));
  });

  // ⏱️ 2. 屏幕闪烁，像素字体显示 404 (4s)
  timeline.push(setTimeout(() => {
    elements.flash.classList.add('active');
    elements.ghost.classList.add('hidden'); // 暂时隐藏幽灵
    elements.text404.classList.remove('hidden');
  }, 4000));

  // ⏱️ 3. 涂鸦字体显示 wait, really? (5.5s)
  timeline.push(setTimeout(() => {
    elements.text404.classList.add('hidden');
    elements.textWait.classList.remove('hidden');
  }, 5500));

  // ⏱️ 4. 幽灵转身，哥特字体 + 酸性中文 (7s)
  timeline.push(setTimeout(() => {
    elements.textWait.classList.add('hidden');
    
    // 隐藏迷宫背景和豆豆，只留主角
    elements.mazeBg.classList.add('hidden');
    elements.dotsPath.classList.add('hidden');
    elements.ghost.classList.remove('hidden');
    
    // 触发幽灵转身动画
    elements.ghost.style.animation = 'none'; 
    void elements.ghost.offsetWidth; // 强制回流重置动画
    elements.ghost.classList.add('turn-around');
    
    elements.textWelcome.classList.remove('hidden');
  }, 7000));

  // ⏱️ 5. 幽灵消散成粒子 (9s)
  timeline.push(setTimeout(() => {
    elements.ghost.classList.add('dissolve');
    createParticles();
  }, 9000));

  // ⏱️ 6. 画面撕裂进入主界面 (10s)
  timeline.push(setTimeout(() => {
    finishOpening();
  }, 10000));

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
    }
  }
});



