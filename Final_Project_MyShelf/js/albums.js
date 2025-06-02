document.addEventListener("DOMContentLoaded", () => {
  const albumContainer = document.getElementById("albumContainer");

  // 초기 앨범 리스트
  const defaultAlbums = [
    {
      id: "album01",
      title: "NewJeans 1st EP",
      image: "../img/newJeans.png",
      recommended: 0
    },
    {
      id: "album02",
      title: "MADE",
      image: "../img/bigbang.png",
      recommended: 0
    },
    {
      id: "album03",
      title: "MUSE",
      image: "../img/jimin.png",
      recommended: 0
    },
    {
      id: "album04",
      title: "After Hours",
      image: "../img/weekend.png",
      recommended: 0
    },
    {
      id: "album05",
      title: "The Book of Us: Gravity",
      image: "../img/day6.png",
      recommended: 0
    },
    {
      id: "album06",
      title: "Night",
      image: "../img/dori.png",
      recommended: 0
    },
    {
      id: "album07",
      title: "Ruby",
      image: "../img/jenny.png",
      recommended: 0
    },
    {
      id: "album08",
      title: "Lover",
      image: "../img/taylor.png",
      recommended: 0
    }
  ];

  // localStorage에서 가져오거나 초기화
  let albumList = JSON.parse(localStorage.getItem("albumList"));
  if (!albumList) {
    albumList = defaultAlbums;
    localStorage.setItem("albumList", JSON.stringify(albumList));
  }

  const recommendedAlbums = JSON.parse(localStorage.getItem("recommendedAlbums")) || [];

  // 앨범 카드 렌더링
  function renderAlbums() {
    albumContainer.innerHTML = "";

    albumList.forEach(album => {
      const albumCard = document.createElement("div");
      albumCard.classList.add("album-card");

      const img = document.createElement("img");
      img.src = album.image;
      img.alt = album.title;

      const title = document.createElement("h3");
      title.textContent = album.title;

      const recommendBtn = document.createElement("button");
      recommendBtn.textContent = `추천하기 (${album.recommended})`;
      recommendBtn.disabled = recommendedAlbums.includes(album.id);
      recommendBtn.classList.add("recommend-btn");

      const reviewBtn = document.createElement("button");
      reviewBtn.textContent = "리뷰 남기기";
      reviewBtn.classList.add("review-btn");

      recommendBtn.addEventListener("click", () => {
        album.recommended += 1;
        recommendedAlbums.push(album.id);
        localStorage.setItem("albumList", JSON.stringify(albumList));
        localStorage.setItem("recommendedAlbums", JSON.stringify(recommendedAlbums));
        renderAlbums();
      });

      reviewBtn.addEventListener("click", () => {
        window.location.href = "review.html?album=" + encodeURIComponent(album.id);
      });

      albumCard.appendChild(img);
      albumCard.appendChild(title);
      albumCard.appendChild(recommendBtn);
      albumCard.appendChild(reviewBtn);
      albumContainer.appendChild(albumCard);
    });
  }

  renderAlbums();
});
