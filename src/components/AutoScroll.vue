<template>
  <div class="relative h-screen" ref="autoscrollContainer">
    <div class="absolute inset-0" ref="autoscrollContent">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const autoscrollContainer = ref()
const autoscrollContent = ref()

const scroll = () => {
  setTimeout(() => {
    const container = autoscrollContainer.value
    const content = autoscrollContent.value

    const distanceToScroll = 19400
    const scrollDuration = distanceToScroll * 10 // Adjust the scrolling speed here (higher value = slower)

    container.style.transition = `transform ${scrollDuration}ms linear`
    container.style.transform = `translateY(-${distanceToScroll}px)`

    setTimeout(() => {
      container.style.transition = "none"
      container.style.transform = "translateY(0)"
      scroll()
    }, scrollDuration + 2000)
  }, 2000)
}

onMounted(() => {
  scroll()
})

/* export default {
  data() {
    return {
      scrollInterval: null,
    };
  },
  mounted() {
    this.startAutoScroll();
  },
  beforeDestroy() {
    clearInterval(this.scrollInterval);
  },
  methods: {
    startAutoScroll() {
      const container = this.$refs.autoscrollContainer;
      const content = this.$refs.autoscrollContent;

      this.scrollInterval = setInterval(() => {
        const distanceToScroll = content.clientHeight - container.clientHeight;
        const scrollDuration = distanceToScroll * 20; // Adjust the scrolling speed here (higher value = slower)

        container.style.transition = `transform ${scrollDuration}ms linear`;
        container.style.transform = `translateY(-${distanceToScroll}px)`;

        setTimeout(() => {
          container.style.transition = 'none';
          container.style.transform = 'translateY(0)';
        }, scrollDuration + 3000);
      }, 6000);
    },
  },
}; */
</script>
