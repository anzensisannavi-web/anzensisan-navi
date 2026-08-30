// sponsor.js

// 広告・協賛パートナーのリストデータ
const sponsorList = [
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

// 指定した要素に広告をランダム（または順番に）描画する関数
function renderSponsors(containerId, limit = 1) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // リストをシャッフルしてランダム化したい場合
  const shuffled = [...sponsorList].sort(() => 0.5 - Math.random());
  // 表示する数を制限
  const targets = shuffled.slice(0, limit);

  container.innerHTML = targets.map(item => `
    <div style="background-color: ${item.bgColor}; border: 2px solid ${item.borderColor}; border-radius: 12px; padding: 12px 14px; margin-bottom: 12px; text-align: left; box-shadow: 2px 2px 0px rgba(0,0,0,0.05);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
        <span style="font-size: 0.85rem; font-weight: bold; color: #1e293b;">${item.name}</span>
        <span style="background-color: #64748b; color: #ffffff; font-size: 0.65rem; font-weight: bold; padding: 1px 6px; border-radius: 4px;">${item.badge}</span>
      </div>
      <p style="font-size: 0.75rem; color: #475569; margin: 0 0 8px 0; line-height: 1.4;">${item.description}</p>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; font-weight: bold; color: #2563eb; text-decoration: none;">詳しく見る ➔</a>
    </div>
  `).join('');
}

// 読み込み時に実行（例として 'sponsor-container' というIDの場所に1件ランダム表示）
document.addEventListener('DOMContentLoaded', () => {
  renderSponsors('sponsor-container', 1);
});