<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const user = ref(null)

  onMounted(async () => {
    try {
      const response = await fetch('/api/me')
      user.value = await response.json()
    } catch (err) {
      router.push('/login');
    }
  })
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <a href="/logout" class="sticky place-self-end m-4 bg-blue-600 rounded-md text-white shadow p-2">Se déconnecter</a>
    <div class="grow grid place-items-center">
      <p v-if="user">Bonjour {{ user.email }}</p>
    </div>
  </div>
</template>
