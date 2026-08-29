// data.jsonの内容を直接JS内に定義（CORSエラー回避のため）
const masterData = [
  {
    "bankName": "イオン銀行",
    "productName": "定期預金1ヶ月",
    "rate": 3.0,
    "periodYears": 0.083,
    "minAmount": 1,
    "maxAmount": 500,
    "description": "新規口座開設限定。1万円以上500万円以下。インターネットバンキング登録要。"
  },
  {
    "bankName": "愛媛銀行",
    "productName": "定期預金3ヶ月",
    "rate": 3.0,
    "periodYears": 0.25,
    "minAmount": 100,
    "maxAmount": 1000,
    "description": "新たな資金での預け入れに限る。100万円以上1,000万円以下。"
  },
  {
    "bankName": "広島銀行",
    "productName": "定期預金5年",
    "rate": 2.2,
    "periodYears": 5.0,
    "minAmount": 50,
    "maxAmount": 99999,
    "description": "単利型。50万円以上1円単位。期間限定キャンペーン枠。"
  },
  {
    "bankName": "財務省（個人向け国債）",
    "productName": "個人向け国債 第185回 固定5年",
    "rate": 2.06,
    "periodYears": 5.0,
    "minAmount": 50,
    "maxAmount": 99999,
    "description": "5年満期の固定金利。50万円以上1円単位で投資可能。国債ならではの極めて高い安全性が特徴。"
  },
  {
    "bankName": "SBI新生銀行",
    "productName": "定期預金1年",
    "rate": 1.5,
    "periodYears": 1.0,
    "minAmount": 30,
    "maxAmount": 99999,
    "description": "ネットで手軽に組み組める1年定期。特別金利枠で手堅く運用したい方向け。"
  },
  {
    "bankName": "あおぞら銀行",
    "productName": "BANK The 定期 1年",
    "rate": 1.2,
    "periodYears": 1.0,
    "minAmount": 50,
    "maxAmount": 99999,
    "description": "好金利な1年定期預金。アプリで簡単に預け入れが可能。"
  },
  {
    "bankName": "楽天銀行",
    "productName": "定期預金1年",
    "rate": 0.8,
    "periodYears": 1.0,
    "minAmount": 1,
    "maxAmount": 99999,
    "description": "マネーブリッジ設定で優遇金利が適用。1万円から預け入れ可能。"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  runSimulation();
});

function runSimulation() {
  const params = new URLSearchParams(window.location.search);
  
  const rawParam = params.get('raw') || params.get('amount') || "100";
  const rawAmount = parseFloat(rawParam) || 100;
  
  const periodParam = params.get('period') || "1";
  const periodVal = parseFloat(periodParam) || 1;

  const amountYen = rawAmount * 10000;

  if (!masterData.length) return;

  // 税引後利息の計算 & 適合判定
  const calculated = masterData.map(item => {
    const calcPeriod = item.periodYears === 0 ? periodVal : item.periodYears;
    const gross = amountYen * (item.rate / 100) * calcPeriod;
    const netInterest = Math.floor(gross * (1 - 0.20315));

    const isPeriodMatch = Math.abs(item.periodYears - periodVal) < 0.05 || item.periodYears === 0;
    const min = item.minAmount || 0;
    const max = item.maxAmount || 99999;
    const isAmountMatch = (rawAmount >= min) && (rawAmount <= max);

    return {
      ...item,
      netInterest: netInterest,
      isValid: isPeriodMatch && isAmountMatch
    };
  });

  // 適合する商品を優先し、受取利息が多い順に並べ替え
  calculated.sort((a, b) => {
    if (a.isValid !== b.isValid) return b.isValid ? 1 : -1;
    return b.netInterest - a.netInterest || b.rate - a.rate;
  });

  updateDOM(calculated.slice(0, 5));
}

function updateDOM(results) {
  // 1位〜3位の文字打ち替え
  const top3Cards = document.querySelectorAll('.top3-grid .topic-card');
  results.slice(0, 3).forEach((item, i) => {
    if (!top3Cards[i]) return;
    const card = top3Cards[i];

    const title = card.querySelector('.card-title');
    const rate = card.querySelector('.card-rate');
    const desc = card.querySelector('.card-desc');

    if (title) title.textContent = `${item.productName}：${item.bankName}`;
    if (rate) rate.innerHTML = `年利 ${item.rate.toFixed(1)}% <span style="font-size:0.85em; color:#059669;">(+${item.netInterest.toLocaleString()}円)</span>`;
    if (desc && item.description) desc.textContent = item.description;
  });

  // 4位・5位の文字打ち替え
  const subCards = document.querySelectorAll('.sub-ranking-list .soft-card');
  results.slice(3, 5).forEach((item, i) => {
    if (!subCards[i]) return;
    const card = subCards[i];

    const h4 = card.querySelector('h4');
    const p = card.querySelector('p');

    if (h4) h4.textContent = `${item.productName}：${item.bankName} （年利 ${item.rate.toFixed(2)}% / +${item.netInterest.toLocaleString()}円）`;
    if (p && item.description) p.textContent = item.description;
  });
}