/**
 * @author LeeJunyeol
 * 
 * 숫자 페이징 클래스: paging-group-item
 * 이전 페이지 버튼 클래스: page-prev
 * 다음 페이지 버튼 클래스: page-next
 * 이전구간 페이지 버튼 클래스: page-start
 * 다음구간 페이지 버튼 클래스: page-end
 * 페이징 속성: page
 */

var Pagination = (function($){

	function Pagination(rootEle, activeClassName, ajaxCallback, pagingObj) {
		this.$root			 = $(rootEle);
		this.activeClassName = activeClassName || "active";
		this.ajaxCallback    = (ajaxCallback && typeof ajaxCallback === "function")? ajaxCallback : function() {};
		
		this.set(pagingObj);
		this.reset();

		this.$root.on("click", ".page", function(e) {
			this.moveTo($(e.currentTarget).attr("page"));
		}.bind(this));
		this.$root.on("click", ".page-prev", this.prev.bind(this));
		this.$root.on("click", ".page-next", this.next.bind(this));
		this.$root.on("click", ".page-start", this.start.bind(this));
		this.$root.on("click", ".page-end", this.end.bind(this));
	}
	// 페이징 값 셋팅
	Pagination.prototype.set = function(pagingObj) {
		if(typeof pagingObj !== "undefined" && typeof pagingObj["page"] !== "undefined") {
			this.activePage = parseInt(pagingObj["page"]);
			this.$root.find(".page").attr("page", this.activePage);
		} else if(typeof this.$root.find("." + this.activeClassName).attr("page") !== "undefined") {
			this.activePage = parseInt(this.$root.find("." + this.activeClassName).attr("page"));
		} else {
			this.activePage = 1;
			this.$root.find(".page").attr("page", this.activePage);
		}  
		if(typeof pagingObj !== "undefined" && typeof pagingObj["minPage"] !== "undefined") {
			this.minPage = parseInt(pagingObj["minPage"]);
			this.$root.data("minPage", this.minPage);
		} else if(typeof this.$root.data("minPage") !== "undefined") {
			this.minPage = this.$root.data("minPage");
		} else {
			this.minPage = 1;
			this.$root.data("minPage", this.minPage);
		}  
		if(typeof pagingObj !== "undefined" && typeof pagingObj["maxPage"] !== "undefined") {
			this.maxPage = parseInt(pagingObj["maxPage"]);
			this.$root.data("maxPage", this.maxPage);
		} else if(typeof this.$root.data("maxPage") !== "undefined") {
			this.maxPage = this.$root.data("maxPage");
		} else {
			this.maxPage = 1;
			this.$root.data("maxPage", this.maxPage);
		}  
		if(typeof pagingObj !== "undefined" && typeof pagingObj["startPage"] !== "undefined") {
			this.startPage = parseInt(pagingObj["startPage"]);
			this.$root.data("startPage", this.startPage);
		} else if(typeof this.$root.data("startPage") !== "undefined") {
			this.startPage = this.$root.data("startPage");
		} else {
			this.startPage = 1;
			this.$root.data("startPage", this.startPage);
		}  
		if(typeof pagingObj !== "undefined" && typeof pagingObj["endPage"] !== "undefined") {
			this.endPage = parseInt(pagingObj["endPage"]);
			this.$root.data("endPage", this.endPage);
		} else if(typeof this.$root.data("endPage") !== "undefined") {
			this.endPage = this.$root.data("endPage");
		} else {
			this.endPage = 1;
			this.$root.data("endPage", this.endPage);
		}  
		if(typeof pagingObj !== "undefined" && typeof pagingObj["perPage"] !== "undefined") {
			this.perPage = parseInt(pagingObj["perPage"]);
			this.$root.data("perPage", this.perPage);
		} else if(typeof this.$root.data("perPage") !== "undefined") {
			this.perPage = this.$root.data("perPage");
		} else {
			this.perPage = 10;
			this.$root.data("perPage", this.perPage);
		}  
		this.activePage = (typeof pagingObj !== "undefined" && typeof pagingObj["page"] !== "undefined" )? parseInt(pagingObj["page"]) : 1;
		this.minPage	= (typeof pagingObj !== "undefined" && typeof pagingObj["min_page"] !== "undefined" )? parseInt(pagingObj["min_page"]) : 1;
		this.maxPage	= (typeof pagingObj !== "undefined" && typeof pagingObj["max_page"] !== "undefined" )? parseInt(pagingObj["max_page"]) : 1;
		this.startPage	= (typeof pagingObj !== "undefined" && typeof pagingObj["start_page"] !== "undefined" )? parseInt(pagingObj["start_page"]) : 1;
		this.endPage	= (typeof pagingObj !== "undefined" && typeof pagingObj["end_page"] !== "undefined" )? parseInt(pagingObj["end_page"]) : 1;
		this.perPage	= (typeof pagingObj !== "undefined" && typeof pagingObj["per_page"] !== "undefined" )? parseInt(pagingObj["per_page"]) : 1;
	}
	// 페이징 초기화
	Pagination.prototype.reset = function(pagingObj) {
		this.set(pagingObj);
		this.setPaging();
	}
	Pagination.prototype.updateMaxPage = function() {
		this.maxPage         = parseInt(this.$root.data("maxPage"));
	}
	// 페이징 그리기
	Pagination.prototype.setPaging	= function() {
		var $pagingGroupItems = this.$root.find(".paging-group-item");
		var $pagingGroupItem = $pagingGroupItems.eq(0);
		$pagingGroupItem.find(".page").removeClass(this.activeClassName);

		var $page = null; 
		for(var page = this.startPage, i = 0; page <= this.endPage; page++, i++) {
			var tempPagingGroupItem = $pagingGroupItem.clone();
			$page = $(tempPagingGroupItem).find(".page");
			$page.attr("page", page);
			$page.text(page);
			if(page === this.startPage) $page.addClass(this.activeClassName);
			$pagingGroupItem.before(tempPagingGroupItem);
		}

		$pagingGroupItems.each(function(i, ele) {
			$(ele).remove();
		});
	}
	// 특정 페이지로 이동
	Pagination.prototype.moveTo = function(page) {

		this.activePage = parseInt(page);
		this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
		this.$root.find(".page[page=" + page +"]").addClass(this.activeClassName);
		this.executeCallBack();
	}
	// 다음 페이지로
	Pagination.prototype.next = function() {

		if(this.activePage === this.maxPage) {
			return;
		}
		if(this.activePage === this.endPage) {
			this.activePage++;
			this.startPage = this.endPage + 1;
			this.endPage = (this.endPage + this.perPage < this.maxPage)? this.endPage + this.perPage : this.maxPage;
	
			this.setPaging();
		} else {
			this.activePage++;
			this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
			this.$root.find(".page[page=" + this.activePage +"]").addClass(this.activeClassName);
		}
		this.executeCallBack();
	}
	// 이전 페이지로
	Pagination.prototype.prev = function() {
		if(this.activePage === this.minPage) {
			return;
		}

		if(this.activePage === this.startPage) {

			this.activePage--;
			this.endPage = this.startPage - 1;
			this.startPage = (this.startPage - this.perPage > this.minPage)? this.startPage - this.perPage : this.minPage;

			this.setPaging();
		} else {
			this.activePage--;
			this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
			this.$root.find(".page[page=" + this.activePage +"]").addClass(this.activeClassName);
		}
	}
	// 콜백 함수 실행
	Pagination.prototype.executeCallBack = function() {
		var thenable = this.ajaxCallback.call(this, this.activePage);
		typeof thenable !== "undefined" && typeof thenable.then === 'function' && thenable.then(this.updateMaxPage.bind(this));
	}
	// 이전 페이지 구간으로 이동
	Pagination.prototype.start = function() {
		if(this.startPage - 1 <= 0) {
			this.activePage = 1;
			this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
			this.$root.find(".page[page=" + this.activePage +"]").addClass(this.activeClassName);
			this.executeCallBack();
			return;
		}

		this.activePage = this.endPage = this.startPage - 1;
		this.startPage = (this.startPage - this.perPage > this.minPage)? this.startPage - this.perPage : this.minPage;

		this.setPaging();
		this.executeCallBack();
	}
	// 다음 페이지 구간으로 이동
	Pagination.prototype.end = function() {
		if(this.endPage + 1 >= this.maxPage) {
			this.activePage = this.endPage;
			this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
			this.$root.find(".page[page=" + this.activePage +"]").addClass(this.activeClassName);
		} else {
			this.activePage = this.startPage = this.endPage + 1;
			this.endPage = (this.endPage + this.perPage < this.maxPage)? this.endPage + this.perPage : this.maxPage;

			this.setPaging();
		}

		this.executeCallBack();
	}
	
	return Pagination;

})(jQuery);