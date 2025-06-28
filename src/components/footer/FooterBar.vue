<template>
  <footer class="border-border bg-background fixed right-0 bottom-0 left-0 z-50 border-t">
    <div class="relative">
      <!-- Black indicator at bottom of screen (shadcn style) -->
      <div class="bg-foreground absolute bottom-2 left-1/2 h-1 w-1/4 -translate-x-1/2 rounded-full"></div>

      <nav class="mx-auto flex max-w-md items-center justify-around px-4 py-2 md:max-w-2xl md:py-4">
        <button class="group flex w-1/4 cursor-pointer flex-col items-center p-1 transition-colors">
          <div
            class="text-muted-foreground group-hover:text-primary group-active:text-primary mb-1 flex h-10 w-10 items-center justify-center transition-colors md:h-12 md:w-12 md:text-lg">
            <i class="fas fa-clipboard"></i>
          </div>
          <span
            class="text-muted-foreground group-hover:text-primary group-active:text-primary text-xs transition-colors group-hover:font-medium group-active:font-medium md:text-sm">
            자유게시판
          </span>
        </button>

        <button class="group flex w-1/4 cursor-pointer flex-col items-center p-1 transition-colors">
          <div
            class="text-muted-foreground group-hover:text-primary group-active:text-primary mb-1 flex h-10 w-10 items-center justify-center transition-colors md:h-12 md:w-12 md:text-lg">
            <i class="fas fa-share-alt"></i>
          </div>
          <span
            class="text-muted-foreground group-hover:text-primary group-active:text-primary text-xs transition-colors group-hover:font-medium group-active:font-medium md:text-sm">
            정보 공유
          </span>
        </button>

        <button class="group flex w-1/4 cursor-pointer flex-col items-center p-1 transition-colors">
          <div
            class="text-muted-foreground group-hover:text-primary group-active:text-primary mb-1 flex h-10 w-10 items-center justify-center transition-colors md:h-12 md:w-12 md:text-lg">
            <i class="fas fa-images"></i>
          </div>
          <span
            class="text-muted-foreground group-hover:text-primary group-active:text-primary text-xs transition-colors group-hover:font-medium group-active:font-medium md:text-sm">
            갤러리
          </span>
        </button>

        <button class="group flex w-1/4 cursor-pointer flex-col items-center p-1 transition-colors">
          <div
            class="text-muted-foreground group-hover:text-primary group-active:text-primary mb-1 flex h-10 w-10 items-center justify-center transition-colors md:h-12 md:w-12 md:text-lg">
            <i class="fas fa-user"></i>
          </div>
          <span
            class="text-muted-foreground group-hover:text-primary group-active:text-primary text-xs transition-colors group-hover:font-medium group-active:font-medium md:text-sm">
            마이페이지
          </span>
        </button>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Font Awesome 또는 다른 아이콘 라이브러리가 필요합니다.
// main.ts 또는 index.html 파일에 Font Awesome을 추가하세요.
</script>
