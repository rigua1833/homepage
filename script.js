document.addEventListener("DOMContentLoaded", function () {
    // 現在のファイル名だけを取得（例：index.html）
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
  
    // すべてのナビリンクを取得
    const navLinks = document.querySelectorAll("nav ul li a");
  
    navLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
  
      // 完全一致したら current クラスを付与
      if (linkHref === currentPage) {
        link.classList.add("current"); // ← クラス名は自由に変更可能
      }
    });
});
  
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
   
    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateSlider();
    });

    nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    });


    
});



//ハンバーガーメニューをクリックしたときの処理
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("menu-open");
        nav.classList.toggle("menu-active");
    });

    // メニュー内のリンクをクリックしたらメニューを閉じる
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("menu-open");
            nav.classList.remove("menu-active");
        });
    });
});


let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 80) {
    // 下にスクロール中（かつある程度下がったとき）
    header.classList.add("hide");
  } else {
    // 上にスクロール中 or 最上部付近
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // デフォルト送信を止める
      clearErrors(); // 既存エラー削除
  
      let hasError = false;
  
      const fields = [
        { id: "name", message: "名前は必須です" },
        { id: "furigana", message: "フリガナは必須です" },
        { id: "phone", message: "電話番号は必須です" },
        { id: "email", message: "メールアドレスは必須です" },
        { id: "message", message: "お問い合わせ内容は必須です" },
      ];
  
      fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input.value.trim()) {
          showError(input, field.message);
          hasError = true;
        }
      });
  
      // メール形式チェック
      const email = document.getElementById("email");
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, "メールアドレスの形式が正しくありません");
        hasError = true;
      }
  
      // 電話番号形式チェック（日本の携帯・市外局番形式）
      const phone = document.getElementById("phone");
      if (phone.value && !/^\d{2,4}-\d{2,4}-\d{3,4}$/.test(phone.value)) {
        showError(phone, "電話番号の形式が正しくありません（例: 090-1234-5678）");
        hasError = true;
      }
  
      // チェックボックス確認
      const privacy = document.getElementById("privacy");
      if (!privacy.checked) {
        showError(privacy, "プライバリーポリシーへの同意が必要です");
        hasError = true;
      }
  
      // エラーがなければ送信（ここでGAS連携や確認画面へ遷移など）
      if (!hasError) {
        // 各値を取得して保存
        sessionStorage.setItem("company", document.getElementById("company").value);
        sessionStorage.setItem("name", document.getElementById("name").value);
        sessionStorage.setItem("furigana", document.getElementById("furigana").value);
        sessionStorage.setItem("phone", document.getElementById("phone").value);
        sessionStorage.setItem("email", document.getElementById("email").value);
        sessionStorage.setItem("message", document.getElementById("message").value);
      
        // 確認画面に遷移
        window.location.href = "confirm.html";
      }
  
    });
  
    function showError(input, message) {
      const error = document.createElement("div");
      error.className = "form-error";
      error.textContent = message;
  
      if (input.parentNode.classList.contains("form-group")) {
        input.parentNode.appendChild(error);
      } else {
        input.closest(".checkbox-group").appendChild(error);
      }
  
      input.classList.add("input-error");
    }
  
    function clearErrors() {
      document.querySelectorAll(".form-error").forEach(el => el.remove());
      document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
      document.getElementById("responseMessage").textContent = "";
    }
});




//document.getElementById('contactForm').addEventListener('submit', async function(event) {
//    event.preventDefault();
//
//    const formData = {
//        company: document.getElementById('company').value,
//        name: document.getElementById('name').value,
//        furigana: document.getElementById('furigana').value,
//        phone: document.getElementById('phone').value,
//        email: document.getElementById('email').value,
//        message: document.getElementById('message').value
//    };
//
//    console.log("送信データ:", formData);
//
//    try {
//        const response = await fetch("https://script.google.com/macros/s/AKfycbxyMLCOhF-2Qlqirncc0X1Cy5pQ7fw3Py9bJ925RJtHbVuvuX_U3BE0MvVq_Hrmye_9/exec", {
//            method: "POST",
//            headers: { "Content-Type": "application/json" },
//            body: JSON.stringify(formData),
//            mode: "no-cors" // 🔹 これを追加
//        });
//
//        console.log("送信成功");
//
//        document.getElementById('responseMessage').innerText = "お問い合わせを送信しました！";
//        document.getElementById('contactForm').reset();
//
//    } catch (error) {
//        console.error("送信エラー:", error);
//        document.getElementById('responseMessage').innerText = "送信に失敗しました。";
//    }
////});
//
