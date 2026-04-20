/* ========== BLOCK: Advanced Cursor Effects CSS START ========== */

/* ========== 物理反相聚光灯 ========== */
#spotlight {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.01) 40%,
    transparent 70%
  );
  mix-blend-mode: screen;
  transition: width 0.3s ease, height 0.3s ease;
}

body.spotlight-hover #spotlight {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(142, 27, 27, 0.08) 0%,
    rgba(142, 27, 27, 0.03) 40%,
    transparent 70%
  );
}

/* ========== X轴跟随小幽灵 ========== */
#ghost-tracker {
  position: fixed;
  bottom: 20px;
  width: 60px;
  height: 70px;
  pointer-events: none;
  z-index: 9998;
  transform: translateX(-50%);
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tracker-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(142, 27, 27, 0.6) 0%,
    rgba(142, 27, 27, 0.4) 60%,
    transparent 100%
  );
  border-radius: 50% 50% 0 0;
  position: relative;
  animation: ghost-float 3s ease-in-out infinite;
}

.tracker-body::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 15px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(142, 27, 27, 0.4) 20%,
    transparent 40%,
    rgba(142, 27, 27, 0.4) 60%,
    transparent 80%,
    rgba(142, 27, 27, 0.4) 100%
  );
  border-radius: 0 0 50% 50%;
}

.tracker-eyes {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.tracker-eye {
  width: 8px;
  height: 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  animation: ghost-blink 4s ease-in-out infinite;
}

@keyframes ghost-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes ghost-blink {
  0%, 90%, 100% {
    height: 12px;
  }
  95% {
    height: 2px;
  }
}

/* ========== 自定义光标 ========== */
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid var(--red-main);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9997;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
  mix-blend-mode: difference;
}

body.spotlight-hover .custom-cursor {
  width: 40px;
  height: 40px;
  border-color: var(--red-bright);
}

/* 隐藏默认光标（可选） */

body {
  cursor: none;
}

a, button, .nav-link, .character-card, .vinyl-record, .printer-button, input, textarea, [onclick] {
  cursor: none;
}
/* ========== BLOCK: Advanced Cursor Effects CSS END ========== */

