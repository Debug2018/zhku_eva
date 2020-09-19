
<template>
  <div class="page">
    <el-container>
      <el-aside
        class="aside"
        width="310px"
        height="2000px"
        style="margin-right:-20px;border-right: 2px solid #f7f7f7;"
      >
        <div class="my-table">
          <div class="my-col-left">
            <div class="my-col">
              <p id="info-col-title">表格信息</p>
              <div class="my-row">
                <p id="info-left-text">总人数/人</p>
                <div id="info-right-text">{{allStuNum}}</div>

                <!-- <el-input
                  id="info-right-text"
                  v-model="allStuNum"
                  size="mini"
                  type="number"
                  placeholder="总人数"
                ></el-input>-->
              </div>
            </div>
          </div>
        </div>
      </el-aside>

      <el-main>
        <div class="top">
          <div class="my-table">
            <div class="my-col-left" style="width: 320px;">
              <div class="my-col">
                <p id="info-col-title">已合并排序文件</p>
                <div class="my-row" v-for="(item,index) in finishFileList" :key="index">
                  <p id="info-left-text">{{item.name}}</p>
                  <!-- <i class="el-icon-delete" id="info-right-text-icon"></i> -->

                  <el-button
                    @click="handleExpore(item,index)"
                    type="primary"
                    icon="el-icon-download"
                    id="info-right-text-icon"
                  ></el-button>
                  <el-button
                    @click="handleRemoveFinishFileList(item,index)"
                    type="danger"
                    icon="el-icon-delete"
                    id="info-right-text-icon"
                  ></el-button>
                </div>
              </div>
            </div>
          </div>

          <div class="my-table">
            <div class="my-col-left" style="width: 320px;">
              <div class="my-col">
                <p id="info-col-title">已导入文件</p>
                <div class="my-row" v-for="(item,index) in fileList" :key="index">
                  <p id="info-left-text">{{item.name}}</p>
                  <!-- <i class="el-icon-delete" id="info-right-text-icon"></i> -->
                  <el-button
                    @click="handleRemove(item,index)"
                    type="danger"
                    icon="el-icon-delete"
                    id="info-right-text-icon"
                  ></el-button>
                </div>
              </div>
            </div>
          </div>

          <div class="my-table">
            <div class="my-col-left" style="width: 370px;">
              <div class="my-col">
                <p id="info-col-title" style="width: 360px;">导入文件</p>
                <el-upload
                  class="upload"
                  :show-file-list="false"
                  drag
                  action
                  :auto-upload="false"
                  multiple
                  :on-change="importExcel"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击导入</em>
                  </div>
                  <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </div>
            </div>
          </div>
        </div>
        <div class="operator">
          <div class="my-row">
            <el-select
              style="padding-right:10px;"
              size="mini"
              v-model="showWhich"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in finishFileList"
                :key="item.name"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
            <el-button
              style="margin-bottom:10px;"
              type="success"
              size="mini"
              @click="mergeExcel"
            >合并&排序已导入文件</el-button>

            <!-- <el-input
              style="width:242px;padding-left:10px;padding-right:10px;"
              v-model="filename"
              size="mini"
              placeholder="输入文件名，默认为原文件名"
            ></el-input>

            <el-button
              style="margin-bottom:10px;"
              type="success"
              size="mini"
              @click="exportExcel"
            >导出文件</el-button>-->
          </div>
        </div>

        <el-table
          :data="showTableData"
          style="width:100%;margin-bottom:60px;"
          border
          highlight-current-row
          header-align="center"
          stripe
          size="mini"
          height="600"
        >
          <el-table-column type="selection" width="45"></el-table-column>

          <el-table-column fixed type="index" :index="indexMethod" label="#" width="45"></el-table-column>

          <el-table-column fixed prop="姓名" label="姓名" width="60"></el-table-column>
          <!-- <el-table-column prop="身份证号码" label="身份证号码" width="180"></el-table-column> -->
          <el-table-column fixed sortable prop="学号" label="学号" width="110"></el-table-column>

          <!-- <el-table-column prop="性别" label="性别" width="50"></el-table-column> -->
          <!-- <el-table-column prop="学院" label="学院" width="120"></el-table-column> -->
          <el-table-column prop="专业班级" label="专业班级" width="70"></el-table-column>
          <!-- <el-table-column prop="入学年度" label="入学年度" width="80"></el-table-column> -->

          <el-table-column prop="是否干部" label="是否干部" width="70"></el-table-column>
          <!-- <el-table-column v-if="showAll" fixed="right" prop="is_cadre" label="干部名称" width="80"></el-table-column> -->

          <el-table-column prop="学业分" label="学业分" width="60"></el-table-column>
          <el-table-column sortable prop="学业分排名" label="排名" width="70"></el-table-column>

          <el-table-column prop="思想分" label="思想分" width="60"></el-table-column>

          <el-table-column sortable prop="思想分排名" label="排名" width="70"></el-table-column>

          <el-table-column prop="文体分" label="文体分" width="60"></el-table-column>
          <el-table-column sortable prop="文体分排名" label="排名" width="70"></el-table-column>

          <el-table-column prop="综合分" label="综合分" width="60"></el-table-column>
          <el-table-column sortable prop="综合分专业年级排名" label="年级排名" width="70"></el-table-column>

          <!-- <el-table-column prop="专业年级总人数" label="专业年级总人数" width="95"></el-table-column> -->
          <el-table-column prop="评优类别" label="评优类别" width="75"></el-table-column>

          <el-table-column align="right" width="100">
            <template
              slot="header"
              slot-scope="scope"
              @click.native="handleSearch(scope.$index, scope.row)"
            >
              <el-input v-model="search" size="mini" placeholder="搜索" />
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "selectGood",
  beforeCreate() {},
  watch: {
    fileList: function () {
      var data = this.fileList;
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        count += data[i].data.length;
      }
      this.allStuNum = count;
      this.good_student_bb = Math.round(count * 0.01);
      console.log("fileList has change");
      if (this.fileList.length <= 0) {
        this.showWhich = -1;
      }
    },

    showWhich: function () {
      console.log(this.showWhich);
      if (this.finishFileList.length > 0 && this.showWhich >= 0) {
        this.tableData = this.finishFileList[this.showWhich].data;
        this.showTableData = this.finishFileList[this.showWhich].data;
      }
    },

    search: function (search) {
      this.showTableData = this.tableData.filter((data) => {
        return (
          data["姓名"].includes(search) ||
          data["学号"].includes(search) ||
          data["专业班级"].includes(search)
        );
      });
    },
  },
  methods: {
    handleRemove(item, index) {
      this.fileList.splice(index, 1);
    },

    handleRemoveFinishFileList(item, index) {
      this.finishFileList.splice(index, 1);
    },

    handleExpore(item, index) {
      var data = this.finishFileList[index];
      this.exportExcel(data);
    },

    mergeExcel() {
      var fileList = this.fileList;
      console.log(fileList);
      var data = [];
      for (var i = 0; i < fileList.length; i++) {
        data = data.concat(fileList[i].data);
      }

      data.sort((a, b) => {
        return b["学业分"] - a["学业分"];
      });

      // for (let j = 0; j < data.length; j++) {
      //   data[j]["学业分排名"] = j + 1;
      // }

      for (let j = 0; j < data.length; j++) {
        if (j === 0) {
          data[j]["学业分排名"] = j + 1;
        } else {
          var tempNum = data[j - 1]["学业分"];

          if (data[j]["学业分"] === tempNum) {
            data[j]["学业分排名"] = data[j - 1]["学业分排名"];
          } else {
            data[j]["学业分排名"] = j + 1;
          }
        }
      }

      data.sort((a, b) => {
        return b["思想分"] - a["思想分"];
      });

      for (let j = 0; j < data.length; j++) {
        if (j === 0) {
          data[j]["思想分排名"] = j + 1;
        } else {
          var tempNum = data[j - 1]["思想分"];

          if (data[j]["思想分"] === tempNum) {
            data[j]["思想分排名"] = data[j - 1]["思想分排名"];
          } else {
            data[j]["思想分排名"] = j + 1;
          }
        }
      }

      data.sort((a, b) => {
        return b["文体分"] - a["文体分"];
      });

      for (let j = 0; j < data.length; j++) {
        if (j === 0) {
          data[j]["文体分排名"] = j + 1;
        } else {
          var tempNum = data[j - 1]["文体分"];

          if (data[j]["文体分"] === tempNum) {
            data[j]["文体分排名"] = data[j - 1]["文体分排名"];
          } else {
            data[j]["文体分排名"] = j + 1;
          }
        }
      }

      // for (let j = 0; j < data.length; j++) {
      //   data[j]["文体分排名"] = j + 1;
      // }

      data.sort((a, b) => {
        return b["综合分"] - a["综合分"];
      });
      for (let j = 0; j < data.length; j++) {
        if (j === 0) {
          data[j]["综合分专业年级排名"] = j + 1;
        } else {
          var tempNum = data[j - 1]["综合分"];

          if (data[j]["综合分"] === tempNum) {
            data[j]["综合分专业年级排名"] = data[j - 1]["综合分专业年级排名"];
          } else {
            data[j]["综合分专业年级排名"] = j + 1;
          }
        }
      }

      // for (let j = 0; j < data.length; j++) {
      //   data[j]["综合分专业年级排名"] = j + 1;
      // }

      var str = this.fileList[0].name;
      var num = str.match(/\d{3}/)[0].slice(2, 3);
      var s = str.split("").reverse().join("");
      var name = s.replace(num, "级").split("").reverse().join("");

      var obj = {
        name: name,
        data: data,
      };

      console.log(obj);
      this.finishFileList.push(obj);
      console.log(this.finishFileList);
      this.exportExcel(obj);
    },

    importExcel(file, fileList) {
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          let sheet = Object.keys(workbook.Sheets)[0];
          const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
          console.log(json);

          this.fileList.push({
            name: file.name,
            data: json,
          });
          // this.tableData = json;
        } catch (e) {
          console.log(e);
        }
      };

      fileReader.readAsBinaryString(file.raw);
    },

    exportExcelH() {
      console.log(this.fileList.length);
      var wb = XLSX.utils.book_new(); /*新建book*/
      var needData = [];

      for (var i = 0; i < this.fileList.length; i++) {
        var tempData = this.fileList[i].data.filter((data) => {
          return (
            data["评优类别"] === "三好学生标兵" ||
            data["评优类别"] === "三好学生" ||
            data["评优类别"] === "学习积极分子" ||
            data["评优类别"] === "文体积极分子" ||
            data["评优类别"] === "优秀学生干部"
          );
        });
        needData = needData.concat(tempData);
      }
      console.log(needData);

      needData = needData.map((data) => {
        return {
          姓名: data["姓名"],
          学院: data["学院"],
          学号: data["学号"],
          专业: data["专业"]
            ? data["专业"].replace(/\d{3,4}/, "")
            : data["专业"],
          年级: data["年级"],
          评优类别: data["评优类别"],
          身份证号码: data["身份证号码"],
          手机号码: data["手机号码"],
        };
      });
      console.log(needData);

      var ws = XLSX.utils.json_to_sheet(needData);

      XLSX.utils.book_append_sheet(wb, ws, "sheet");

      XLSX.writeFile(wb, "附件2：优秀学生单项积极分子名单汇总表.xlsx");
    },

    exportExcel(obj) {
      console.log(this.finishFileList.length);
      var name = obj.name;
      var data = obj.data;
      this.filename = name;

      var wb = XLSX.utils.book_new();

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "sheet");

      XLSX.writeFile(wb, name);

      this.filename = "请输入导入文件名称";
    },

    indexMethod(index) {
      return index + 1;
    },

    //没有用到的方法 临时解决报错问题
    handleSearch() {
      console.log("S");
    },
  },

  data: function () {
    return {
      gridData: [],

      allStuNum: 0, //学院总人数
      showWhich: undefined, //显示哪一个Excel
      showTableData: [], //展示的数据
      tableData: [], //没有展示的数据

      fileList: [],
      finishFileList: [],
      search: undefined,
      filename: "请输入导出文件名字", //导出文件名字
    };
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none !important;
}
.page {
  width: 100%;
}
.upload {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #fff;
  border-radius: 6px;
}

.top {
  display: flex;
  flex-direction: row;
  border-right: 2px solid #f7f7f7;
  margin-top: -20px;
}

.operator {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-table {
  display: flex;
  flex-direction: row;
}

.my-col-left {
  display: flex;
  flex-direction: column;
  width: 270px;
  padding-left: 20px;
  padding-right: 20px;
}

.my-row {
  display: flex;
  flex-direction: row;
}

.my-col {
  display: flex;
  flex-direction: column;
  padding-bottom: 6px;
}

#info-left-text {
  display: flex;
  justify-content: center;
  width: 100%;
  color: #303133;
  font-size: 13px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 5px;
  margin: 6px 10px 10px 0;
}

#info-right-text {
  display: flex;
  justify-content: center;
  width: 80px;
  color: #303133;
  font-size: 13px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 5px;
  margin: 6px 10px 10px 0;
}

#info-right-text-icon {
  display: flex;
  justify-content: flex-start;
  height: 30px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 5px;
  margin: 6px 10px 10px 0;
}

#info-col-title {
  display: flex;
  justify-content: center;
  background: #409eff;
  color: #fff;
  font-size: 13px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 5px;
  margin: 10px 0 10px 0;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

