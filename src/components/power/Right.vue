<template>
    <div>
        <!--面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图-->
        <el-card>
            <el-table :data="rightsList" border stripe>
                <!--各列-->
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName" ></el-table-column>
                <el-table-column label="路径" prop="path" ></el-table-column>
                <el-table-column label="权限等级" prop="level" >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level==='0'">一级权限</el-tag>
                        <el-tag v-else-if="scope.row.level==='1'" type="success">二级权限</el-tag>
                        <el-tag v-else-if="scope.row.level==='2'" type="warning">三级权限</el-tag>

                    </template>
                </el-table-column>

            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Right",
        data(){
            return{
                //所有的权限列表
                rightsList:[]
            }
        },
        created(){
            //调用获取所有权限
            this.getRightsList()
        },
        methods:{
            //获取权限列表
            async getRightsList(){
                const {data:res}=await this.$http.get('rights/list')
                if(res.meta.status!==200)return this.$message.erro('获取权限失败')
                this.rightsList=res.data
                console.log(this.rightsList)

            }
        }

    }
</script>

<style scoped>

</style>