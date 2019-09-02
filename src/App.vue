<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleNavigation"
        >
          <el-menu-item index="1">首页</el-menu-item>

          <el-menu-item index="2">合并Excel表格&排序</el-menu-item>

          <el-menu-item index="3">综测自动评判</el-menu-item>

          <el-menu-item index="4">综合测评管理办法</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
                      
<script>
// import mergeExcel from "./views/page/mergeExcel.vue";
// import selectGood from "./views/page/selectGood.vue";
// import home from "./views/page/home.vue";
//   components: { home, mergeExcel, selectGood },

export default {
  name: "app",
  data: function() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    //导航处理
    handleNavigation(key, keyPath) {
      console.log(key);
      switch (key) {
        case "1":
          this.activeIndex = "1";
          this.$router.push("/");
          break;
        case "2":
          this.activeIndex = "2";
          this.$router.push("/m");
          break;
        case "3":
          this.activeIndex = "3";
          this.$router.push("/s");
          break;
        case "4":
          this.activeIndex = "4";

          window.open(
            "http://cdn.i7code.cn/%E4%BB%B2%E5%AD%A6%E5%AD%97%E3%80%942013%E3%80%9522%E5%8F%B7%EF%BC%8C%E5%85%B3%E4%BA%8E%E5%8D%B0%E5%8F%91%E3%80%8A%E4%BB%B2%E6%81%BA%E5%86%9C%E4%B8%9A%E5%B7%A5%E7%A8%8B%E5%AD%A6%E9%99%A2%E5%AD%A6%E7%94%9F%E7%BB%BC%E5%90%88%E6%B5%8B%E8%AF%84%E7%AE%A1%E7%90%86%E5%8A%9E%E6%B3%95%E3%80%8B%E7%9A%84%E9%80%9A%E7%9F%A5.pdf",
            "_blank"
          );
        default:
          break;
      }
    }
  }
};
</script>


<style>
.logo {
  height: 70px;
  background: #fbfef5;
}

.header-text {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  font-size: 24px;
  margin-top: 15px;
  color: #fbfef5;
  letter-spacing: 2px;
}
</style>
