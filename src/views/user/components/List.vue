<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isLoading" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
      :data="users"
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column
        prop="id"
        align="center"
        label="用户ID">
      </el-table-column>
      <el-table-column
        align="center"
        label="头像">
        <template slot-scope="scope">
        <el-avatar :src="scope.row.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        :width="230"
        align="center"
        label="注册时间">
        <template slot-scope="scope">{{scope.row.createTime | format}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
        <el-tag :type="scope.row.status === 'ENABLE' ? 'success': 'danger'">
          {{scope.row.status}}
        </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :width="200"
        align="center"
        label="操作">
        <template slot-scope="scope">
        <el-button type="danger" @click="handleForbid(scope.row.id)" size="small">禁用</el-button>
        <el-button type="primary" size="small" @click="handleRole(scope.row.id)">分配角色</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="roleForm" :model="roleForm" label-width="80px">
      <el-form-item>
        <el-select v-model="roleForm.roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getUserPages } from '@/services/user'
import { allocateUserRoles, getAllRole, getUserRole } from '@/services/role'

Vue.filter('format', value => {
  const t = new Date(value)
  return `${t.getFullYear()}-${JSON.stringify(t.getMonth() + 1).padStart(2, '0')}-${JSON.stringify(t.getDate()).padStart(2, '0')} ${JSON.stringify(t.getHours()).padStart(2, '0')}:${JSON.stringify(t.getMinutes()).padStart(2, '0')}:${JSON.stringify(t.getSeconds()).padStart(2, '0')}`
})
export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      users: [],
      form: {
        name: '',
        pageSize: 10, // 每页数量
        currentPage: 1 // 当前页
      },
      roleForm: {
        roleIdList: []
      },
      roleArr: [],
      dialogVisible: false,
      total: 0,
      isLoading: false
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      this.isLoading = true
      const { data } = await getUserPages(this.form)
      this.users = data.data.records
      this.total = data.data.total
      this.isLoading = false
    },
    onSubmit () {
      this.form.currentPage = 1
      this.loadUsers()
    },
    onReset () {
      this.form.currentPage = 1
      this.$refs.form.resetFields()
      this.loadUsers()
    },
    handleSizeChange (val) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadUsers()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadUsers()
      console.log(`当前页: ${val}`)
    },
    handleForbid (id) {
      console.log('禁止', id)
    },
    handleRole (id) {
      this.dialogVisible = true
      console.log('分配角色', id)
    },
    submitRole () {
      this.dialogVisible = false
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
