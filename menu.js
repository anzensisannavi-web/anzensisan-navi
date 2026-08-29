// メニュー項目データ
const menuData = [
  { title: "ホーム", url: "top.html" },
  { title: "じっくり選べるあんぜん資産なび", url: "list.html" },
  { title: "かんたん定期預金なび", url: "calc.html" },
  { title: "特集コンテンツ", url: "contents.html" }
];

function setupGlobalMenu() {
  // 1. スライドメニュー用CSSを追加（広告部分だけ標準フォントを指定するスタイルを入れました）
  const style = document.createElement('style');
  style.textContent = `
    /* スポンサーリンク内だけ文字を標準フォントにして、サイト全体の可愛いフォントはそのまま保護する */
    #sponsor-ad-area, #sponsor-ad-area * {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
    }

    .drawer-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(15, 23, 42, 0.5);
      backdrop-filter: blur(2px);
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .drawer-overlay.is-active {
      opacity: 1;
      visibility: visible;
    }

    .drawer-panel {
      position: fixed;
      top: 0; right: 0;
      width: 80%;
      max-width: 320px;
      height: 100vh;
      background: #ffffff;
      box-shadow: -4px 0px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .drawer-overlay.is-active .drawer-panel {
      transform: translateX(0);
    }

    .drawer-header {
      background-color: #dbeafe;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px dashed #93c5fd;
    }
    .drawer-header-title {
      font-size: 1.05rem;
      font-weight: bold;
      color: #1e293b;
      margin: 0;
    }
    .drawer-close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      font-weight: bold;
      color: #475569;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
    }

    .drawer-menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .drawer-menu-list li {
      border-bottom: 1px solid #f1f5f9;
    }
    .drawer-menu-list li a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      color: #334155;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: bold;
      transition: background-color 0.15s ease;
    }
    .drawer-menu-list li a:hover {
      background-color: #f8fafc;
      color: #2563eb;
    }
    .drawer-arrow {
      color: #94a3b8;
      font-size: 0.8rem;
    }
  `;
  document.head.appendChild(style);

  // 2. ドロワーHTML生成
  let menuLinksHtml = menuData.map(item => 
    `<li>
      <a href="${item.url}">
        <span>${item.title}</span>
        <span class="drawer-arrow">❯</span>
      </a>
    </li>`
  ).join('');

  const drawerHtml = `
    <div class="drawer-overlay" id="drawerOverlay">
      <div class="drawer-panel">
        <div class="drawer-header">
          <h3 class="drawer-header-title">あんぜん資産なび</h3>
          <button class="drawer-close-btn" id="drawerCloseBtn">✕</button>
        </div>
        <ul class="drawer-menu-list">
          ${menuLinksHtml}
        </ul>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  // 3. イベントバインド
  const menuBtns = document.querySelectorAll('.menu-btn, #menuBtn');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (overlay) {
    menuBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('is-active');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('is-active');
      });
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('is-active');
      }
    });
  }
}

// サイドバー全要素の一括共通更新
function setupSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const campaignWidgetHtml = `
    <div class="widget-title">📢 注目キャンペーン</div>
    <div class="campaign-item">
      <div class="campaign-header">
        <span class="campaign-badge">注目</span>
        <span class="campaign-bank">イオン銀行</span>
      </div>
      <div class="campaign-product">特別金利定期預金 1ヶ月</div>
      <div class="campaign-rate">年 3.00%</div>
      <div class="campaign-note">※新規口座開設限定</div>
    </div>
    <div class="campaign-item">
      <div class="campaign-header">
        <span class="campaign-badge">注目</span>
        <span class="campaign-bank">愛媛銀行</span>
      </div>
      <div class="campaign-product">ひめぎんマイル定期 3ヶ月</div>
      <div class="campaign-rate">年 3.00%</div>
      <div class="campaign-note">※新資金限定・期間限定</div>
    </div>
  `;

  // スポンサーリンクウィジェット（画像＆テキスト）
  const sponsorWidgetHtml = `
    <div class="widget-title">🤝 スポンサーリンク</div>
    <div id="sponsor-ad-area" style="background: #f7fafc; border: 1px dashed #cbd5e0; border-radius: 4px; padding: 12px; margin-top: 10px; font-size: 0.85rem; line-height: 1.5;">
        <div style="text-align: center;">
            <div style="margin-bottom: 10px;">
                <a href="https://px.a8.net/svt/ejp?a8mat=4BAH9O+8KZZQQ+2J9A+62ENL" rel="nofollow"><img border="0" width="120" height="66" alt="" src="https://www828.a8.net/svt/bgt?aid=260829420519&wid=001&eno=01&mid=s00000011827001019000&mc=1"></a><img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=4BAH9O+8KZZQQ+2J9A+62ENL" alt="">
            </div>
            <div>
                <a href="https://px.a8.net/svt/ejp?a8mat=4BAH9O+8KZZQQ+2J9A+60H7M" rel="nofollow" style="color: #2563eb; text-decoration: underline;">【クレジットのニチデン】は、振込・不動産担保・事業者などの各種ローンがございます。</a>
                <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4BAH9O+8KZZQQ+2J9A+60H7M" alt="">
            </div>
        </div>
    </div>
  `;

  const featureWidgetHtml = `
    <div class="widget-title">📚 失敗しない資産運用の基本</div>
    <ul class="widget-list">
      <li><span>📖</span> <a href="contents.html?id=payoff">ペイオフ（預金保険制度）上限1000万円の注意点</a></li>
      <li><span>📖</span> <a href="contents.html?id=bonds">個人向け国債「変動10年」と「固定5年」の選び方</a></li>
      <li><span>📖</span> <a href="contents.html?id=campaign">キャンペーン定期預金の「実質的な金利」と見極め方</a></li>
      <li><span>📖</span> <a href="contents.html?id=types">元本割れしない？安全資産の全種類まとめ</a></li>
      <li><span>📖</span> <a href="contents.html?id=security">ネット銀行の破たん時保護とセキュリティ</a></li>
    </ul>
  `;

  const widgets = sidebar.querySelectorAll('.sidebar-widget');
  
  widgets.forEach(widget => {
    const title = widget.querySelector('.widget-title');
    if (title) {
      if (title.textContent.includes('特集コンテンツ') || title.textContent.includes('失敗しない資産運用の基本')) {
        widget.innerHTML = featureWidgetHtml;
      } else if (title.textContent.includes('注目キャンペーン')) {
        widget.innerHTML = campaignWidgetHtml;
      }
    }
  });

  const campaignWidgetElement = Array.from(widgets).find(w => w.querySelector('.widget-title')?.textContent.includes('注目キャンペーン'));
  if (campaignWidgetElement && !sidebar.querySelector('#sponsor-ad-area')) {
    const newSponsorWidget = document.createElement('div');
    newSponsorWidget.className = 'sidebar-widget';
    newSponsorWidget.innerHTML = sponsorWidgetHtml;
    campaignWidgetElement.after(newSponsorWidget);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupGlobalMenu();
  setupSidebar();
});
