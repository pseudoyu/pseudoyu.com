<script setup lang="ts">
// No imports needed
</script>

<template>
  <div class="sponsors-container" mt-10 w-full max-w-200 mx-auto>
    <div flex="~ gap-2 items-center justify-center" z-100 mt-5 op50>
      <span>Sponsor Tiers</span>
    </div>

    <!-- Special Sponsor -->
    <div mt-10>
      <h2 text-2xl font-bold mb-10 text-center>
        Special Sponsor
      </h2>
      <div class="sponsor-item" flex="~ col" items-center justify-center mb-15>
        <a
          href="https://github.com/RSS3-Network" target="_blank" rel="noopener noreferrer"
          flex="~ col" items-center hover:op100 op90 transition
        >
          <img
            src="https://raw.githubusercontent.com/rss3-network/.github/main/content/logo-blue.svg"
            alt="RSS3 Network"
            w-60 h-auto mb-4
          >
        </a>
      </div>
    </div>

    <!-- Basic Sponsors -->
    <div mt-15>
      <h2 text-2xl font-bold mb-10 text-center>
        Sponsors
      </h2>
      <div class="sponsor-list" flex justify-center flex-wrap gap-4>
        <div class="sponsor-item" flex="~ col" items-center>
          <a
            href="https://github.com/CaiGeen" target="_blank" rel="noopener noreferrer"
            flex="~ col" items-center hover:op100 op80 transition p-2
          >
            <img
              src="https://avatars.githubusercontent.com/u/9194254?v=4"
              alt="CaiGeen"
              w-16 h-16 rounded-full mb-2
            >
          </a>
        </div>
        <div class="sponsor-item" flex="~ col" items-center>
          <a
            href="https://github.com/hyoban" target="_blank" rel="noopener noreferrer"
            flex="~ col" items-center hover:op100 op80 transition p-2
          >
            <img
              src="https://avatars.githubusercontent.com/u/38493346?v=4"
              alt="Hyoban"
              w-16 h-16 rounded-full mb-2
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
