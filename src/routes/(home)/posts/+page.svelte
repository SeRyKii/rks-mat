<script lang="ts">
  import { Paginator } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import { Autocomplete } from "@skeletonlabs/skeleton";
  import { popup } from "@skeletonlabs/skeleton";
  import type { PopupSettings } from "@skeletonlabs/skeleton";
  import type { PostsResponse } from "$lib/pb_types";
  import type { AutocompleteOption } from "@skeletonlabs/skeleton";
  import { drawerStore } from "@skeletonlabs/skeleton";

  import dayjs from "dayjs";
  import "dayjs/locale/pl";
  import relativeTime from "dayjs/plugin/relativeTime"; // import the plugin
  import { onMount } from "svelte";
  dayjs.locale("pl");

  dayjs.extend(relativeTime);

  export let data: PageData;

  let settings = {
    offset: 0,
    limit: 10,
    size: data.posts.totalItems,
    amounts: [5, 10, 20],
  };
  let source: PostsResponse<{ blocks: any[] }>[] = data.posts.items;

  let paginatedSource = [...data.posts.items];

  $: paginatedSource = source.slice(
    settings.offset * settings.limit,
    settings.offset * settings.limit + settings.limit
  );

  function onPageChange(e: CustomEvent): void {
    fetch("/posts/loadMore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: e.detail,
        limit: settings.limit,
        filter: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        source = data.items;
        settings.size = parseInt(data.totalItems, 10);
        paginatedSource = [...data.items];
      });
  }

  function onAmountChange(e: CustomEvent): void {
    fetch("/posts/loadMore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: settings.offset,
        filter: "",
        limit: e.detail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        source = data.items;
        paginatedSource = [...data.items];
        settings.size = parseInt(data.totalItems, 10);
      });
  }

  function onFilterChange() {
    if (input === "") {
      onPageChange({ detail: 0 } as CustomEvent<any>);
      return;
    }
    fetch("/posts/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag: input,
        limit: settings.limit,
        page: settings.offset,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        source = [...data.posts.items.map((item: any) => item.expand.post)];
        // filter out undefined or null
        source = source.filter((item) => item);
        //data.userAvatars = data.userAvatars;
        settings.size = parseInt(data.posts.totalItems, 10);
      });
  }

  let autoCompletePopup: PopupSettings = {
    event: "focus-click",
    target: "popupAutocomplete",
    placement: "bottom",
  };

  let tagOptions = data.tags.map((tag) => {
    return {
      label: tag.name || "",
      value: tag.id || "",
    };
  });

  function onSelect(e: CustomEvent): void {
    input = e.detail.label;
    // unfocus the input
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onFilterChange();

    // set cursor to the end of the input
    // const inputElement = document.querySelector("input");
    // if (inputElement) {
    //   inputElement.setSelectionRange(input.length, input.length);
    // }
  }

  let input = "";

  onMount(() => {
    drawerStore.close();
  });
</script>

<div class="mt-8 flex items-center w-full justify-center">
  <div class="w-full sm:w-3/4">
    <div class="relative">
      <input
        class="input autocomplete"
        type="search"
        name="autocomplete-search"
        bind:value={input}
        on:keypress={(e) => {
          if (e.key === "Enter") {
            onFilterChange();
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          }
        }}
        placeholder="Search..."
        use:popup={autoCompletePopup}
      />
      <div
        data-popup="popupAutocomplete"
        class="p-4 bg-surface-200-700-token w-full z-20"
      >
        <Autocomplete bind:input options={tagOptions} on:selection={onSelect} />
      </div>
    </div>
    <div class="p-5 space-y-3 flex flex-col no-underline">
      {#each paginatedSource as post}
        <a
          href="/posts/{post.id}"
          class="relative overflow-hidden w-full p-2 py-5 bg-surface-100-800-token flex flex-row items-cente text-token"
          style="text-decoration: none !important;"
        >
          <!-- {#if post.content?.blocks?.filter((v) => v.type == "image")[0]?.data.file.url != undefined}
            <img
              class="h-[200%] aspect-[7/3] absolute -top-1/2 -right-1/2 sm:-right-1/3 brightness-50"
              src={post.content?.blocks?.filter((v) => v.type == "image")[0]
                .data.file.url + "?thumb=560x240"}
              alt=""
              loading="lazy"
            />
          {/if} -->

          <span class="text-2xl z-10 text-token">{post.title}</span>
          <div
            class="ml-auto space-x-2 flex flex-row items-center z-10 {post.content?.blocks?.filter(
              (v) => v.type == 'image'
            )[0]?.data.file.url != undefined
              ? 'text-white'
              : 'text-token'}"
          >
            {#each data.postTags.filter((item) => item.post === post.id) as postTag}
              <span class="chip variant-filled-primary"
                >{postTag.expand?.tag?.name || ""}</span
              >
            {/each}

            <span class="text-xs text-token"
              >{dayjs(post.created).fromNow(false)}</span
            >
          </div>
        </a>
      {/each}
    </div>
    <Paginator
      bind:settings
      on:onAmountChange={onAmountChange}
      on:onPageChange={onPageChange}
    />
  </div>
</div>
