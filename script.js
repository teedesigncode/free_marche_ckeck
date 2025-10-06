document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('diagnostic-form');
  const resultArea = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const answers = {};
    for (let i = 1; i <= 10; i++) {
      const selected = form.querySelector(`input[name="q${i}"]:checked`);
      if (!selected) {
        resultArea.innerHTML = `<p class="alert">全ての質問に回答してください。</p>`;
        return;
      }
      answers[`q${i}`] = parseInt(selected.value, 10);
    }

    let total = Object.values(answers).reduce((a,b) => a+b, 0);
    let grade = '';
    if (total >= 41) grade = 'A';
    else if (total >= 31) grade = 'B';
    else if (total >= 20) grade = 'C';
    else grade = 'D';

    const reasons = {
      A: "ブースの導線・世界観・清潔感すべてが高水準。来場者に強い印象を与え、購買へ自然に導ける構成になっています。",
      B: "集客や世界観の一部に改善余地はあるものの、全体的にまとまりがあり、一定の来場効果が見込めます。",
      C: "ブースの魅せ方や整頓、視認性などにバラつきがあります。来場者の印象が弱く、機会損失の可能性があります。",
      D: "全体的に改善が必要です。導線・照明・情報提示のいずれも不足しており、来場者に伝わりにくい構成になっています。"
    };

    const companyUrl = "https://example.com/consultation";
    const ctaButton = `<a class="cta" href="${companyUrl}" target="_blank">今すぐ無料で相談する</a>`;

    let html = `<div class="score-badge score-${grade}">${grade}評価（${total}点）</div>
                <p><strong>評価理由：</strong>${reasons[grade]}</p>`;

    if (grade === 'A') {
      html += `<p>素晴らしいブースです！さらに磨きをかけるための<strong>プロ相談</strong>もおすすめです。</p>${ctaButton}`;
    } else if (grade === 'B') {
      html += `<p>平均以上のブースです。特定の改善点を強化すればさらに成長できます。</p>${ctaButton}`;
    } else {
      html += `<p class="alert"><strong>このままでは集客を大きく逃す可能性があります！</strong></p>
               <p><strong>【先着5社限定】無料デザイン相談</strong>ができるTEE DESIGNへのデザイン依頼をご検討ください。</p>${ctaButton}`;
    }

    resultArea.innerHTML = html;
    resultArea.scrollIntoView({ behavior: "smooth" });
  });

  form.addEventListener('reset', () => {
    resultArea.innerHTML = `<p class="muted">診断結果がここに表示されます。</p>`;
  });
});
