<template>
  <div class="box mb-4">
    <div class="columns is-multiline">
       <div class="column is-size-4 mb-6">Order # {{ order.id }}</div>
       <div class="column is-size-4 mb-6">Total Price:  ${{ order.paid_amount }}</div>
       <div class="column is-size-4 mb-6" v-if="!order.payed">Payed:  No payed   <button class="button is-success" @click="PayBox">Pay</button></div>
       <div class="column is-size-4 mb-6" v-else >Payed:  Yes </div>
  </div>
   
    <h4 class="is-size-5">Products</h4>

    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="item in order.items"
                :key="item.product.id"
            >
                <td>{{ item.product.name}}</td>
                <td>{{ item.product.price}}</td>
                <td>{{ item.quantity}}</td>
                <td>{{  getItemTotal(item).toFixed(2)}}</td>
                <!-- <td>{{  order.paid_amount }}</td> -->
            </tr>
        </tbody>


    </table>

    
    <paypal-box  :price="order.paid_amount" :order_id="order.id" v-if="pay"/>


  </div>
</template>

<script>
import PaypalBox from '@/components/PaypalBox.vue'


export default {
    name:'OrderSummary',
    props:{
        order: Object
    },
    components:{
        PaypalBox,
    },
    data(){
        return {
            pay: false,
        }
    },
    methods:{
        getItemTotal(item){
            return item.quantity * item.product.price
        },
        orderTotalLengt(order) {
            return order.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        PayBox(){
            this.pay = true
        }
    },
}
</script>

<style>

</style>