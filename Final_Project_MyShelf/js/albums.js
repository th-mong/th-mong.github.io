const albums = [
    { id: 1, title: "앨범 제목 1", img: "../img/1.jpg" },
    { id: 2, title: "앨범 제목 2", img: "../img/3.jpg" },
    { id: 3, title: "앨범 제목 3", img: "../img/4.jpg" }
  ];
  
  function renderAlbums() {
    const container = document.getElementById("album-list");
    albums.forEach(album => {
      const card = document.createElement("div");
      card.className = "album-card";
      card.innerHTML = `
        <img src="${album.img}" alt="${album.title}" />
        <h3>${album.title}</h3>
        <button class="recommend-btn" onclick="recommendAlbum(${album.id})">❤️ 추천하기</button>
        <a href="../review/review.html" class="review-link">리뷰 보기</a>
      `;
      container.appendChild(card);
    });
  }
  
  function recommendAlbum(id) {
    let recommended = JSON.parse(localStorage.getItem("recommended")) || [];
    if (!recommended.includes(id)) {
      recommended.push(id);
      localStorage.setItem("recommended", JSON.stringify(recommended));
      alert("추천되었습니다!");
    } else {
      alert("이미 추천한 앨범입니다.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", renderAlbums);
  