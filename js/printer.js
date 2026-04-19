// ========== BLOCK: Miaomiao Printer Animation START ==========

document.addEventListener('DOMContentLoaded', () => {
  const paper = document.getElementById('printer-paper');
  const loader = document.getElementById('loader');
  
  // 打印内容
  const contentToPrint = [
    "WELCOME TO...",
    "STATIC FROM SHADOW",
    "— 玉元一的噪音档案 —",
    "Vol.∞ / Transmission Archive"
  ];
  
  let lineIndex = 0;

  // 页面加载完成后移除噪音遮罩
  setTimeout(() => {
    if (loader) {
      loader.classList.remove('active');
    }
    // 开始打印
    setTimeout(printLine, 800);
  }, 1500);

  function printLine() {
    if (lineIndex < contentToPrint.length) {
      // 创建新的一行
      const p = document.createElement('p');
      p.textContent = contentToPrint[lineIndex];
      paper.appendChild(p);

      // 展开纸张
      const lineHeight = 40; // 预估行高
      const currentHeight = parseInt(paper.style.height) || 0;
      paper.style.height = `${currentHeight + lineHeight}px`;

      // 延迟后播放打字动画
      setTimeout(() => {
        p.style.opacity = 1;
        p.classList.add('typing');
        
        // 打字完成后移除光标
        setTimeout(() => {
          p.classList.remove('typing');
          p.classList.add('typed');
        }, 1500);
      }, 500);

      lineIndex++;
      // 打印下一行
      setTimeout(printLine, 2500);
    } else {
      // 打印完成，纸张轻微晃动
      setTimeout(() => {
        paper.style.animation = 'float 3s ease-in-out infinite';
      }, 500);
    }
  }
});

// ========== BLOCK: Miaomiao Printer Animation END ==========
