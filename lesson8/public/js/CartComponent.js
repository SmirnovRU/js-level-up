// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false
      }
    },
    
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                    this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                        .then(data => {
                            if(data.result === 1){
                                find.quantity++
                                }
                        })
                } else {
                    const prod = Object.assign({quantity: 1}, item);
                    this.$parent.postJson(`/api/cart`, prod)
                        .then(data => {
                            if(data.result === 1){
                                this.cartItems.push(prod)
                            }
                        })
                }

        },
        remove(item) {
            if ( item.quantity > 1 ) {
                this.$parent.putJson( `/api/cart/${item.id_product}`,{ quantity: -1 })
                    .then( data => {
                        if ( data.result === 1) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson( `/api/cart/${ item.id_product }`, item)
                    .then( data => {
                        if ( data.result === 1) {
                            this.cartItems.splice( this.cartItems.indexOf( item ), 1 );
                        } else {
                            console.log( 'error' );
                        }
                    } )
            }
        },
        
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
    },
    template: `
            <div>
                <button class="header__basket" type="button" @click="showCart = !showCart">
                    <svg class="header__icon" width="32" height="29">
                        <use href="#icon-basket"></use>
                    </svg>
                </button>
                <div class="header__cart-block" v-show="showCart">
                <p v-if="!cartItems.length">В корзине нет товаров</p>
                    <cart-item v-for="item of cartItems" :key="item.id_product" :img="imgCart" :cart-item="item" @remove="remove">
                </cart-item>
            </div>
        
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="header__cart-item">
                    <div class="header__product-bio">
                        <img :src="cartItem.product_img" alt="Some img" width="50">
                        <div class="header__product-desc">
                            <h3 class="product-title">{{ cartItem.product_name }}</h3>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="header__right-block">
                        <div class="header__product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="header__del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})