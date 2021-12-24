Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
        //    imgProduct: 'https://placehold.it/200x150'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<ul class="catalog-showcase__list">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </ul>`
});
Vue.component('product', {
    props: ['product'],
    template: `
                    <li class="header__catalog-showcase__items">
                        <a class="catalog-showcase__link" href="#">
                            <img class="catalog-showcase__img" :src="product.product_img" alt="fetured_items">
                            <h3 class="catalog-showcase__subtitle">{{product.product_name}}</h3>
                            <p class="catalog-showcase__tagline">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                            <p class="catalog-showcase__price">\${{product.price}}</p>
                            <button class="header__buy-btn" @click="$emit('add-product', product)">Купить</button>
                        </a>
                        
                    </li>
    `
})