<template>
  <div class="bg-gray-200">
  <Cart/>

  </div>

</template>

<script>
import Cart from '~/components/Cart.vue'
export default {
components: {
  Cart
  },
  middleware: 'auth'

}
</script>
