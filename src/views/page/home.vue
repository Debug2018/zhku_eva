<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="综测结果评判使用说明" name="1">
        <div>
          <li>收齐各班的综测文件后 进入 合并Excel&排序</li>
          <li>按照专业年级进行 合并Excel&排序</li>
          <li>上一步完成后 进入 综合测评自动评判</li>
          <li>将前面导出的Excel文件导入到 综合测评自动评判 中</li>
          <li>点击 一键评测 导出评选结果Excel</li>
          <li>导出的Excel原样式丢失 可重新进行格式刷</li>
        </div>
      </el-collapse-item>
      <el-collapse-item title="注意事项" name="2">
        <div>
          <li>挂科不予评选：当 是否挂科 一栏值为"是" 时判断该同学有挂科，不参与综测评优（是否挂科一栏需手动添加）</li>
          <li>排序规则：如有第五名和第六名成绩相等时，则有两个第五名（没有第六名）下一名显示第七名</li>
        </div>
      </el-collapse-item>
      <el-collapse-item title="示例文件" name="3">
        <div>
          <div>导入数据1</div>
          <a
            href="http://imgs.91ans.com/%E6%B5%8B%E8%AF%95020%E7%8F%AD%E7%BB%BC%E6%B5%8B%E6%B1%87%E6%80%BB%E8%A1%A8.xlsx"
          >测试020班综测汇总表.xlsx</a>

          <div>导入数据2</div>
          <a
            href="http://imgs.91ans.com/%E6%B5%8B%E8%AF%95021%E7%8F%AD%E7%BB%BC%E6%B5%8B%E6%B1%87%E6%80%BB%E8%A1%A8.xlsx"
          >测试021班综测汇总表.xlsx</a>

          <div>合并Excel&排序后导出的文件示例</div>
          <a
            href="http://imgs.91ans.com/%E6%B5%8B%E8%AF%9502%E7%BA%A7%E7%BB%BC%E6%B5%8B%E6%B1%87%E6%80%BB%E8%A1%A8.xlsx"
          >测试021级综测汇总表.xlsx</a>

          <div>综合测评自动评判后导出的文件示例</div>
          <a
            href="http://imgs.91ans.com/%E9%99%84%E4%BB%B61%EF%BC%9A%E5%90%84%E5%B9%B4%E7%BA%A7%E4%B8%93%E4%B8%9A%E7%BB%BC%E6%B5%8B%E6%B1%87%E6%80%BB%E8%A1%A8.xlsx"
          >附件1：各年级专业综测汇总表.xlsx</a>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  created: function() {
    console.log("Create");
  },

  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  data: function() {
    return {
      valueGK: [],
      activeNames: ["1"]
    };
  }
};
</script>>

<style  scoped>
a {
  text-decoration: none;
}
</style>