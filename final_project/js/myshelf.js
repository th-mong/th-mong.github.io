document.addEventListener("DOMContentLoaded", () => {
  const reviewSection = document.querySelector(".my-reviews");
  const recommendGrid = document.querySelector(".recommend-grid");

  // [1] 내가 쓴 리뷰 불러오기
  const allReviews = JSON.parse(localStorage.getItem("albumReviews")) || [];
  allReviews.forEach(r => {
    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";
    reviewItem.innerHTML = `
      <h3>${r.albumName}</h3>
      <p>${r.comment}</p>
    `;
    reviewSection.appendChild(reviewItem);
  });

  // [2] 추천한 앨범 불러오기 (고유 앨범만)
  const recommendedAlbums = {};
  allReviews.forEach(r => {
    if (r.rating >= 4 && !recommendedAlbums[r.albumId]) {
      recommendedAlbums[r.albumId] = {
        albumName: r.albumName,
        artist: getArtistName(r.albumName),
        img: getAlbumImage(r.albumName)
      };
    }
  });

  Object.values(recommendedAlbums).forEach(album => {
    const card = document.createElement("div");
    card.className = "album-card";
    card.innerHTML = `
      <img src="${album.img}" alt="${album.albumName}">
      <h3>${album.albumName}</h3>
      <p>${album.artist}</p>
    `;
    recommendGrid.appendChild(card);
  });

  // 앨범명 기준 아티스트명 반환
  function getArtistName(name) {
    if (name.includes("NewJeans")) return "NewJeans";
    if (name.includes("지민")) return "지민";
    if (name.includes("제니")) return "제니";
    if (name.includes("Taylor")) return "Taylor Swift";
    if (name.includes("The Weekend")) return "The Weekend";
    if (name.includes("Day6")) return "Day6";
    if (name.includes("dori")) return "dori";
    if (name.includes("빅뱅") || name.includes("BIGBANG")) return "빅뱅";
    return "Unknown";
  }

  // 앨범명 기준 이미지 경로 반환
  function getAlbumImage(name) {
    if (name.includes("NewJeans")) return "../img/newJeans.png";
    if (name.includes("지민")) return "../img/jimin.png";
    if (name.includes("제니")) return "../img/jenny.png";
    if (name.includes("Taylor")) return "../img/taylor.png";
    if (name.includes("The Weekend")) return "../img/weekend.png";
    if (name.includes("Day6")) return "../img/day6.png";
    if (name.includes("dori")) return "../img/night.png";
    if (name.includes("빅뱅") || name.includes("BIGBANG")) return "../img/bigbang.png";
    return "../img/default.png";
  }
});
