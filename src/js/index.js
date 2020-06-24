import apiService from './apiService.js';
import templatesCard from '../templates/templat-item-cards.hbs';
import templatSearchForm from '../templates/templat-search-form.hbs';

class ImageSearch {
  constructor() {
    this.name = 0;
    this.root = document.querySelector('#root');
  }
  renderMarkup() {
    this.root.insertAdjacentHTML('beforeend', templatSearchForm());
    this.searchForm = document.querySelector('#search-form');
    this.input = document.querySelector('input');
  }

  startSearch(e) {
    e.preventDefault();
    const gallery = document.querySelector('#gallery');
    const form = e.target.children;
    const input = form.query;
    const loadMoreBtn = document.querySelector(
      'button[data-action="Load more"]',
    );

    this.name = input.value;
    gallery.innerHTML = '';
    apiService.resetPage();
    apiService.searchQuery = this.name;
    apiService.fetchItem().then(data => {
      const markup = templatesCard(data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
    });
    input.value = '';
    loadMoreBtn.disabled = false;
  }

  loadMore() {
    apiService.fetchItem().then(data => {
      const markup = templatesCard(data.hits);
      const gallery = document.querySelector('#gallery');
      gallery.insertAdjacentHTML('beforeend', markup);
    });
  }

  addListeners() {
    const searchForm = document.querySelector('#search-form');
    searchForm.addEventListener('submit', this.startSearch);
    const loadMoreBtn = document.querySelector(
      'button[data-action="Load more"]',
    );
    loadMoreBtn.addEventListener('click', this.loadMore);
    loadMoreBtn.addEventListener('click', () => {
      let top = +window.scrollY + 700;
      setTimeout(() => {
        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      }, 1000);
    });
  }

  start() {
    this.renderMarkup();
    this.addListeners();
  }
}

const imageSearch = new ImageSearch();
imageSearch.start();
