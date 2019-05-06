# jquery-pagination
페이징 정보로 클라이언트 사이드 렌더링을 하도록 도와주는 라이브러리

## 사용법
- 페이징 HTML의 클래스 이름 및 속성을 아래와 같이 설정한다.
```
  <ul id="pagination" class="paging-group">
      <li class="page-start"><<</li>
      <li class="page-prev"><</li>
      <li class="paging-group-item"><span class="page active" page="1">1</span></li>
      <li class="page-next">></li>
      <li class="page-end">>></li>
  </ul>
```
- 스크립트를 불러온다.
```
    <script
    src="https://code.jquery.com/jquery-3.4.0.min.js"
    integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
    crossorigin="anonymous"></script>
    <script src="/path/pagination.js"></script>
```
- Pagination 객체를 생성한다. new Pagination($rootElement, activeClassName, callbackFunction, pagingObj)
```
var pagination = new Pagination($("#pagination"), "active", render, {
  page: 1,
  endPage: "10",
  maxPage: "540",
  minPage: "1",
  perPage: "10",
  startPage: "1"
});
```
- 페이징 설정 방법

페이지에서 값 설정
```
<ul id="pagination" class="paging-group" data-page=1 data-end-page=10 data-max-page=540 data-min-page=1 data-per-page=10 data-start-page=1 >
    <li class="page-start"><<</li>
    <li class="page-prev"><</li>
    <li class="paging-group-item"><span class="page active" page="1">1</span></li>
    <li class="page-next">></li>
    <li class="page-end">>></li>
</ul>
<script>
var pagination = new Pagination($("#pagination"), "active", render, {
  page: 1,
  endPage: "10",
  maxPage: "540",
  minPage: "1",
  perPage: "10",
  startPage: "1"
});  
</script>
```

스크립트에서 값 설정
```
<ul id="pagination" class="paging-group">
    <li class="page-start"><<</li>
    <li class="page-prev"><</li>
    <li class="paging-group-item"><span class="page active" page="1">1</span></li>
    <li class="page-next">></li>
    <li class="page-end">>></li>
</ul>
<script>
var pagination = new Pagination($("#pagination"), "active", render, {
  page: 1,
  endPage: "10",
  maxPage: "540",
  minPage: "1",
  perPage: "10",
  startPage: "1"
});
</script>
```

- 페이지 이동 이벤트가 실행된 후, callback 함수가 실행되어 클라이언트 사이드 렌더링을 할 수 있다.


## 페이징 데이터 샘플
```
{
  page: 1,
  endPage: "10",
  maxPage: "540",
  minPage: "1",
  perPage: "10",
  startPage: "1"
}
```
copyright by yeolsa
