<template>
  <div
    class="
      bg-white
      shadow-md
      rounded-xl
      m-auto
      w-4/5
      md:w-2/4
      p-5
      md:p-10
    "
  >
    <p class="text-2xl md:text-4xl text-gray-700 mb-5">User information</p>
    <hr class="border-t-1 border-black border-opacity-20 w-full py-5" />
    <p class="text-sm text-gray-500 mb-2">
      <i class="fas fa-portrait mr-1"></i>User DID
    </p>
    <p class="text-l text-gray-700 break-words mb-5">
      {{ user.did }}
    </p>
    <p class="text-sm text-gray-500 mb-2">
      <i class="fas fa-shield-alt mr-1"></i>Verifiable credentials :
    </p>
    <div
      v-for="verifiableCredential in user.verifiableCredentials"
      :key="verifiableCredential"
    >
      <p class="text-l text-gray-700 break-words mb-1">
        {{
          Object.keys(verifiableCredential.credentialSubject)[
            Object.keys(verifiableCredential.credentialSubject).length - 1
          ] +
          ' : ' +
          verifiableCredential.credentialSubject[
            Object.keys(verifiableCredential.credentialSubject)[
              Object.keys(verifiableCredential.credentialSubject).length - 1
            ]
          ]
        }}
      </p>
    </div>
    <p v-if="isAdmin" class="text-gray-500 text-xs underline mt-5">
      <router-link to="/admin"
        ><i class="fas fa-user-shield mr-1"></i>Admin panel</router-link
      >
    </p>
    <div class="text-center mt-5">
      <p
        class="
          inline-block
          text-blue-700
          font-semibold
          border-solid border-2 border-blue-700
          rounded-lg
          cursor-pointer
          py-3
          px-5
        "
        @click="logout"
      >
        Sign out
      </p>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
export default {
  async setup() {
    const $cookies = inject('$cookies');
    const $api = inject('$api');

    const user = ref({});
    const isAdmin = ref(false);

    function logout() {
      $cookies.remove('token');
      window.location.replace('/');
    }

    user.value = (await $api.getUser()).data;
    isAdmin.value = (await $api.isAdmin()).data.isAdmin;

    return {
      user,
      isAdmin,
      logout,
    };
  },
};
</script>
