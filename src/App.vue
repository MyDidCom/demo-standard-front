<template>
  <the-header></the-header>
  <hr class="border-none py-3" />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <suspense><component :is="slotProps.Component"></component></suspense>
    </transition>
  </router-view>
  <hr class="border-none py-3" />
  <suspense><the-footer class="mt-auto"></the-footer></suspense>
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.1s ease-out;
}

.route-leave-active {
  transition: all 0.1s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>