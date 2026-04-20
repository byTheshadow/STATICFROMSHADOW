// ========== About Me - AI Chat Interface Loader ==========

async function loadAboutData() {
  try {
    const response = await fetch('data/about.json');
    const data = await response.json();
    renderAboutChat(data.about);
  } catch (error) {
    console.error('Failed to load about data:', error);
    renderErrorMessage();
  }
}

function renderAboutChat(aboutData) {
  const messagesContainer = document.getElementById('about-messages');
  if (!messagesContainer) return;

  // 清空容器
  messagesContainer.innerHTML = '';

  // 构建对话消息数组
  const messages = [
    {
      role: 'user',
      content: 'Who are you?',
      type: 'en'
    },
    {
      role: 'assistant',
      content: aboutData.title,
      type: 'title'
    },
    {
      role: 'assistant',
      content: aboutData.subtitle,
      type: 'subtitle'
    },
    {
      role: 'user',
      content: 'Tell me more about yourself.',
      type: 'en'
    },
    {
      role: 'assistant',
      content: `${aboutData.name} (${aboutData.nameEn}) / ${aboutData.alias}`,
      type: 'zh'
    },
    {
      role: 'assistant',
      content: aboutData.taglineZh,
      type: 'zh'
    },
    {
      role: 'assistant',
      content: aboutData.tagline,
      type: 'en'
    },
    {
      role: 'user',
      content: 'What should I know before exploring?',
      type: 'en'
    },
    {
      role: 'assistant',
      content: aboutData.warning,
      type: 'warning'
    },
    {
      role: 'user',
      content: 'What can I find here?',
      type: 'en'
    },
    {
      role: 'assistant',
      content: aboutData.bio,
      type: 'zh'
    },
    {
      role: 'user',
      content: 'How can I reach you?',
      type: 'en'
    },
    {
      role: 'assistant',
      content: aboutData.contact,
      type: 'contact'
    },
    {
      role: 'assistant',
      content: aboutData.disclaimer,
      type: 'zh'
    }
  ];

  // 渲染每条消息
  messages.forEach((msg, index) => {
    setTimeout(() => {
      const messageEl = createMessageElement(msg);
      messagesContainer.appendChild(messageEl);
      
      // 滚动到底部
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, index * 150); // 每条消息延迟150ms出现
  });
}

function createMessageElement(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${message.role}`;

  const roleDiv = document.createElement('div');
  roleDiv.className = 'message-role';
  roleDiv.textContent = message.role === 'user' ? 'You' : 'Shadow';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';

  // 根据类型添加特殊样式
  if (message.type === 'title') {
    contentDiv.classList.add('title-message');
    const glitchSpan = document.createElement('span');
    glitchSpan.className = 'glitch-text';
    glitchSpan.setAttribute('data-text', message.content);
    glitchSpan.textContent = message.content;
    contentDiv.appendChild(glitchSpan);
  } else if (message.type === 'subtitle') {
    contentDiv.classList.add('subtitle-message');
    contentDiv.textContent = message.content;
  } else if (message.type === 'warning') {
    contentDiv.classList.add('warning-message', 'zh-content');
    // 处理换行
    const lines = message.content.split('\n');
    lines.forEach((line, index) => {
      if (line.trim()) {
        const p = document.createElement('p');
        p.textContent = line;
        contentDiv.appendChild(p);
      }
    });
  } else if (message.type === 'contact') {
    contentDiv.classList.add('zh-content');
    
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact-info';
    
    // Discord
    const discordTag = document.createElement('span');
    discordTag.className = 'contact-tag';
    discordTag.textContent = message.content.discord;
    contactDiv.appendChild(discordTag);
    
    // Communities
    message.content.communities.forEach(community => {
      const tag = document.createElement('span');
      tag.className = 'contact-tag';
      tag.textContent = community;
      contactDiv.appendChild(tag);
    });
    
    contentDiv.appendChild(contactDiv);
  } else if (message.type === 'zh') {
    contentDiv.classList.add('zh-content');
    // 处理多段落
    const paragraphs = message.content.split('\n\n');
    paragraphs.forEach(para => {
      if (para.trim()) {
        const p = document.createElement('p');
        p.textContent = para.trim();
        contentDiv.appendChild(p);
      }
    });
  } else {
    contentDiv.classList.add('en-content');
    contentDiv.textContent = message.content;
  }

  messageDiv.appendChild(roleDiv);
  messageDiv.appendChild(contentDiv);

  return messageDiv;
}

function renderErrorMessage() {
  const messagesContainer = document.getElementById('about-messages');
  if (!messagesContainer) return;

  messagesContainer.innerHTML = `
    <div class="message assistant">
      <div class="message-role">System</div>
      <div class="message-content warning-message">
        <p>Failed to load archive data. Please try again later.</p>
      </div>
    </div>
  `;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  loadAboutData();
});

// 如果页面已经加载完成
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  loadAboutData();
}
