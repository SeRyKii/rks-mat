<script lang="ts">
  import type { PageData } from "./$types";
  import dayjs from "dayjs";
  import "dayjs/locale/pl";
  import "dayjs/plugin/calendar";
  import type { TournamentsResponse } from "$lib/pb_types";
  import { onMount } from "svelte";
  import { popup } from "@skeletonlabs/skeleton";
  import type { PopupSettings } from "@skeletonlabs/skeleton";

  export let data: PageData;

  dayjs.locale("pl");

  let month: number = dayjs().month();
  let year: number = dayjs().year();
  let days: any = [];
  let daysBefore: number = 0;

  let monthPopup: PopupSettings = {
    // Set the event as: click | hover | hover-click | focus | focus-click
    event: "click",
    // Provide a matching 'data-popup' value.
    target: "month-popup",
    placement: "bottom"
  };

  let yearPopup: PopupSettings = {
    // Set the event as: click | hover | hover-click | focus | focus-click
    event: "click",
    // Provide a matching 'data-popup' value.
    target: "year-popup",
    placement: "bottom"
  };

  function getDaysInMonth(month: number, year: number) {
    days = [];
    const date = dayjs().set("month", month).set("year", year);

    // get daysBefore so it matches the day of the week
    daysBefore = date.startOf("month").day();

    const daysInMonth = date.daysInMonth();
    console.log(daysInMonth);
    for (let i = 0; i < daysInMonth; i++) {
      days.push({
        slots: [null, null, null, null]
      });
      // if tournament is between start and end date, push it to the days array
    }
    fillTournaments();
  }
  getDaysInMonth(month, year);

  function fillTournaments() {
    data.tournaments.items.forEach(
      (tournament: TournamentsResponse, z: number) => {
        // fill in the days array with tournaments while using the same slot if possible
        let startDate = dayjs(tournament.startDate);
        let endDate = dayjs(tournament.endDate);
        let currentDate = startDate;
        let slot = 0;

        // find first available slot on the first day
        if (days[currentDate.date() - 1].slots[0] === null) {
          slot = 0;
        } else if (days[currentDate.date() - 1].slots[1] === null) {
          slot = 1;
        } else if (days[currentDate.date() - 1].slots[2] === null) {
          slot = 2;
        } else if (days[currentDate.date() - 1].slots[3] === null) {
          slot = 3;
        } else {
          console.log("no slot available");
          return;
        }

        // fill each day with the tournament in the slot check if its the same month
        while (
          currentDate.isBefore(endDate, "date") ||
          currentDate.isSame(endDate, "date")
        ) {
          if (currentDate.month() === month) {
            days[currentDate.date() - 1].slots[slot] = {
              name: tournament.name,
              startDate: tournament.startDate,
              endDate: tournament.endDate,
              color: tournament.color
            };
          }
          currentDate = currentDate.add(1, "day");
        }
      }
    );
  }
  function prevMonth() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    days = [];

    fetchFromServer();
  }

  function nextMonth() {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    days = [];

    fetchFromServer();
  }

  function fetchFromServer() {
    fetch("/calendar/loadMore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ month, year })
    })
      .then((res) => res.json())
      .then((newData) => {
        data.tournaments = newData;
        // update days array
        getDaysInMonth(month, year);
      })
      .catch((err) => {
        console.log(err);
      });
  }
</script>

<div class="flex flex-col w-full md:px-8 items-center justify-center">
  <div class="w-full md:w-3/4 xl:w-1/2 p-8">
    <!-- display name of the month and year -->
    <div class="flex flex-row items-center justify-center gap-5">
      <div
        use:popup={monthPopup}
        class="w-8 h-8 rounded-full bg-surface-100-800-token btn-icon variant-ringed-primary"
      >
        <span>
          <svg
            class="w-4 h-4 text-on-surface-100-800-token"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 7.293a1 1 0 011.414 0L12 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>
      <div
        class="text-center text-xl sm:text-2xl md:text-3xl font-bold capitalize w-[130px] sm:w-[200px] whitespace-nowrap"
      >
        {dayjs().set("month", month).set("year", year).format("MMMM YYYY")}
      </div>
      <button
        use:popup={yearPopup}
        class="w-8 h-8 rounded-full bg-surface-100-800-token btn-icon variant-ringed-primary"
      >
        <span>
          <svg
            class="w-4 h-4 text-on-surface-100-800-token flex"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 7.293a1 1 0 011.414 0L12 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div data-popup="month-popup" class="z-20">
        <select bind:value={month} on:change={fetchFromServer} class="select">
          <option value={0}>Styczeń</option>
          <option value={1}>Luty</option>
          <option value={2}>Marzec</option>
          <option value={3}>Kwiecień</option>
          <option value={4}>Maj</option>
          <option value={5}>Czerwiec</option>
          <option value={6}>Lipiec</option>
          <option value={7}>Sierpień</option>
          <option value={8}>Wrzesień</option>
          <option value={9}>Październik</option>
          <option value={10}>Listopad</option>
          <option value={11}>Grudzień</option>
        </select>
      </div>
      <div data-popup="year-popup" class="z-20">
        <select bind:value={year} on:change={fetchFromServer} class="select">
          {#each Array(10) as _, i}
            <option value={year - 5 + i}>{year - 5 + i}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="grid grid-cols-7 overflow-hidden pr-px gap-0">
      {#each ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"] as day}
        <div class="text-center text-xs sm:text-sm md:text-base">{day}</div>
      {/each}
      {#each Array(daysBefore) as _, i}
        <div class="w-32 h-30" />
      {/each}
      {#each days as day, i}
        <div
          class="relative aspect-square outline outline-black outline-1 mt-1 ml-1 w-auto {dayjs().isSame(
            dayjs()
              .month(month)
              .date(i + 1),
            'D'
          )
            ? `!outline-primary-400 outline-2 z-20`
            : ''}"
        >
          <span class="absolute text-xs bottom-0 right-1">{i + 1}</span>
          {#each day.slots as slot}
            {#if slot}
              <div
                class="relative p-0 m-0 w-full h-[14px] sm:h-[18px] md:h-[22px] lg:h-6 bg-[var(--bgCol)]"
                style="--bgCol: {slot.color || '#000'}"
              >
                <span
                  class="z-10 text-token text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px] absolute whitespace-nowrap -top-[4px] left-0"
                  >{dayjs(slot.startDate).date() === i + 1 || i + 1 === 1
                    ? slot.name
                    : ""}</span
                >
              </div>
            {:else}
              <div
                class="relative p-0 m-0 w-full h-[14px] sm:h-[18px] md:h-[22px] flex items-start lg:h-6"
              />
            {/if}
          {/each}
        </div>
      {/each}
      <div class="w-32 h-32" />
    </div>
    <div class="flex flex-row">
      <button class="btn variant-filled-primary mr-auto" on:click={prevMonth}
        >Prev</button
      >
      <button class="btn variant-filled-primary ml-auto" on:click={nextMonth}
        >Next</button
      >
    </div>
  </div>
</div>
