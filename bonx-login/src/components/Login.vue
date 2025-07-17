<template>
  <div class="w-screen h-screen grid place-items-center">
    <!-- <div > -->
      <form class="flex flex-col gap-4 rounded-md shadow-lg p-10" method="POST" action="/login">
        <p class="text-lg font-bold mb-4">Bienvenue sur Bonx !</p>
        <!-- <label for="email">Email</label> -->
        <input name="username" autocomplete="username" class="inset-shadow rounded-md border-2 border-blue-200 p-2" placeholder="Tapez votre email ici" type="email"/>
        <!-- <label for="password">Mot de passe</label> -->
        <input name="password" autocomplete="current-password" class="inset-shadow rounded-md border-2 border-blue-200 p-2" placeholder="Mot de passe" type="password"/>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <a href="/forgot" class="underline text-blue-600">Mot de passe oublié ?</a>
            <button type="submit" class="bg-blue-600 rounded-md text-white shadow p-2">Se connecter</button>
          </div>
          <a href="/signup" class="bg-zinc-300 rounded-md shadow p-2 text-center">S'enregister</a>
        </div>
      </form>
    <!-- </div> -->
  </div>
</template>
