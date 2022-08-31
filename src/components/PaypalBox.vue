<template>
  <div class="column is-6">
    <div class="box">
            <div><p>if paypal button not foun <router-link to="/my-account" class="button is-light">Click here</router-link> for payed in your account or reload</p></div>
            <div id="paypal-button" />

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PaypalBox',
    props: {
      price: Number,
      order_id: String,
    },

    data(){
      return {
        errors : this.errors,
        paypal_id : ''
      }
    },
    mounted() {
      this.cart = this.$store.state.cart;
      

        const router = this.$router
        const order_id = this.order_id
        const amount = this.price

      

        function axiosForPaypal(payid, orderid){
            const data =  {
                            payed: true,
                            num_order : payid
                            }
            axios
                .put(`api/v1/checkout/valid-paypal/${orderid}/`, data)
                .then(response => 
                console.log('success')
                )
                .catch(error => {
                    // this.errors.push('Somethig went wrong. Please try again')
                    console.log(error)
                })
        }


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
                                value:  amount ,
                            },
                        }],
                    });
                },

                // Finalize the transaction
                onApprove(data, actions) {
                    return actions.order.capture().then(function(details)  {
                        // Show a success message to the buyer
                        var capture_json = JSON.stringify(details, null, 2)
                        console.log('asdf', capture_json);
                        console.log(details);
                        const paypalid = details.id
                        const  orderid = order_id

                        router.push('/cart/success')
                        axiosForPaypal(paypalid, orderid)

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
        
  }

}
</script>

<style>

</style>