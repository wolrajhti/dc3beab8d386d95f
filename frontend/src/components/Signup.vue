<template>
  <div class="w-screen h-screen grid place-items-center">
    <!-- <div > -->
      <form class="flex flex-col gap-4 rounded-md shadow-lg p-10" method="POST" action="/signup">
        <p class="text-lg font-bold mb-4">Création de compte</p>
        <!-- <label for="email">Email</label> -->
        <input name="username" autocomplete="username" class="inset-shadow rounded-md border-2 border-blue-200 p-2" placeholder="Tapez votre email ici" type="email"/>
        <!-- <label for="password">Mot de passe</label> -->
        <input name="password" autocomplete="new-password" class="inset-shadow rounded-md border-2 border-blue-200 p-2" placeholder="Mot de passe" type="password"/>
        <input name="password2" autocomplete="" class="inset-shadow rounded-md border-2 border-blue-200 p-2" placeholder="Confirmation de mot de passe" type="password"/>
        <button type="submit" class="bg-blue-600 rounded-md text-white shadow p-2">Créer mon compte</button>
      </form>
    <!-- </div> -->
  </div>
</template>
