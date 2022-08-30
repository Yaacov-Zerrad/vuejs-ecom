<template>
  <div class="column is-6">
    <div class="box">
            <div id="paypal-button" />

    </div>
  </div>
</template>

<script>

// import { PayPal } from 'vue-paypal-checkout'
// import { loadScript } from '@paypal/paypal-js';
export default {
    name: 'PaypalBox',
    props: {
      price: Number,
    },
  //   computed: {
  //   // computed property that auto-updates when the prop changes
  //   normalizedSize() {
  //     return this.price
  //   },
  // },
    data(){
      return {

      }
    },
    mounted() {
      this.cart = this.$store.state.cart;
      
      this.amar = this.cartTotalPrice
      this.amount_v = parseFloat(parseFloat(this.amar).toFixed(2))
  

      const myprice = this.amount_v

      



        function loadScript(url, callback) {
            const el = document.querySelector(`script[src="${url}"]`);
            if (!el) {
                const s = document.createElement('script');
                s.setAttribute('src', url); s.onload = callback;
                document.head.insertBefore(s, document.head.firstElementChild);
            }
        }

        loadScript('https://www.paypal.com/sdk/js?client-id=Aeo7slrixySBdhBZgzMUfLTdwD1ZQOaEuSCPW8Hxv8pRbouwIsgXdaNABmt_sKLypHcWPNf-pxQfa4-c', () => {
            paypal.Buttons({
                // Set up the transaction
                createOrder(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value:  myprice ,
                            },
                        }],
                    });
                },

                // Finalize the transaction
                onApprove(data, actions) {
                    dt = this.$router.push('/cart/success')
                    return actions.order.capture().then(function(details)  {
                        // Show a success message to the buyer
                        var capture_json = JSON.stringify(details, null, 2)
                        console.log('asdf', capture_json);
                        console.log(details);
                        localStorage.setItem('cart', '')
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                        
                    });
                },

            }).render('#paypal-button');
        });
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }

    },
    methods:{
        clearCart(){
            this.$store.commit('clearCart')
        }

    
  }

}
</script>

<style>

</style>