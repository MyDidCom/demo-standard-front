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
    <p class="text-center text-2xl md:text-4xl text-gray-700 mb-5">
      <span @click="$router.push('/user')"
        ><i class="fas fa-arrow-left md:text-3xl mr-3 cursor-pointer"></i></span
      >Admin panel
    </p>
    <p class="text-center text-gray-700">All users :</p>
    <div
      class="bg-gray-100 border-none rounded-xl my-5 p-5"
      v-for="user in users"
      :key="user"
    >
      <p class="text-center text-l text-gray-700 break-words mb-1">
        {{ user.did }}
      </p>
      <p class="text-center text-sm text-gray-500 mb-1">
        Verifiable credentials :
      </p>
      <div
        v-for="verifiableCredential in user.verifiableCredentials"
        :key="verifiableCredential"
      >
        <p class="text-center text-l text-gray-700 break-words mt-1">
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
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
export default {
  async setup() {
    const $cookies = inject('$cookies');
    const $api = inject('$api');
    const router = useRouter();
    const users = ref({});

    function logout() {
      $cookies.remove('token');
      router.push('/');
    }

    const isAdmin = (await $api.isAdmin()).data.isAdmin;
    if (!isAdmin) {
      window.location.replace('/user');
    } else {
      users.value = (await $api.getAllUsers()).data;
    }

    return {
      users,
      logout,
    };
  },
};
</script>
