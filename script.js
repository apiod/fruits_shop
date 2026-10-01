// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //data는 과일 또는 야채의 배열
  // console.log(data);
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <h6 class="card-content">${item.content}</h6>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits(event) {
  // 기존 데이터
  const data = fruits;
  //수정된 데이터
  let fixedData = [];

  let etv = event?.target.value;
  if (etv) {
    // console.log(event.target.value);
    if (etv === "name") {
      //이름순 정렬
      fixedData = data.toSorted((a, b) => a.name.localeCompare(b.name));
    } else if (etv === "low") {
      //가격이 낮은순 정렬
      fixedData = data.toSorted((a, b) => a.price - b.price);
      // console.log("fixedData :>> ", fixedData);
    } else if (etv === "high") {
      //가격이 높은순 정렬
      fixedData = data.toSorted((a, b) => b.price - a.price);
    } else if (etv === "0") {
      /*--선택--이 없을경우 change를 사용했기 때문에 
      처음값인 이름순을 할때 이름순 정렬이 안된다.
      이를 해결하기 위해 option에 선택을 추가하고 
      선택의 value를 0으로 한 뒤 기본 정렬을 사용한다.
      */
      fixedData = data;
    } else {
      data.forEach((obj) => {
        // console.log(obj.name);
        if (obj.name.indexOf(event.target.value) > -1) {
          fixedData.push(obj);
        }
      });
    }
  } else {
    // console.log("non Event");
    fixedData = data;
  }

  // console.log(fixedData);
  //화면에 다시 출력
  // console.log(event?.target);
  renderProducts(fixedData, fruitList);
}

// 채소 출력 (3개씩 증가)

let viewIndex = 3;
function loadVeggies(event) {
  const data = veggies;
  const etv = event?.target;
  if (etv) {
    // console.log(etv);
    viewIndex += 3;
  }
  // console.log(viewIndex);

  //더 이상 못보면 버튼 숨기기
  if (data.length <= viewIndex) {
    loadMoreBtn.style.visibility = "hidden";
  } else {
    loadMoreBtn.style.visibility = "visible";
  }

  let fixedData = data.slice(0, viewIndex);

  //화면에 다시 출력
  renderProducts(fixedData, veggieList);
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);

loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
