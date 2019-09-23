
<template>
  <div class="page">
    <el-container>
      <el-aside width="280px;" style="margin-right:-20px;border-right: 2px solid #f7f7f7;">
        <div class="my-table">
          <div class="my-col-left">
            <div class="my-col">
              <p id="info-col-title">综合测评配置</p>
              <div class="my-row">
                <div id="info-left-text">学院总人数</div>
                <div id="info-right-text">{{allStuNum}}</div>

                <!-- <el-input
                  id="info-right-text"
                  v-model="allStuNum"
                  size="mini"
                  type="number"
                  placeholder="学院总人数"
                ></el-input>-->
              </div>

              <div class="my-row">
                <div id="info-left-text">三好学生标兵</div>
                <div id="info-right-text">{{good_student_bb}}</div>
                <!-- <el-input
                  id="info-right-text"
                  v-model="good_student_bb"
                  size="mini"
                  type="number"
                  placeholder="三好学生标兵"
                ></el-input>-->
              </div>

              <div v-for="(item,index) in fileList" :key="index">
                <p
                  id="info-col-title"
                  style="background-color:#8cc540;"
                >{{item.name.replace(".xlsx","").replace(".xls","")}} 应评选人数</p>

                <div class="my-row">
                  <div id="info-left-text">三好学生</div>
                  <div id="info-right-text">{{item.good_student}}</div>

                  <!-- <el-input
                    id="info-right-text"
                    v-model="item.good_student"
                    size="mini"
                    type="number"
                    placeholder="三好学生"
                  ></el-input>-->
                </div>

                <div class="my-row">
                  <div id="info-left-text">单项积极分子</div>
                  <div id="info-right-text">{{item.good_activate}}</div>

                  <!-- <el-input
                    id="info-right-text"
                    v-model="item.good_activate"
                    size="mini"
                    type="number"
                    placeholder="单项积极分子"
                  ></el-input>-->
                </div>

                <!-- <div class="my-row">
                  <el-popover
                    placement="top-start"
                    title="评选标准"
                    width="200"
                    trigger="hover"
                    content="这是一段内容\N这是一段内容
                    这是一段内容,这是一段内容。"
                  >
                    <el-button
                      slot="reference"
                      id="info-col-title"
                      style="background-color:#8cc540;width:200px;margin-left:26px;"
                    >评选标准</el-button>
                  </el-popover>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </el-aside>

      <el-main style="margin-right:-26px;">
        <div class="top">
          <!-- <div class="my-table">
            <div class="my-col-left">
              <div class="my-col">
                <p id="info-col-title">已评选人数</p>
                <div class="my-row">
                  <p id="info-left-text">三好学生标兵{{good_student_bb}}人</p>
                </div>
                <div class="my-row">
                  <p id="info-left-text">三好学生{{good_student_bb}}人</p>
                </div>
                <div class="my-row">
                  <p id="info-left-text">单项积极分子{{good_student_bb}}人</p>
                </div>
              </div>
            </div>
          </div>-->

          <div class="my-table">
            <div class="my-col-left" style="width: 370px;">
              <div class="my-col">
                <p id="info-col-title">已导入文件</p>
                <div class="my-row" v-for="(item,index) in fileList" :key="index">
                  <div id="info-left-text">{{item.name}}</div>
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
            <el-button
              style="margin-bottom:10px;"
              type="success"
              size="mini"
              @click="chooseGooodStu"
            >一键评选</el-button>

            <el-input
              style="width:242px;padding-left:10px;padding-right:10px;margin-bottom:10px;"
              v-model="filename"
              size="mini"
              placeholder="输入文件名，默认为原文件名"
            ></el-input>

            <el-button
              style="margin-bottom:10px;"
              type="success"
              size="mini"
              @click="exportExcel"
            >导出文件</el-button>

            <el-button
              style="margin-bottom:10px;"
              type="success"
              size="mini"
              @click="exportExcelH"
            >导出名单汇总文件</el-button>
          </div>
          <div class="my-row">
            <el-select size="mini" v-model="showWhich" placeholder="请选择">
              <el-option
                v-for="(item,index) in fileList"
                :key="item.name"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
            <div>
              <el-button size="mini" data-id="0" @click="showWhat(1)">显示全部{{tableData.length}}</el-button>
              <el-button size="mini" data-id="1" @click="showWhat(2)">优秀学生</el-button>
              <el-button size="mini" data-id="2" @click="showWhat(8)">三好学生标兵</el-button>

              <el-button size="mini" data-id="2" @click="showWhat(3)">三好学生</el-button>
              <el-button size="mini" data-id="3" @click="showWhat(4)">单项积极分子</el-button>
              <el-button size="mini" data-id="4" @click="showWhat(5)">优秀学生干部</el-button>
              <el-button size="mini" data-id="5" @click="showWhat(6)">学习积极分子</el-button>
              <el-button size="mini" data-id="6" @click="showWhat(7)">文体积极分子</el-button>
            </div>
          </div>
        </div>
        <!-- .filter(data => !search|| data['姓名'].includes(search) || data['学号'].includes(search) || data['专业班级'].includes(search)  ) -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <div style="margin-left:10px;margin-bottom:10px;">
          <el-button
            type="primary"
            size="mini"
            plain
            @click="makeSure"
            v-if="showSelect"
          >请在下面构选正确的三好学生标兵人选后 点我确定选择</el-button>
        </div>
        <el-table
          :data="showTableData"
          style="width:100%;margin-bottom:60px;"
          border
          highlight-current-row
          header-align="center"
          stripe
          @selection-change="handleSelectionChange"
          size="mini"
          height="600"
        >
          <el-table-column type="selection" width="45"></el-table-column>

          <el-table-column fixed type="index" :index="indexMethod" label="#" width="45"></el-table-column>

          <el-table-column fixed prop="姓名" label="姓名" width="60"></el-table-column>
          <!-- <el-table-column prop="身份证号码" label="身份证号码" width="180"></el-table-column> -->
          <el-table-column fixed sortable prop="学号" label="学号" width="100"></el-table-column>

          <!-- <el-table-column prop="性别" label="性别" width="50"></el-table-column> -->
          <!-- <el-table-column prop="学院" label="学院" width="120"></el-table-column> -->
          <el-table-column prop="专业班级" label="专业班级" width="70"></el-table-column>
          <!-- <el-table-column prop="入学年度" label="入学年度" width="80"></el-table-column> -->

          <el-table-column prop="是否干部" label="是否干部" width="50"></el-table-column>
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

          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <!-- <el-button
                style="margin-left:20px;"
                @click="handleClick(scope.row)"
                type="text"
                size="mini"
              >查看</el-button>-->

              <el-popover placement="right" width="500" trigger="click">
                <el-table
                  :data="gridData"
                  border
                  align="center"
                  :row-class-name="tableRowClassName"
                  highlight-current-row
                  header-align="center"
                  stripe
                  size="mini"
                >
                  <el-table-column width="120" property="l" label="名称/排名"></el-table-column>
                  <el-table-column width="80" property="xy" label="学业分"></el-table-column>
                  <el-table-column width="80" property="sx" label="思想分"></el-table-column>
                  <el-table-column width="80" property="wt" label="文体分"></el-table-column>
                  <el-table-column width="80" property="zh" label="综合分"></el-table-column>
                </el-table>
                <el-button slot="reference" @click="handleClick(scope.row)" size="mini">查看</el-button>
              </el-popover>
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
    fileList: function() {
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

    search: function(search) {
      this.showTableData = this.tableData.filter(data => {
        return (
          data["姓名"].includes(search) ||
          data["学号"].includes(search) ||
          data["专业班级"].includes(search)
        );
      });
    },

    showWhich: function() {
      console.log(this.showWhich);
      if (this.fileList.length > 0 && this.showWhich >= 0) {
        this.tableData = this.fileList[this.showWhich].data;
        this.showTableData = this.fileList[this.showWhich].data;
      }
    }
  },
  methods: {
    handleRemove(item, index) {
      console.log(item, index);
      //   let index = this.fileList.indexOf(file.name);
      //   console.log(index);
      this.fileList.splice(index, 1);
      // this.fileList = this.fileList.splice(index, 1);
    },

    importExcel(file, fileList) {
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          let sheet = Object.keys(workbook.Sheets)[0];
          const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
          console.log(json);

          var good_student = Math.round(json.length * 0.07);
          var good_activate = Math.round(json.length * 0.1);
          var good_activate_xc = 0;
          var good_activate_gb = 0;
          var good_activate_wt = 0;
          var standard = "";

          this.fileList.push({
            name: file.name,
            data: json,
            good_student: good_student,
            good_activate: good_activate,
            good_activate_xc: good_activate_xc,
            good_activate_gb: good_activate_gb,
            good_activate_wt: good_activate_wt,
            standard: standard
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
        var tempData = this.fileList[i].data.filter(data => {
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

      needData = needData.map(data => {
        return {
          姓名: data["姓名"],
          学院: data["学院"],
          学号: data["学号"],
          专业: data["专业班级"].replace(/\d{3,4}/, ""),
          年级: data["入学年度"],
          评优类别: data["评优类别"],
          身份证号码: data["身份证号码"],
          手机号码: data["手机号码"]
        };
      });
      console.log(needData);

      var ws = XLSX.utils.json_to_sheet(needData);

      XLSX.utils.book_append_sheet(wb, ws, "sheet");

      XLSX.writeFile(wb, "附件2：优秀学生单项积极分子名单汇总表.xlsx");
    },

    exportExcel() {
      /* 创建worksheet */
      // var ws = XLSX.utils.json_to_sheet(this.tableData);

      // /* 新建空workbook，然后加入worksheet */
      // var wb = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, ws, "People");

      // /* 生成xlsx文件 */
      // XLSX.writeFile(wb, "sheetjs.xlsx");

      console.log(this.fileList.length);
      var wb = XLSX.utils.book_new(); /*新建book*/

      for (var i = 0; i < this.fileList.length; i++) {
        var ws = XLSX.utils.json_to_sheet(this.fileList[i].data);
        var sheetName = this.fileList[i].name
          .replace(".xlsx", "")
          .replace(".xls", "");
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      }

      XLSX.writeFile(wb, this.filename);

      // var wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   bookSST: true,
      //   type: "array"
      // });
      // try {
      //   FileSaver.saveAs(
      //     new Blob([wbout], { type: "application/octet-stream" }),
      //     "sheetjs.xlsx"
      //   );
      // } catch (e) {
      //   if (typeof console !== "undefined") console.log(e, wbout);
      // }
      // return wbout;

      //原来

      // var wb = XLSX.utils.table_to_book(document.querySelector("#tablei"));
      // var wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   bookSST: true,
      //   type: "array"
      // });
      // try {
      //   FileSaver.saveAs(
      //     new Blob([wbout], { type: "application/octet-stream" }),
      //     "sheetjs.xlsx"
      //   );
      // } catch (e) {
      //   if (typeof console !== "undefined") console.log(e, wbout);
      // }
      // return wbout;
    },

    getStandard(allNum) {
      var per10 = Math.round(allNum * 0.1);
      var per20 = Math.round(allNum * 0.2);
      var per30 = Math.round(allNum * 0.3);
      var per40 = Math.round(allNum * 0.4);

      var list = [
        {
          l: "三好学生标兵",
          xy: per10,
          sx: per10,
          wt: per20,
          zh: per10
        },
        {
          l: "三好学生",
          xy: per30,
          sx: per30,
          wt: per40,
          zh: per30
        },
        {
          l: "优秀学生干部",
          xy: "无要求",
          sx: per20,
          wt: "无要求",
          zh: per30
        },
        {
          l: "学习积极分子",
          xy: per20,
          sx: "无要求",
          wt: "无要求",
          zh: "无要求"
        },
        ,
        {
          l: "文体积极分子",
          xy: "无要求",
          sx: "无要求",
          wt: per20,
          zh: "无要求"
        }
      ];

      return list;
    },

    is_san_bb(obj, allNum) {
      var per10 = Math.round(allNum * 0.1);
      var per20 = Math.round(allNum * 0.2);
      var per30 = Math.round(allNum * 0.3);
      var per40 = Math.round(allNum * 0.4);
      //三好学生标兵
      var is_zero =
        obj["综合分专业年级排名"] <= per10 &&
        obj["文体分排名"] <= per20 &&
        obj["思想分排名"] <= per10 &&
        obj["学业分排名"] <= per10;
      return is_zero;
    },

    is_good_student(obj, allNum) {
      /**
       *判断是否评优
       * return 0   三好学生标兵
       * return 1   三好学生
       * return 20  优秀学生干部
       * return 21  学习积极分子
       * return 22  文体积极分子
       * return -1  else
       */
      var per10 = Math.round(allNum * 0.1);
      var per20 = Math.round(allNum * 0.2);
      var per30 = Math.round(allNum * 0.3);
      var per40 = Math.round(allNum * 0.4);

      //挂科 or 已评 直接return
      if (obj["是否挂科"] === "是") {
        console.log(obj["是否挂科"]);
        return -1;
      }
      if (obj["评优类别"] === "三好学生标兵") return -1;

      //三好学生标兵
      // var is_zero =
      //   obj["综合分专业年级排名"] <= per10 &&
      //   obj["文体分排名"] <= per20 &&
      //   obj["思想分排名"] <= per10 &&
      //   obj["学业分排名"] <= per10;
      //三好学生
      var is_one =
        obj["综合分专业年级排名"] <= per30 &&
        obj["文体分排名"] <= per40 &&
        obj["思想分排名"] <= per30 &&
        obj["学业分排名"] <= per30;

      // console.log(obj["姓名"], is_one);
      //优秀学生干部
      if (typeof obj["是否干部"] === "string") {
        obj["是否干部"] = obj["是否干部"].trim();
      }
      var is_tow_zero =
        obj["是否干部"] === "是" &&
        obj["综合分专业年级排名"] <= per30 &&
        obj["思想分排名"] <= per20;

      //学习积极分子
      var is_tow_one = obj["学业分排名"] <= per20;

      //文体积极分子
      // if (is_zero) return 0;
      var is_two_two = obj["文体分排名"] <= per20;

      if (is_one && is_tow_zero) return 120;
      else if (is_one && is_tow_one) return 121;
      else if (is_one && is_two_two) return 121;
      else if (is_one) return 1;
      else if (is_tow_zero) return 20;
      else if (is_tow_one) return 21;
      else if (is_two_two) return 22;
      else return -1;
    },

    //三号学生标兵 评选
    chooseGood_one() {
      var that = this;
      let dataList = this.fileList;
      let successData = [];
      let needNum = this.good_student_bb;
      for (var i = 0; i < dataList.length; i++) {
        var length = dataList[i].data.length;
        for (var j = 0; j < length; j++) {
          var status = that.is_san_bb(dataList[i].data[j], length);

          if (status) {
            // dataList[i].data[j]["评优类别"] = "三好学生标兵";
            console.log(dataList[i].data[j]["评优类别"]);
            needNum--;
            successData.push(dataList[i].data[j]);
          }
        }
      }

      if (successData.length > this.good_student_bb) {
        return { code: -1, result: successData };
      } else {
        //没有问题
        console.log("没有问题");
        this.fileList = dataList;
        this.good_student_bb = needNum;

        return { code: 0, result: successData };
      }

      // this.fileList = dataList;
    },

    handleClick(row) {
      console.log(row);
      console.log(this.showWhich);
      console.log(this.fileList[this.showWhich]);
      var list = this.getStandard(this.fileList[this.showWhich].data.length);
      console.log(list);
      var obj = {
        l: row["姓名"],
        xy: row["学业分排名"],
        sx: row["思想分排名"],
        wt: row["文体分排名"],
        zh: row["综合分专业年级排名"]
      };
      list.unshift(obj);
      this.gridData = list;
    },

    chooseGooodStu(selectGood = true) {
      /*
       * selectGood 是否需要先进行三好学生标兵的选择
       */
      var that = this;
      if (selectGood) {
        var res = this.chooseGood_one();
        if (res.code === -1) {
          // this.tableData = res.result.successData;

          this.showTableData = res.result;
          // this.showWhat(8);
          this.showSelect = true;
          this.$message({
            showClose: true,
            message: "三好学生标兵符合人数大于应评人数,请手动选择",
            type: "warning",
            duration: 5000
          });
          console.log(res);
          // this.showWhat(8);
          return;
        }
      }
      var dataList = this.fileList;

      for (var i = 0; i < dataList.length; i++) {
        var length = dataList[i].data.length;
        for (var j = 0; j < length; j++) {
          var status = that.is_good_student(dataList[i].data[j], length);
          // name: file.name,
          //data: json,
          //good_student: good_student,
          //good_activate: good_activate,
          //good_activate_xc: good_activate_xc,
          //good_activate_gb: good_activate_gb,
          //good_activate_wt: good_activate_wt
          switch (status) {
            // case 0:
            //   if (this.good_student_bb > 0) {
            //     dataList[i].data[j]["评优类别"] = "三好学生标兵";
            //     this.good_student_bb--;
            //   }
            //   break;
            case 120:
              if (dataList[i].good_student > 0) {
                dataList[i].data[j]["评优类别"] = "三好学生";
                dataList[i].good_student--;
                break;
              }
              if (
                dataList[i].good_student <= 0 &&
                dataList[i].good_activate > 0
              ) {
                dataList[i].data[j]["评优类别"] = "优秀学生干部";
                dataList[i].good_activate--;
                break;
              }
              break;
            case 121:
              if (dataList[i].good_student > 0) {
                dataList[i].data[j]["评优类别"] = "三好学生";
                dataList[i].good_student--;
                break;
              }
              if (
                dataList[i].good_student <= 0 &&
                dataList[i].good_activate > 0
              ) {
                dataList[i].data[j]["评优类别"] = "学习积极分子";
                dataList[i].good_activate--;
                break;
              }
              break;
            case 122:
              if (dataList[i].good_student > 0) {
                dataList[i].data[j]["评优类别"] = "三好学生";
                dataList[i].good_student--;
                break;
              }
              if (
                dataList[i].good_student <= 0 &&
                dataList[i].good_activate > 0
              ) {
                dataList[i].data[j]["评优类别"] = "文体积极分子";
                dataList[i].good_activate--;
                break;
              }
              break;
            case 1:
              if (dataList[i].good_student > 0) {
                dataList[i].data[j]["评优类别"] = "三好学生";
                dataList[i].good_student--;
              }
              break;
            case 20:
              if (dataList[i].good_activate > 0) {
                dataList[i].data[j]["评优类别"] = "优秀学生干部";
                dataList[i].good_activate--;
              }
              break;
            case 21:
              if (dataList[i].good_activate > 0) {
                dataList[i].data[j]["评优类别"] = "学习积极分子";
                dataList[i].good_activate--;
              }
              break;
            case 22:
              if (dataList[i].good_activate > 0) {
                dataList[i].data[j]["评优类别"] = "文体积极分子";
                dataList[i].good_activate--;
              }
              break;
            default:
              break;
          }
        }
      }

      this.fileList = dataList;
      this.$message({
        showClose: true,
        message: "评选完成",
        type: "success"
      });
    },

    formatter(row, column) {
      console.log(row, column);
      return row.$index;
    },
    indexMethod(index) {
      return index + 1;
    },
    showWhat(id) {
      console.log(id);
      switch (id) {
        case 1:
          this.showTableData = this.tableData;
          break;
        case 2:
          this.showTableData = this.tableData.filter(data => {
            return (
              data["评优类别"] === "三好学生标兵" ||
              data["评优类别"] === "三好学生" ||
              data["评优类别"] === "学习积极分子" ||
              data["评优类别"] === "文体积极分子" ||
              data["评优类别"] === "优秀学生干部"
            );
          });
          break;
        case 3:
          this.showTableData = this.tableData.filter(data => {
            return data["评优类别"] === "三好学生";
          });
          break;
        case 4:
          this.showTableData = this.tableData.filter(data => {
            return (
              data["评优类别"] === "学习积极分子" ||
              data["评优类别"] === "文体积极分子" ||
              data["评优类别"] === "优秀学生干部"
            );
          });
          break;
        case 5:
          this.showTableData = this.tableData.filter(data => {
            return data["评优类别"] === "优秀学生干部";
          });
          break;
        case 6:
          this.showTableData = this.tableData.filter(data => {
            return data["评优类别"] === "学习积极分子";
          });
          break;
        case 7:
          this.showTableData = this.tableData.filter(data => {
            return data["评优类别"] === "文体积极分子";
          });
          break;
        case 8:
          var dataList = this.fileList;
          console.log(dataList);
          var needData = [];
          for (var i = 0; i < dataList.length; i++) {
            for (var j = 0; j < dataList[i].data.length; j++) {
              if (dataList[i].data[j]["评优类别"] === "三好学生标兵") {
                needData.push(dataList[i].data[j]);
              }
            }
          }
          console.log(needData);
          this.showTableData = needData;
          break;

        default:
          break;
      }
    },
    //没有用到的方法 临时解决报错问题
    handleSearch() {
      console.log("S");
    },

    handleSelectionChange(val) {
      if (this.showSelect) {
        var da = val.map(data => data["学号"]);
        console.log(da);
        this.multipleSelection = da;
      }
    },

    makeSure() {
      var selectData = this.multipleSelection;

      if (selectData.length != this.good_student_bb) {
        this.$message({
          showClose: true,
          message: "需选择" + this.good_student_bb + "人",
          type: "warning"
        });
        return;
      }

      this.showSelect = false;
      var dataList = this.fileList;
      console.log(selectData);
      for (var i = 0; i < dataList.length; i++) {
        var length = dataList[i].data.length;
        for (var j = 0; j < length; j++) {
          if (
            selectData.includes(dataList[i].data[j]["学号"]) &&
            this.good_student_bb > 0
          ) {
            dataList[i].data[j]["评优类别"] = "三好学生标兵";
            console.log(dataList[i].data[j]);

            this.good_student_bb--;
          }
        }
      }
      this.fileList = dataList;
      this.tableData = this.fileList[0].data;
      this.showTableData = this.fileList[0].data;

      this.chooseGooodStu(false);

      // this.$refs.multipleTable.clearSelection();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      }
      return "";
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  data: function() {
    return {
      gridData: [],

      allStuNum: 0, //学院总人数
      good_student_bb: 0, //单项积极分子
      showWhich: undefined, //显示哪一个Excel
      showTableData: [], //展示的数据
      tableData: [], //没有展示的数据
      activeNames: [],
      resultList: [], //结果滚动
      multipleSelection: [], //三号学生标兵人数 大于 需要人数
      showSelect: false, //三好学生标兵选择
      count: 10,
      loading: false,

      activeIndex: "1", //菜单
      activeIndex2: "1", //菜单

      fileList: [],
      search: undefined,
      showTable: false,

      filename: "附件1：各年级专业综测汇总表.xlsx" //导出文件名字
    };
  }
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
  padding-left: 20px;
  padding-right: 20px;
  width: 270px;
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

#info-right-text {
  display: flex;
  justify-content: center;
  width: 40px;
  font-size: 13px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
}

#info-right-text-icon {
  display: flex;
  justify-content: flex-start;
  height: 30px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 5px;
}

#info-col-title {
  display: flex;
  justify-content: center;
  background: #409eff;
  width: 100%;
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

