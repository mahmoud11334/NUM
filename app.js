const examples = [
  "01558143429",
  "01210465470",
  "01150431951",
  "01110880539",
  "01141737957",
  "01122675246",
  "01105289737",
  "01070883943",
  "01110501025"
];

const prefixes = ["010", "011", "012", "015"];

function analyzePatterns() {
  const positions = Array.from({ length: 8 }, () => []);
  examples.forEach(num => {
    const suffix = num.slice(3);
    for (let i = 0; i < suffix.length; i++) {
      positions[i].push(parseInt(suffix[i]));
    }
  });
  const commonDigits = positions.map(pos => {
    if (pos.length > 0) {
      const counts = {};
      pos.forEach(d => counts[d] = (counts[d] || 0) + 1);
      let maxCount = -1;
      let mostCommon = null;
      for (const d in counts) {
        if (counts[d] > maxCount) {
          maxCount = counts[d];
          mostCommon = parseInt(d);
        }
      }
      return mostCommon;
    } else {
      return Math.floor(Math.random() * 10);
    }
  });
  return commonDigits;
}

const commonPatterns = analyzePatterns();

function generateSmartNumber() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let suffix = "";
  for (let i = 0; i < 8; i++) {
    let digit;
    if (Math.random() < 0.7) {
      digit = commonPatterns[i];
    } else {
      digit = Math.floor(Math.random() * 10);
    }
    suffix += digit.toString();
  }
  return prefix + suffix;
}

function generateNumbers(repeat = 1) {
  const numbers = [];
  for (let i = 0; i < 4 * repeat; i++) {
    numbers.push(generateSmartNumber());
  }
  return numbers;
}

document.getElementById('startBtn').addEventListener('click', async function () {
  const repeat = document.getElementById('repeat').value;
  const resultsDiv = document.getElementById('results');
  const copyAllBtn = document.getElementById('copyAllBtn');

  resultsDiv.innerHTML = '<p style="color:#666; text-align:center;">جاري التوليد...</p>';

  try {
    const data = { numbers: generateNumbers(parseInt(repeat)) };

    resultsDiv.innerHTML = '';
    data.numbers.forEach(num => {
      const item = document.createElement('div');
      item.className = 'number-item';
      item.innerHTML = `
        <span>${num}</span>
        <button class="copy-btn" title="نسخ الرقم">
          <i class="fas fa-copy"></i>
        </button>
      `;
      resultsDiv.appendChild(item);

      item.querySelector('.copy-btn').addEventListener('click', () => {
        navigator.clipboard.writeText(num).then(() => showToast());
      });
    });

    copyAllBtn.style.display = data.numbers.length > 0 ? 'flex' : 'none';

    copyAllBtn.onclick = () => {
      const allNumbers = data.numbers.join('\n');
      navigator.clipboard.writeText(allNumbers).then(() => showToast('تم نسخ جميع الأرقام!'));
    };

  } catch (error) {
    resultsDiv.innerHTML = `<p style="color:red;">خطأ: ${error.message}</p>`;
  }
});

function showToast(message = 'تم النسخ!') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

const favicon = document.getElementById("favicon");
const titleEl = document.getElementById("title");
const startBtn = document.getElementById("startBtn");

const favicons = [
  "img/favicon.png",
  "img/fav2.png",
  "img/fav3.png",
  "img/fav4.png",
  "img/fav5.png",
  "img/fav6.png",
  "img/fav7.png",
  "img/fav8.png",
  "img/fav9.png"
];

let favIndex = 0;
let isLoading = false;

function startFaviconLoop() {
  setInterval(() => {
    if (isLoading) return;

    if (favIndex === 0) {
      favicon.href = favicons[0];
      setTimeout(() => favIndex = 1, 2000);
    } else {
      favicon.href = favicons[favIndex];
      favIndex++;
      if (favIndex >= favicons.length) {
        favIndex = 0;
      }
    }
  }, 1000);
}

startFaviconLoop();

const titleFrames = ["N","NU","NUM","N","NU","NUM","NUM","NUM"];
let titleIndex = 0;

setInterval(() => {
  if (isLoading) return;
  document.title = titleFrames[titleIndex];
  titleIndex = (titleIndex + 1) % titleFrames.length;
}, 500);

startBtn.addEventListener("click", () => {
  isLoading = true;
  favicon.href = "img/load.png";
  let dots = 1;
  const loadInterval = setInterval(() => {
    document.title = "loading" + ".".repeat(dots);
    dots = dots >= 3 ? 1 : dots + 1;
  }, 500);

  setTimeout(() => {
    clearInterval(loadInterval);
    isLoading = false;
    favIndex = 0;
  }, 3000);
});

console.log("BY MAHMOUD")
console.error("NO ERROR")
