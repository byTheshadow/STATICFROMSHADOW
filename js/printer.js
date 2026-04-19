/* ========== BLOCK: Printer Animation Logic START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const paper = document.getElementById('printer-paper');
  const printerBody = document.querySelector('.printer-body');
  
  // 页面加载完成后隐藏噪音遮罩
  setTimeout(() => {
    loader.classList.add('hidden');
    // 开始打印动画
    setTimeout(startPrinting, 800);
  }, 1500);
  
  // 打印内容
  const contentToPrint = [
    "WELCOME TO...",
    "",
    "STATIC FROM SHADOW",
    "— 玉元一的噪音档案 —",
    "",
    "Vol.∞ / Transmission Archive",
    "since ????",
    "",
    "[ 演出即将开始 ]"
  ];
  
  let lineIndex = 0;
  let isPrinting = false;
  
  function startPrinting() {
    if (isPrinting) return;
    isPrinting = true;
    printNextLine();
  }
  
  function printNextLine() {
    if (lineIndex < contentToPrint.length) {
      const lineText = contentToPrint[lineIndex];
      
      // 创建新的一行
      const p = document.createElement('p');
      p.textContent = lineText || '\u00A0'; // 空行用不换行空格
      
      // 如果是空行，直接显示，不需要打字效果
      if (lineText === '') {
        p.style.opacity = '1';
        p.style.border = 'none';
        p.style.animation = 'none';
        p.classList.add('printed');
      }
      
      paper.appendChild(p);
      
      // 计算新的纸张高度
      const currentHeight = paper.scrollHeight;
      paper.style.minHeight = `${currentHeight}px`;
      
      // 播放打字动画
      if (lineText !== '') {
        setTimeout(() => {
          p.style.opacity = '1';
          p.style.animationPlayState = 'running';
          
          // 打字完成后移除光标
          setTimeout(() => {
            p.style.borderRight = 'none';
            p.style.whiteSpace = 'normal';
            p.classList.add('printed');
          }, 1500);
        }, 300);
      }
      
      lineIndex++;
      
      // 根据是否为空行调整下一行的延迟
      const nextDelay = lineText === '' ? 500 : 2200;
      setTimeout(printNextLine, nextDelay);
      
    } else {
      // 打印完成
      setTimeout(() => {
        paper.classList.add('complete');
        isPrinting = false;
      }, 500);
    }
  }
  
  // 可选：点击打印机按钮重新打印
  const printerButton = document.querySelector('.printer-button');
  if (printerButton) {
    printerButton.addEventListener('click', () => {
      if (!isPrinting) {
        // 清空纸张
        paper.innerHTML = '';
        paper.style.minHeight = '0';
        paper.classList.remove('complete');
        lineIndex = 0;
        
        // 重新开始打印
        setTimeout(startPrinting, 300);
      }
    });
  }
});
/* ========== BLOCK: Printer Animation Logic END ========== */

/* ========== BLOCK: Vinyl Player Interaction START ========== */
document.addEventListener('DOMContentLoaded', () => {
  const vinylContainer = document.getElementById('vinyl-player');
  const ambientAudio = document.getElementById('ambient-noise');
  
  if (vinylContainer && ambientAudio) {
    let isPlaying = false;
    
    vinylContainer.addEventListener('click', () => {
      if (isPlaying) {
        ambientAudio.pause();
        vinylContainer.classList.add('paused');
      } else {
        ambientAudio.play();
        vinylContainer.classList.remove('paused');
      }
      isPlaying = !isPlaying;
    });
  }
});
/* ========== BLOCK: Vinyl Player Interaction END ========== */
