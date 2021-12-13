<template>
  <div
    class="
      bg-white
      shadow-md
      w-4/5
      m-auto
      md:w-2/4
      rounded-xl
      p-5
      md:p-10
    "
  >
    <p class="text-2xl md:text-4xl text-gray-700 mb-5">
      <span @click="$router.push('/')"
        ><i
          class="fas fa-arrow-left text-2xl mr-4 md:mb-0.5 cursor-pointer"
        ></i></span
      >Sign in
    </p>
    <hr class="border-t-1 border-black border-opacity-20 w-full py-5" />
    <p class="text-center text-l text-gray-700 mb-2">
      Scan QR code with the dedicated application to be registered :
    </p>
    <div class="flex justify-center mb-5">
      <custom-loader
        v-if="loading"
        class="mr-2 mt-0.5"
        color="#1d4ed8"
        size="20px"
      >
      </custom-loader>      
      <p class="text-center text-l text-blue-700">
        {{ status }}<span
          v-if="status.indexOf('Error') != -1"
          class="text-sm underline"
          ><br /><!-- SSE not launching if using router-link with no refresh --><a
            href="/signup"
            >Try to sign up instead ?</a
          ></span
        >
      </p>
    </div>
    <qrcode-vue
      v-if="qrCode"
      :value="qrCode"
      :size="270"
      level="H"
      class="bg-white mx-auto mb-5 p-4"
    />
  </div>
</template>

<script>
import { ref, inject, onBeforeUnmount } from 'vue';
export default {
  async setup() {
    const $api = inject('$api');
    const $cookies = inject('$cookies');
    const qrCode = ref('');
    const status = ref('');
    const loading = ref(null);

    onBeforeUnmount(() => {
      $api.closeChallengeValidation();
    });

    const newChallenge = (await $api.createChallengeSignin()).data;
    qrCode.value = JSON.stringify(newChallenge);

    // CREATE SSE CONNECTION
    $api.waitChallengeValidation(newChallenge.challenge, (response) => {
      switch (response.status) {
        case 'waiting':
          status.value = 'Waiting scan from mobile application';
          loading.value = true;
          break;
        case 'treating':
          status.value = 'Checking your registration';
          loading.value = true;
          break;
        case 'expired':
          status.value = 'Error while registrating : ' + response.message;
          loading.value = false;
          break;
        case 'validated':
          status.value = "Congratulations, you're registered. Redirecting...";
          $cookies.set('token', response.token);
          loading.value = false;
          setTimeout(() => window.location.replace('/user'), 1000);
          break;
      }
    });

    return {
      qrCode,
      status,
      loading
    };
  },
};
</script>
