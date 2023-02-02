<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo', pageNo-1)">上一页</button>
    <button v-if="startNumEndNum.start>1" @click="$emit('getPageNo', 1)">1</button>
    <button v-if="startNumEndNum.start>2">···</button>

    <button v-for="(page, index) in startNumEndNum.end" :key="index" v-if="page>=startNumEndNum.start" @click="$emit('getPageNo', page)" :class="{active:pageNo==page}">{{page}}</button>

    <button v-if="startNumEndNum.end<totalPage-1">···</button>
    <button v-if="startNumEndNum.end<totalPage" @click="$emit('getPageNo', totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo', pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo', 'pageSize', 'total', 'continues'],
  computed:{
    totalPage() {
        return Math.ceil(this.total/this.pageSize)
    },
    // 计算出连续的页码的起始数字与结束数字[连续页码的数字：至少是5]
    startNumEndNum() {
        // 先定义两个变量存储起始数字与结束数字
        let start = 0, end = 0
        // 连续页码数字5【至少5页】，如果出现不正常现象
        // 不正常现象[总页数没有连续页码多]
        if (this.continues > this.totalPage) {
            start = 1
            end = this.totalPage
        } else { 
            // 正常现象【连续页码为5，但是你的总页数一定大于5】
            start = this.pageNo - Math.floor(this.continues/2)
            end = this.pageNo + Math.floor(this.continues/2)
            if (start < 1) {
                start = 1
                end = this.continues
            }
            if (end > this.totalPage) {
                start = this.totalPage - this.continues + 1
                end = this.totalPage
            }
        }
        return {start, end}
    }
  },
  methods:{
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>
