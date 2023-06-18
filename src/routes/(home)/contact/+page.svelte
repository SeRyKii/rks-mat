<script>
  import { Icon, Envelope, Phone } from "svelte-hero-icons";
  import { drawerStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  onMount(() => {
    drawerStore.close();
  });
</script>

<!-- TODO Add background -->

<div
  class="flex flex-col w-full md:px-8 items-center justify-center"
  style="margin-top: 8rem"
>
  <div class="space-y-2 p-4">
    <h1 class="text-3xl font-bold text-center w-full">Kontakt</h1>
    <p class="text-xl">Jeśli masz jakieś pytania, skontaktuj się z nami!</p>
    <hr />
    <div class="flex flex-col items-center gap-2">
      <span class="flex gap-2"
        ><span><Icon src={Envelope} size="24px" /></span><span
          >oleksmagacz16@gmail.com</span
        ></span
      >
      <span class="flex gap-2"
        ><span><Icon src={Phone} size="24px" /></span><span
          >+48 537 884 283</span
        ></span
      >
    </div>
  </div>
</div>
