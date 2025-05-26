// 커튼 올라오기
// 메인 콘텐츠 - 커튼 - Overlay 
window.addEventListener("load", () => {
  document.getElementById("main").classList.add("show");
});

// 햄버거 메뉴 토글
document.getElementById("menuToggle").addEventListener("click", () => {
  const panel = document.getElementById("menuPanel");
  panel.style.display = (panel.style.display === "block") ? "none" : "block";
});
