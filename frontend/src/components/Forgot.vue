<template>
  <div class="w-screen h-screen grid place-items-center">
    <!-- <div > -->
      <form class="flex flex-col gap-4 rounded-md shadow-lg p-10" method="POST" action="/login">
        <p class="text-lg font-bold mb-4">Mot de passe oublié ?</p>
        <input name="username" autocomplete="username" class="inset-shadow rounded-md border-2 border-blue-200 p-2" placeholder="Tapez votre email ici" type="email"/>
        <!-- <a href="/login" class="text-center bg-blue-600 rounded-md text-white shadow p-2">Soumettre</a> -->
        <div class="flex justify-between items-center gap-4">
          <a href="/login" class="bg-zinc-300 rounded-md shadow p-2 text-center">Retour</a>
          <a href="/login" class="bg-blue-600 rounded-md text-white shadow p-2">Soumettre</a>
        </div>
      </form>
    <!-- </div> -->
  </div>
</template>
