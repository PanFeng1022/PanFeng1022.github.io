// 1. 渲染About Me模块（MD转HTML）
fetch('content/about.md')
    .then(response => response.text())
    .then(text => {
        // 将MD转为HTML
        const html = marked.parse(text);
        document.getElementById('about-content').innerHTML = html;
        // 处理Research Interests为标签样式
        const interests = document.querySelectorAll('#about-content ul li');
        if (interests.length > 0) {
            const interestContainer = document.createElement('div');
            interestContainer.className = 'research-interests';
            interests.forEach(li => {
                const tag = document.createElement('span');
                tag.className = 'interest-tag';
                tag.textContent = li.textContent;
                interestContainer.appendChild(tag);
            });
            // 替换原ul为标签容器
            const ul = document.querySelector('#about-content ul');
            ul.parentNode.replaceChild(interestContainer, ul);
        }
    });

// 2. 渲染News模块（解析MD的分隔格式）
fetch('content/news.md')
    .then(response => response.text())
    .then(text => {
        const lines = text.trim().split('\n');
        const newsContainer = document.getElementById('news-content');
        lines.forEach(line => {
            const [time, title, desc] = line.split('|').map(item => item.trim());
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-time">${time}</div>
                <div class="news-content">
                    <div class="news-content-title">${title}</div>
                    <div class="news-content-desc">${desc}</div>
                </div>
            `;
            newsContainer.appendChild(newsItem);
        });
    });

// 3. 渲染Publications模块（解析MD的分隔格式）
fetch('content/publications.md')
    .then(response => response.text())
    .then(text => {
        const lines = text.trim().split('\n');
        const pubContainer = document.getElementById('publications-content');
        lines.forEach(line => {
            const [title, authors, venue] = line.split('|').map(item => item.trim());
            const pubItem = document.createElement('div');
            pubItem.className = 'publication';
            pubItem.innerHTML = `
                <div class="pub-title">${title}</div>
                <div class="pub-authors">${authors}</div>
                <div class="pub-venue">${venue}</div>
            `;
            pubContainer.appendChild(pubItem);
        });
    });