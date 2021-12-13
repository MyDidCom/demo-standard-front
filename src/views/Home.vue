<template>
  <div
    class="
      bg-white
      shadow-md
      w-4/5
      md:w-2/4
      rounded-xl
      m-auto
      p-5
      md:p-10
    "
  >
    <p class="text-center text-2xl md:text-4xl text-gray-700 mb-5">
      XSL authentication demo
    </p>
    <p class="text-center text-sm text-gray-500 mb-1">
      Connect safely using the mobile application.
    </p>
    <p class="text-center text-sm text-gray-500 mb-10">
      XSL Labs provides decentralized solutions for dataless authentication.
    </p>
    <div class="flex justify-center">
      <router-link to="/signup">
        <div
          class="
            font-semibold
            text-sm
            md:text-lg
            text-white text-center
            bg-blue-700
            rounded-lg
            w-24
            md:w-48
            py-3
            px-5
            mx-3            
            cursor-pointer
          "
        >
          Sign up
        </div></router-link
      >
      <router-link to="/signin"
        ><div
          class="
            font-semibold
            text-sm
            md:text-lg
            text-white text-center
            bg-blue-700
            rounded-lg
            w-24
            md:w-48
            py-3
            px-5
            mx-3
            cursor-pointer
          "
        >
          Sign in
        </div></router-link
      >
    </div>
  </div>
</template>
