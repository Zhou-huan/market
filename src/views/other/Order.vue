<template>
  <div class="order">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>订单管理</h3>
      </div>
      <!-- 表单部分 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="订单号" class="product-name">
                <el-input v-model="form.ordernum" placeholder="订单"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="收货人" class="product-name">
                <el-input v-model="form.consignee" placeholder="收货人"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="手机号" class="product-name">
                <el-input v-model="form.phone" placeholder="手机号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="订单状态" class="product-name">
                <el-select v-model="form.status" placeholder="订单状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="选择时间" class="product-name">
                <el-time-picker
                  is-range
                  v-model="form.date"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                ></el-time-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6" :offset="4">
            <div class="grid-content bg-purple">
              <el-button type="primary">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格部分 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="ordernum" label="订单号" width="150"></el-table-column>
        <el-table-column prop="ordertime" label="下单时间" width="120"></el-table-column>
        <el-table-column prop="pnone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="addressee" label="收件人" width="120"></el-table-column>
        <el-table-column prop="deliveryaddress" label="配送地址" width="300"></el-table-column>
        <el-table-column prop="sendtime" label="发送时间" width="120"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="money" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ordernum: "",
        status: "",
        phone: "",
        consignee: "",
        date: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
      },
       tableData: [
         {
           ordernum:'12313',
           ordertime:'2019-11-01',
           pnone:'17828912345',
           addressee:'齐天大圣',
           deliveryaddress:'花果山水帘洞',
           sendtime:'2019-11-02,12:00',
           remarks:'快件额！',
           money:'40020',
           status:'已发货'
        },
         {
          ordernum:'12313',
           ordertime:'2019-11-01',
           pnone:'17828912345',
           addressee:'齐天大圣',
           deliveryaddress:'花果山水帘洞',
           sendtime:'2019-11-02,12:00',
           remarks:'快件额！',
           money:'40020',
           status:'已发货'
        }, {
          ordernum:'12313',
           ordertime:'2019-11-01',
           pnone:'17828912345',
           addressee:'齐天大圣',
           deliveryaddress:'花果山蓬莱仙岛',
           sendtime:'2019-11-02,12:00',
           remarks:'快件额！',
           money:'40020',
           status:'已发货'
        }, {
           ordernum:'12313',
           ordertime:'2019-11-01',
           pnone:'17828912345',
           addressee:'齐天大圣',
           deliveryaddress:'花果山猴子山',
           sendtime:'2019-11-02,12:00',
           remarks:'快件额！',
           money:'40020',
           status:'已发货'
        }, {
          ordernum:'12313',
           ordertime:'2019-11-01',
           pnone:'17828912345',
           addressee:'齐天大圣',
           deliveryaddress:'牛魔山伏魔洞',
           sendtime:'2019-11-02,12:00',
           remarks:'快件额！',
           money:'40020',
           status:'已发货'
        }],
      }
    },
    methods:{
    handleClick(row) {
        console.log(row);
      }
    }
  }
</script>

<style lang="less" scoped>
</style>