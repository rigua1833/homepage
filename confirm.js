//問い合わせフォームの内容を送信用
//GASと連携する
document.addEventListener("DOMContentLoaded", () => {
  const fields = ["company", "name", "furigana", "phone", "email", "message"];

  // 表示用
  fields.forEach(field => {
    document.getElementById("conf-" + field).textContent = sessionStorage.getItem(field) || "";
  });

  // 送信ボタン
  document.getElementById("submitFinal").addEventListener("click", async function () {
    const formData = {};
    fields.forEach(field => {
      formData[field] = sessionStorage.getItem(field);
    });

    console.log("送信データ:", formData);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxyMLCOhF-2Qlqirncc0X1Cy5pQ7fw3Py9bJ925RJtHbVuvuX_U3BE0MvVq_Hrmye_9/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "no-cors"
      });

      console.log("送信成功");

      sessionStorage.clear(); // 送信後にデータ削除
      window.location.href = "thanks.html"; // 完了画面へ遷移

    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信に失敗しました。時間をおいて再度お試しください。");
    }
  });
});
