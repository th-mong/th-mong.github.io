// 원래 create read update delete (crud)다 구현 하고 싶었지만 시간 관계상
// create이랑 read만 update만 구현 했습니다 ㅎㅎ delete는 나중에 개인적으로 공부하면서 구현해보겠습니다.
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const ratingState = { value: 0 };
  
    // 별 클릭 이벤트
    stars.forEach(star => {
      star.addEventListener("click", () => {
        const selected = parseInt(star.getAttribute("data-value"));
        ratingState.value = selected;
  
        stars.forEach(s => {
          const val = parseInt(s.getAttribute("data-value"));
          s.classList.toggle("selected", val <= selected);
        });
  
        console.log("별 선택됨:", selected); // 디버깅용
      });
    });
  
    const reviewForm = document.getElementById("reviewForm");
    const albumSelect = document.getElementById("album");
    const reviewInput = document.getElementById("review");
    const reviewList = document.getElementById("reviewList");
  
    function loadReviews() {
      const allReviews = JSON.parse(localStorage.getItem("albumReviews")) || [];
      reviewList.innerHTML = "";
  
      allReviews.forEach(r => {
        const item = document.createElement("div");
        item.classList.add("review-item");
        item.innerHTML = `
          <p><strong>${r.albumName}</strong> - ⭐ ${r.rating}</p>
          <p>${r.comment}</p>
          <p class="date">${new Date(r.date).toLocaleString()}</p>
        `;
        reviewList.appendChild(item);
      });
    }
  
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const albumId = albumSelect.value;
      const albumName = albumSelect.options[albumSelect.selectedIndex].text;
      const rating = ratingState.value;
      const comment = reviewInput.value.trim();
  
      if (!rating || !comment) {
        alert("별점과 감상평을 모두 입력해주세요.");
        return;
      }
  
      const newReview = {
        albumId,
        albumName,
        rating,
        comment,
        date: new Date().toISOString()
      };
  
      const allReviews = JSON.parse(localStorage.getItem("albumReviews")) || [];
      allReviews.push(newReview);
      localStorage.setItem("albumReviews", JSON.stringify(allReviews));
  
      // 초기화
      ratingState.value = 0;
      stars.forEach(s => s.classList.remove("selected"));
      reviewInput.value = "";
  
      loadReviews();
    });
  
    loadReviews();
  });
  