const URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default {
  page: 1,
  query: '',
  per_page: 12,
  fetchItem() {
    const key = '17184359-ed805c17d636e4958a66ce3d0';
    return fetch(
      `${URL}&q=${this.query}&page=${this.page}&per_page=${this.per_page}&key=${key}`,
    )
      .then(res => res.json())
      .then(data => {
        this.page += 1;
        return data;
      })
      .catch(err => console.log(err));
  },
  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  resetPage() {
    this.page = 1;
  },
};
