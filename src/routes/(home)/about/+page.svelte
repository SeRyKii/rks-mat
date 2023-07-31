<script>
  import { drawerStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  onMount(() => {
    drawerStore.close();
  });
</script>

<svelte:head>
  <title>O nas</title>
  <meta name="description" content="O nas. Dowiedz się więcej o RKS Mat." />

  <meta property="og:title" content="O nas" />
  <meta
    property="og:description"
    content="O nas. Dowiedz się więcej o RKS Mat."
  />
  <meta property="og:image" content="https://rksmat.pl/logo-medium.webp" />
  <meta property="og:url" content="https://rksmat.pl/about" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pl_PL" />
  <meta property="og:site_name" content="RKS Mat" />
</svelte:head>

<div class="flex flex-col items-center w-full px-0 sm:px-32 md:px-64 lg:px-80">
  <div class="bg-surface-200-800-token p-4">
    <h1 class="text-4xl font-bold text-center">O nas</h1>
    <p>
      &emsp;Rudzki Klub Sportowy ,,Mat" w Rudzie Śląskiej działa od 2005.
      Licencję Polskiego Związku Szachowego uzyskaliśmy w roku 2011.
      Założycielem i I prezesem był Marian Twardoń. W latach 2010-2021 prezesem
      był ś.p. Adam Wrocławczyk, a od 2021 jest nim Dariusz Smagacz.
    </p>
    <p>
      &emsp;Prowadzimy treningi w ODK RSM Country w Bykowinie oraz zajęcia w
      szkołach podstawowych Rudy Śląskiej. Nasze drużyny, juniorska i seniorska,
      wsytępują w rozgrywkach ligowych. Wśród wychowanków naszego Klubu jest
      wielu finalistów Mistrzostw Polski i medalistów Mistrzostw Śląska.
    </p>
  </div>
</div>
