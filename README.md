# jquery-pagination
페이징 정보로 클라이언트 사이드 렌더링을 하도록 도와주는 라이브러리

## 사용법
- 페이징 HTML의 클래스 이름을 아래와 같이 설정한다.
```
  <ul id="pagination" class="paging_group">
      <li class="page_start"><<</li>
      <li class="page_prev"><</li>
      <li class="paging-group-item"><span class="page active" page="1">1</span></li>
      <li class="page_next">></li>
      <li class="page_end">>></li>
  </ul>
```
- 스크립트를 선언한다.
```
    <script
    src="https://code.jquery.com/jquery-3.4.0.min.js"
    integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
    crossorigin="anonymous"></script>
    <script src="/path/pagination.js"></script>
```
- Pagination 객체를 생성한다. new Pagination($rootElement, activeClassName, callbackFunction)
```
var pagination = new Pagination($("#pagination"), "active", render);
```
- 최초에 초기화 되지 않았으면, reset 함수로 페이징 정보를 초기화 한다.
```
pagination.reset({
  end_flag: "N",
  end_page: "10",
  max_page: "540",
  min_page: "1",
  per_page: "10",
  start_page: "1",
  total_count: "5399"
});
```
- 페이지 이동 이벤트가 실행된 후, callback 함수가 실행되어 클라이언트 사이드 렌더링을 할 수 있다.


## 페이징 샘플
```
{
  end_flag: "N",
  end_page: "10",
  max_page: "540",
  min_page: "1",
  per_page: "10",
  start_page: "1",
  total_count: "5399"
}
```
