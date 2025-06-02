document.addEventListener("DOMContentLoaded", () => {
    const topRatedContainer = document.querySelector(".toprated-grid");
  
    const albums = [
      { id: "album08", title: "Lover", artist: "Taylor Swift", img: "../img/taylor.png" },
      { id: "album04", title: "After Hours", artist: "The Weekend", img: "../img/weekend.png" },
      { id: "album07", title: "Ruby", artist: "제니", img: "../img/jenny.png" },
      { id: "album02", title: "MADE", artist: "빅뱅", img: "../img/bigbang.png" },
      { id: "album01", title: "NewJeans 1st EP", artist: "NewJeans", img: "../img/newJeans.png" },
      { id: "album03", title: "MUSE", artist: "지민", img: "../img/jimin.png" },
      { id: "album05", title: "The book of Us:Gravity", artist: "Day6", img: "../img/day6.png" },
      { id: "album06", title: "Night", artist: "dori", img: "../img/dori.png" },
    ];
  
    function getRecommendCount(albumId) {
      const recommends = JSON.parse(localStorage.getItem("albumRecommends")) || {};
      return recommends[albumId] || 0;
    }
  
    function getReviewCount(albumId) {
      const reviews = JSON.parse(localStorage.getItem("albumReviews")) || [];
      return reviews.filter(r => r.albumId === albumId).length;
    }
  
    function updateDisplay() {
      topRatedContainer.innerHTML = "";
  
      const albumStats = albums.map(album => ({
        ...album,
        recommendCount: getRecommendCount(album.id),
        reviewCount: getReviewCount(album.id)
      }));
  
      albumStats.sort((a, b) => b.recommendCount - a.recommendCount);
  
      albumStats.forEach((album, index) => {
        const card = document.createElement("div");
        card.className = "top-card";
  
        const rankText = index < 3 ? `<div class="rank-label">${["1st", "2nd", "3rd"][index]}</div>` : "";
  
        card.innerHTML = `
          ${rankText}
          <img src="${album.img}" alt="${album.title}">
          <h3>${album.title}</h3>
          <p>${album.artist}</p>
          <div class="stats" data-id="${album.id}">
            💛 <span class="recommend-count">${album.recommendCount}</span> • 리뷰 ${album.reviewCount}
          </div>
        `;
        topRatedContainer.appendChild(card);
      });
  
      // 하트 클릭 이벤트 부여
      document.querySelectorAll(".stats").forEach(stat => {
        stat.addEventListener("click", () => {
          const id = stat.getAttribute("data-id");
          const recommends = JSON.parse(localStorage.getItem("albumRecommends")) || {};
          recommends[id] = (recommends[id] || 0) + 1;
          localStorage.setItem("albumRecommends", JSON.stringify(recommends));
          updateDisplay();
        });
      });
    }
  
    updateDisplay();
  });
  