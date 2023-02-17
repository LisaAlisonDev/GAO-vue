<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

</script>

<template> 
 <header>
        <div class="title">
            <h3>
                Gestion d'attribution de poste
            </h3>
        </div>
    </header> 
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  border: 2px solid #000000;
  line-height: 25px;
  max-height: 100vh;
  background-color: white;
  margin-top: 10px;
  width: 100%;
}
.title {
  line-height: 30px;
    font-family: Monospace;
    font-size: 1.2rem;
    margin: -20px;
    margin-bottom: 20px;
    padding: 20px;
    margin-top: 15px;
    margin-left: 15px;
    text-transform: lowercase;
    width: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
