// HTML内の要素を取得
const gameArea = document.getElementById('gameArea');
const result = document.getElementById('result');

let startTime;      // 反応計測開始時刻
let timeoutID;      // setTimeout のIDを保持
let waiting = false;  // 待機中かどうかのフラグ
let ready = false;    // クリック可能状態かどうかのフラグ

// ゲームエリアがクリックされたときの処理
gameArea.addEventListener('click', () => {
  if (!waiting && !ready) {
    // 初期状態: ゲーム開始
    gameArea.textContent = "準備中...";
    result.textContent = "";
    waiting = true;
    
    // 2～5秒のランダムな待機時間を設定
    const delay = Math.floor(Math.random() * 3000) + 2000;
    timeoutID = setTimeout(() => {
      // 待機時間が経過したらクリック可能状態にする
      gameArea.style.backgroundColor = '#27ae60';  // 背景色を緑に変更
      gameArea.textContent = "今すぐクリック!";
      startTime = new Date();  // クリック可能になった時刻を記録
      ready = true;
      waiting = false;
    }, delay);
    
  } else if (waiting && !ready) {
    // 待機中にクリックした場合 → 早すぎるクリックと判定
    clearTimeout(timeoutID);  // 待機タイマーをキャンセル
    waiting = false;
    gameArea.textContent = "クリックしすぎ！";
    gameArea.style.backgroundColor = '#e74c3c';  // 背景色を赤に変更
    result.textContent = "早すぎました。もう一度試してください。";
    // 少し表示後にリセット
    setTimeout(resetGame, 1500);
    
  } else if (ready) {
    // 正常なクリック: 反応時間を計測
    const endTime = new Date();
    const reactionTime = endTime - startTime;
    gameArea.textContent = "結果発表";
    result.textContent = "反応速度: " + reactionTime + " ミリ秒";
    gameArea.style.backgroundColor = '#3498db';  // 背景色を元に戻す
    ready = false;
    // 結果表示後、ゲームをリセット
    setTimeout(resetGame, 2000);
  }
});

// ゲーム状態を初期状態にリセットする関数
function resetGame() {
  gameArea.textContent = "クリックして開始";
  gameArea.style.backgroundColor = '#3498db';
  result.textContent = "";
}
