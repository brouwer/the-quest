<template>
  <button
    class="h-14 w-full rounded-lg bg-primary-700 text-xl font-black uppercase text-white disabled:bg-primary-300"
  >
    <div class="flex flex-row">
      <span class="w-10"><!--spacer--></span>
      <span class="grow">
        <slot></slot>
      </span>
      <div class="w-10">
        <slot name="icon"></slot>
      </div>
    </div>
  </button>
</template>
