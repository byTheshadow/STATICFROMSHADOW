/* ========== BLOCK: Advanced Cursor Effects Script START ========== */

document.addEventListener('DOMContentLoaded', () => {
  // 检查是否有开屏动画
  const hasOpening = document.getElementById('opening-screen');
  
  // 等待开屏动画完成
  const initCursorEffects = () => {
    // ========== 物理反相聚光灯 ==========
    const spotlight = document.getElementById('spotlight');
    
    if (spotlight) {
      // 跟随鼠标移动
      document.addEventListener('mousemove', (e) => {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';
      });
      
      // 悬停在可点击元素上时变大
      const interactiveElements = 'a, button, .nav-link, .character-card, .vinyl-record, .printer-button, input, textarea, [onclick]';
      
      document.querySelectorAll(interactiveElements).forEach(el => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('spotlight-hover');
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('spotlight-hover');
        });
      });
    }
    
    // ========== X轴跟随小幽灵 ==========
    const ghostTracker = document.getElementById('ghost-tracker');
    
    if (ghostTracker) {
      document.addEventListener('mousemove', (e) => {
        // 获取幽灵宽度用于居中计算
        const ghostWidth = ghostTracker.offsetWidth;
        const halfWidth = ghostWidth / 2;
        
        // 计算位置并限制在可视范围内
        const viewportWidth = window.innerWidth;
        const targetX = Math.max(halfWidth, Math.min(e.clientX, viewportWidth - halfWidth));
        
        ghostTracker.style.left = targetX + 'px';
      });
      
      // 初始位置设为屏幕中心
      ghostTracker.style.left = (window.innerWidth / 2) + 'px';
    }
  };
  
  // 如果有开屏动画，等待完成后再启用
  if (hasOpening) {
    document.addEventListener('openingComplete', initCursorEffects);
  } else {
    // 没有开屏动画，直接启用
    initCursorEffects();
  }
});

/* ========== BLOCK: Advanced Cursor Effects Script END ========== */
