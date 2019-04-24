/**
 * @author LeeJunyeol
 * 
 * 숫자 페이징 클래스: paging-group-item
 * 이전 페이지 버튼 클래스: page_prev
 * 다음 페이지 버튼 클래스: page_next
 * 페이징 속성: page
 */

var Pagination = (function($){

	function Pagination(rootEle, activeClassName, ajaxCallback) {
		this.$root			 = $(rootEle);
		this.activeClassName = activeClassName || "active";
		this.activePage      = parseInt($(rootEle).find("." + this.activeClassName).attr("page")) || 1;
		this.ajaxCallback    = (ajaxCallback && typeof ajaxCallback === "function")? ajaxCallback : function() {};

		this.minPage         = this.$root.data("minPage");
		this.maxPage         = this.$root.data("maxPage");
		this.startPage       = this.$root.data("startPage");
		this.endPage         = this.$root.data("endPage");
		this.perPage         = this.$root.data("perPage");

		this.$root.on("click", ".page", function(e) {

			this.moveTo($(e.currentTarget).attr("page"));
		}.bind(this));
		this.$root.on("click", ".page_prev", this.prev.bind(this));
		this.$root.on("click", ".page_next", this.next.bind(this));
		this.$root.on("click", ".page_start", this.start.bind(this));
		this.$root.on("click", ".page_end", this.end.bind(this));
	}
	Pagination.prototype.reset = function(pagingObj) {
		//{min_page,max_page,start_page,end_page,per_page}

		this.activePage = 1;
		this.minPage	= parseInt(pagingObj["min_page"]);
		this.maxPage	= parseInt(pagingObj["max_page"]);
		this.startPage	= parseInt(pagingObj["start_page"]);
		this.endPage	= parseInt(pagingObj["end_page"]);
		this.perPage	= parseInt(pagingObj["per_page"]);

		var $pagingGroupItems = this.$root.find(".paging-group-item");
		var $firstPagingGroupItem = $pagingGroupItems.eq(0);
		$firstPagingGroupItem.find(".page").removeClass(this.activeClassName);

		var tempPagingGroupItem;
		for(var page = this.startPage, i = 0; page <= this.endPage; page++, i++) {
			var tempPagingGroupItem = $firstPagingGroupItem.clone();

			$(tempPagingGroupItem).find(".page").attr("page", page);
			$(tempPagingGroupItem).find(".page").text(page);
			if(page === this.startPage) $(tempPagingGroupItem).find(".page").addClass(this.activeClassName);

			$firstPagingGroupItem.before(tempPagingGroupItem);
		}

		$pagingGroupItems.each(function(i, ele) {
			$(ele).remove();
		});
	}
	Pagination.prototype.updateMaxPage = function() {
		this.maxPage         = parseInt(this.$root.data("maxPage"));
	}
	Pagination.prototype.moveTo = function(page) {

		this.activePage = parseInt(page);
		this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
		this.$root.find(".page[page=" + page +"]").addClass(this.activeClassName);
		this.ajaxCallback.call(this, this.activePage).then(this.updateMaxPage.bind(this));
	}
	Pagination.prototype.next = function() {

		if(this.activePage === this.maxPage) {
			return;
		}
		if(this.activePage === this.endPage) {
			this.activePage++;
			this.startPage = this.endPage + 1;
			this.endPage = (this.endPage + this.perPage < this.maxPage)? this.endPage + this.perPage : this.maxPage;
			var pagingGroupItems = this.$root.find(".paging-group-item").toArray();

			var $pagingGroupItems = this.$root.find(".paging-group-item");
			var $pagingGroupItem = $pagingGroupItems.eq(0);
			$pagingGroupItem.find(".page").removeClass(this.activeClassName);

			for(var page = this.startPage, i = 0; page <= this.endPage; page++, i++) {
				var tempPagingGroupItem = $pagingGroupItem.clone();
				$(tempPagingGroupItem).find(".page").attr("page", page);
				$(tempPagingGroupItem).find(".page").text(page);
				if(page === this.startPage) $(tempPagingGroupItem).find(".page").addClass(this.activeClassName);
				$pagingGroupItem.before(tempPagingGroupItem);
			}

			$pagingGroupItems.each(function(i, ele) {
				$(ele).remove();
			});

		} else {
			this.activePage++;
			this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
			this.$root.find(".page[page=" + this.activePage +"]").addClass(this.activeClassName);
		}
		this.ajaxCallback.call(this, this.activePage).then(this.updateMaxPage.bind(this));
	}
	Pagination.prototype.prev = function() {
		if(this.activePage === this.minPage) {
			return;
		}

		if(this.activePage === this.startPage) {

			this.activePage--;
			this.endPage = this.startPage - 1;
			this.startPage = (this.startPage - this.perPage > this.minPage)? this.startPage - this.perPage : this.minPage;

			var $pagingGroupItems = this.$root.find(".paging-group-item");
			var $pagingGroupItem = $pagingGroupItems.eq(0);
			$pagingGroupItem.find(".page").removeClass(this.activeClassName);

			for(var page = this.startPage, i = 0; page <= this.endPage; page++, i++) {
				var tempPagingGroupItem = $pagingGroupItem.clone();
				$(tempPagingGroupItem).find(".page").attr("page", page);
				$(tempPagingGroupItem).find(".page").text(page);
				if(page === this.endPage) $(tempPagingGroupItem).find(".page").addClass(this.activeClassName);
				$pagingGroupItem.before(tempPagingGroupItem);
			}

			$pagingGroupItems.each(function(i, ele) {
				$(ele).remove();
			});
		} else {
			this.activePage--;
			this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
			this.$root.find(".page[page=" + this.activePage +"]").addClass(this.activeClassName);
		}
		this.ajaxCallback.call(this, this.activePage).then(this.updateMaxPage.bind(this));
	}
	Pagination.prototype.start = function() {
		if(this.startPage - 1 <= 0) {
			this.activePage = 1;
			this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
			this.$root.find(".page[page=" + this.activePage +"]").addClass(this.activeClassName);
			return;
		}

		this.activePage = this.endPage = this.startPage - 1;
		this.startPage = (this.startPage - this.perPage > this.minPage)? this.startPage - this.perPage : this.minPage;

		var $pagingGroupItems = this.$root.find(".paging-group-item");
		var $pagingGroupItem = $pagingGroupItems.eq(0);
		$pagingGroupItem.find(".page").removeClass(this.activeClassName);

		for(var page = this.startPage, i = 0; page <= this.endPage; page++, i++) {
			var tempPagingGroupItem = $pagingGroupItem.clone();
			$(tempPagingGroupItem).find(".page").attr("page", page);
			$(tempPagingGroupItem).find(".page").text(page);
			if(page === this.endPage) $(tempPagingGroupItem).find(".page").addClass(this.activeClassName);
			$pagingGroupItem.before(tempPagingGroupItem);
		}

		$pagingGroupItems.each(function(i, ele) {
			$(ele).remove();
		});
		this.ajaxCallback.call(this, this.activePage).then(this.updateMaxPage.bind(this));
	}
	Pagination.prototype.end = function() {
		if(this.endPage + 1 >= this.maxPage) {
			this.activePage = this.endPage;
			this.$root.find("." + this.activeClassName).removeClass(this.activeClassName);
			this.$root.find(".page[page=" + this.activePage +"]").addClass(this.activeClassName);
		} else {
			this.activePage = this.startPage = this.endPage + 1;
			this.endPage = (this.endPage + this.perPage < this.maxPage)? this.endPage + this.perPage : this.maxPage;
			var pagingGroupItems = this.$root.find(".paging-group-item").toArray();
	
			var $pagingGroupItems = this.$root.find(".paging-group-item");
			var $pagingGroupItem = $pagingGroupItems.eq(0);
			$pagingGroupItem.find(".page").removeClass(this.activeClassName);
	
			for(var page = this.startPage, i = 0; page <= this.endPage; page++, i++) {
				var tempPagingGroupItem = $pagingGroupItem.clone();
				$(tempPagingGroupItem).find(".page").attr("page", page);
				$(tempPagingGroupItem).find(".page").text(page);
				if(page === this.startPage) $(tempPagingGroupItem).find(".page").addClass(this.activeClassName);
				$pagingGroupItem.before(tempPagingGroupItem);
			}
	
			$pagingGroupItems.each(function(i, ele) {
				$(ele).remove();
			});
		}

		this.ajaxCallback.call(this, this.activePage).then(this.updateMaxPage.bind(this));
	}
	
	return Pagination;

})(jQuery);
