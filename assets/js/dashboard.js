/* ============================================
   DASHBOARD.JS - Dashboard Page Logic
   Bike Rental & Tour Company
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initDashboard);

  function initDashboard() {
    initSidebar();
    initDashboardTabs();
    initCharts();
    initTableSearch();
    initTableSort();
  }

  /* ============================================
     SIDEBAR TOGGLE
     ============================================ */
  function initSidebar() {
    var toggle = document.getElementById('sidebarToggle');
    var sidebar = document.querySelector('.dashboard__sidebar');
    var overlay = document.querySelector('.dashboard__overlay');

    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('dashboard__sidebar--open');
      if (overlay) overlay.classList.toggle('dashboard__overlay--active');
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('dashboard__sidebar--open');
        overlay.classList.remove('dashboard__overlay--active');
      });
    }
  }

  /* ============================================
     DASHBOARD TABS
     ============================================ */
  function initDashboardTabs() {
    var tabLinks = document.querySelectorAll('[data-tab]');
    var tabPanes = document.querySelectorAll('[data-tab-pane]');

    if (!tabLinks.length) return;

    tabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = link.dataset.tab;

        tabLinks.forEach(function (l) { l.classList.remove('active'); });
        tabPanes.forEach(function (p) { p.classList.remove('active'); });

        link.classList.add('active');
        var pane = document.querySelector('[data-tab-pane="' + target + '"]');
        if (pane) pane.classList.add('active');
      });
    });
  }

  /* ============================================
     CSS-BASED CHARTS (Pure DOM)
     ============================================ */
  function initCharts() {
    /* Bar Chart */
    var barCharts = document.querySelectorAll('.chart-bar');
    barCharts.forEach(function (chart) {
      var bars = chart.querySelectorAll('.chart-bar__item');
      bars.forEach(function (bar, index) {
        var value = bar.dataset.value || 0;
        setTimeout(function () {
          bar.querySelector('.chart-bar__fill').style.height = value + '%';
        }, index * 100 + 200);
      });
    });

    /* Donut Chart */
    var donutCharts = document.querySelectorAll('.chart-donut');
    donutCharts.forEach(function (chart) {
      var segments = chart.querySelectorAll('.chart-donut__segment');
      var cumulativeOffset = 0;

      segments.forEach(function (segment) {
        var value = parseFloat(segment.dataset.value) || 0;
        var circumference = 2 * Math.PI * 60;
        var dashLength = (value / 100) * circumference;
        var dashGap = circumference - dashLength;

        segment.style.strokeDasharray = dashLength + ' ' + dashGap;
        segment.style.strokeDashoffset = -cumulativeOffset;
        cumulativeOffset += dashLength;
      });
    });

    /* Line Chart (simple points) */
    var lineCharts = document.querySelectorAll('.chart-line');
    lineCharts.forEach(function (chart) {
      var points = chart.querySelectorAll('.chart-line__point');
      points.forEach(function (point, index) {
        setTimeout(function () {
          point.classList.add('chart-line__point--visible');
        }, index * 80 + 300);
      });
    });
  }

  /* ============================================
     TABLE SEARCH / FILTER
     ============================================ */
  function initTableSearch() {
    var searchInputs = document.querySelectorAll('[data-table-search]');

    searchInputs.forEach(function (input) {
      var tableId = input.dataset.tableSearch;
      var table = document.getElementById(tableId);
      if (!table) return;

      input.addEventListener('input', function () {
        var query = input.value.toLowerCase().trim();
        var rows = table.querySelectorAll('tbody tr');

        rows.forEach(function (row) {
          var text = row.textContent.toLowerCase();
          row.style.display = text.indexOf(query) !== -1 ? '' : 'none';
        });
      });
    });
  }

  /* ============================================
     TABLE SORT
     ============================================ */
  function initTableSort() {
    var sortHeaders = document.querySelectorAll('[data-sort]');

    sortHeaders.forEach(function (header) {
      header.style.cursor = 'pointer';
      header.addEventListener('click', function () {
        var table = header.closest('table');
        var tbody = table.querySelector('tbody');
        var colIndex = Array.from(header.parentNode.children).indexOf(header);
        var sortDir = header.dataset.sortDir === 'asc' ? 'desc' : 'asc';
        header.dataset.sortDir = sortDir;

        var rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort(function (a, b) {
          var aVal = a.children[colIndex].textContent.trim();
          var bVal = b.children[colIndex].textContent.trim();

          /* Try numeric sort */
          var aNum = parseFloat(aVal.replace(/[^0-9.-]/g, ''));
          var bNum = parseFloat(bVal.replace(/[^0-9.-]/g, ''));

          if (!isNaN(aNum) && !isNaN(bNum)) {
            return sortDir === 'asc' ? aNum - bNum : bNum - aNum;
          }

          return sortDir === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        });

        rows.forEach(function (row) {
          tbody.appendChild(row);
        });

        /* Update sort indicators */
        sortHeaders.forEach(function (h) { h.classList.remove('sort-asc', 'sort-desc'); });
        header.classList.add('sort-' + sortDir);
      });
    });
  }

})();
