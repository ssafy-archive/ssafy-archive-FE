<template>
  <footer class="footer">
    <nav class="footer-nav">
      <div class="nav-item">
        <div class="icon-wrapper">
          <i class="fas fa-clipboard"></i>
        </div>
        <span class="nav-text">자유게시판</span>
      </div>
      <div class="nav-item">
        <div class="icon-wrapper">
          <i class="fas fa-share-alt"></i>
        </div>
        <span class="nav-text">정보 공유</span>
      </div>
      <div class="nav-item">
        <div class="icon-wrapper">
          <i class="fas fa-images"></i>
        </div>
        <span class="nav-text">갤러리</span>
      </div>
      <div class="nav-item">
        <div class="icon-wrapper">
          <i class="fas fa-user"></i>
        </div>
        <span class="nav-text">마이페이지</span>
      </div>
    </nav>
  </footer>
</template>

<script setup lang="ts">
// You may need to add Font Awesome or other icon libraries to your project
// Add this to your main.js or index.html file if you're using Font Awesome
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
  z-index: 100;
  border-top: 1px solid #f0f0f0;
}

.footer-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 5px 0;
  width: 25%;
  text-align: center;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  color: #666;
}

.nav-item:hover .icon-wrapper,
.nav-item.active .icon-wrapper {
  color: #4285f4; /* Blue color from the image */
}

.nav-text {
  font-size: 12px;
  color: #666;
}

.nav-item:hover .nav-text,
.nav-item.active .nav-text {
  color: #4285f4; /* Blue color from the image */
  font-weight: 500;
}

/* Black indicator at bottom of screen */
.footer:after {
  content: '';
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translateX(-50%);
  width: 25%;
  height: 4px;
  background-color: #222;
  border-radius: 4px;
}

/* Responsive styles */
@media (min-width: 768px) {
  /* For desktop view, you can adjust styles if needed */
  .footer-nav {
    max-width: 600px;
    margin: 0 auto;
    padding: 15px 0;
  }

  .icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .nav-text {
    font-size: 14px;
  }
}

/* For very small screens */
@media (max-width: 320px) {
  .icon-wrapper {
    width: 30px;
    height: 30px;
  }

  .nav-text {
    font-size: 10px;
  }
}
</style>
