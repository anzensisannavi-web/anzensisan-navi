// メニュー項目データ
const menuData = [
  { title: "ホーム", url: "top.html" },
  { title: "じっくり選べるあんぜん資産なび", url: "list.html" },
  { title: "かんたん定期預金なび", url: "calc.html" },
  { title: "特集コンテンツ", url: "contents.html" }
];

// スポンサー・広告のリストデータ
const sponsorAds = [
  {
    name: "あんぜん運用サポート窓口",
    description: "元本保証の資産運用や国債の購入方法について無料で学べるガイド",
    url: "#",
    badge: "PR",
    bgColor: "#eff6ff",
    borderColor: "#3b82f6"
  },
  {
    name: "ネット銀行金利チェッカー",
    description: "主要ネット銀行の最新キャンペーン金利をリアルタイムで比較",
    url: "#",
    badge: "PR",
    bgColor: "#ecfdf5",
    borderColor: "#10b981"
  },
  {
    name: "安全資産シミュレーションLab",
    description: "複利効果やインフレに負けない堅実な資産づくりのためのツール集",
    url: "#",
    badge: "PR",
    bgColor: "#fdf6ed",
    borderColor: "#f59e0b"
  }
];

function setupGlobalMenu() {
  // 1. スライドメニュー用CSSを追加
  const style = document.createElement('style');
  style.textContent = `
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

// サイドバー全要素の一括共通更新 ＆ ランダム広告の挿入
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

  // sponsorAds 配列からランダムに1件選ぶ処理
  const randomAd = sponsorAds[Math.floor(Math.random() * sponsorAds.length)];

  const sponsorWidgetHtml = `
    <div class="widget-title">🤝 スポンサーリンク</div>
    <div style="background-color: ${randomAd.bgColor}; border: 2px solid ${randomAd.borderColor}; border-radius: 10px; padding: 10px 12px; margin-top: 8px; text-align: left; box-shadow: 1px 1px 0px rgba(0,0,0,0.05);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
        <span style="font-size: 0.8rem; font-weight: bold; color: #1e293b;">${randomAd.name}</span>
        <span style="background-color: #64748b; color: #ffffff; font-size: 0.6rem; font-weight: bold; padding: 1px 5px; border-radius: 4px;">${randomAd.badge}</span>
      </div>
      <p style="font-size: 0.72rem; color: #475569; margin: 0 0 6px 0; line-height: 1.35;">${randomAd.description}</p>
      <a href="${randomAd.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.72rem; font-weight: bold; color: #2563eb; text-decoration: none;">詳しく見る ➔</a>
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

  // 注目キャンペーンの枠の次（後ろ）に、ランダム選出されたスポンサーウィジェットを挿入
  const campaignWidgetElement = Array.from(widgets).find(w => w.querySelector('.widget-title')?.textContent.includes('注目キャンペーン'));
  if (campaignWidgetElement && !sidebar.querySelector('#sponsor-random-widget')) {
    const newSponsorWidget = document.createElement('div');
    newSponsorWidget.className = 'sidebar-widget';
    newSponsorWidget.id = 'sponsor-random-widget';
    newSponsorWidget.innerHTML = sponsorWidgetHtml;
    campaignWidgetElement.after(newSponsorWidget);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupGlobalMenu();
  setupSidebar();
});
