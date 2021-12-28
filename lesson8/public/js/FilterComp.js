Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" class="header__search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="header__search-field" v-model="userSearch" value="поиск">
                <button type="submit" class="header__search">
                    <svg class="header__icon" width="27" height="28">
                        <use href="#icon-loope"></use>
                    </svg>
                </button>
            </form>`
})