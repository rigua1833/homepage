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

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        company: document.getElementById('company').value,
        name: document.getElementById('name').value,
        furigana: document.getElementById('furigana').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    console.log("送信データ:", formData);

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxyMLCOhF-2Qlqirncc0X1Cy5pQ7fw3Py9bJ925RJtHbVuvuX_U3BE0MvVq_Hrmye_9/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            mode: "no-cors" // 🔹 これを追加
        });

        console.log("送信成功");

        document.getElementById('responseMessage').innerText = "お問い合わせを送信しました！";
        document.getElementById('contactForm').reset();

    } catch (error) {
        console.error("送信エラー:", error);
        document.getElementById('responseMessage').innerText = "送信に失敗しました。";
    }
});
