<template>
    <div>

        <!--面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图区域-->
        <el-card>
           <!--提示区域-->
            <el-alert
                    title="添加商品信息"
                    type="info"
                    center
                    show-icon
                    :closable="false"
            >
            </el-alert>
            <!--步骤条区域-->
            <el-steps  :active="activeIndex-0" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!--tab栏区域-->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
                <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClicked">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price" >
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <!--级联选择器-->
                        <el-form-item label="商品分类" prop="goods_cat">
                            <!--options是数据源-->
                            <!--props级联选择器得配置项-->
                            <el-cascader
                                    v-model="addForm.goods_cat"
                                    :options="catelist"
                                    :props="cateProps"
                                    @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <!--渲染表单的item项-->
                        <el-form-item  :label="item.attr_name"  v-for="item in manyTableData" :key="item.attr_id">
                            <!--复选框组-->
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border=""></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <!--:label是循环加载项的名称-->
                        <el-form-item :label="item.attr_name" v-for=" item in onlyTableData" :key="item.attr_id">
                            <el-input v-model="item.attr_vals">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <!--action表示图片要上传到的后台的APII地址-->
                        <!--on-preview预览事件-->
                        <!--on-remove单击差号的时候触发删除事件-->
                        <el-upload
                                :action="uploadURL"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                list-type="picture"
                                :headers="headerObj"
                                :on-success="handleSuccess"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <!--富文本编辑器组件-->
                        <quill-editor v-model="addForm.goods_introduce"></quill-editor>
                        <!--添加商品的按钮-->
                        <el-button type="primary" class="btnAdd" @click="add"> 添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <!--图片预览对话框-->
        <el-dialog
                title="图片预览"
                :visible.sync="previewVisible"
                width="50%"
        >
            <img :src="previewPath" alt="" class="previewImg">
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </div>
</template>

<script>
    //到入lodash,官方提倡再导入lodash的时候将他命名为下划线接收
    import _ from'lodash'
    export default {
        name: "Add",
        data(){
            return{
                activeIndex:"0",
                //添加商品的表单数据对象
                addForm:{
                    goods_name:'',
                    goods_price:0,
                    goods_weight:0,
                    goods_number:0,
                    //商品所属得分类数组
                    goods_cat:[],
                    //图片的数组
                    pics:[],
                    //商品的详情描述
                    goods_introduce:'',
                    //数组列表
                    attrs:[]
                },
                //添加商品的表单验证规则
                addFormRules:{
                    goods_name:[
                       {required:true,message:'请输入商品名称',trigger:'blur'}
                    ],
                    goods_price:[
                        {required:true,message:'请输入商品价格',trigger:'blur'}
                    ],
                    goods_weight:[
                        {required:true,message:'请输入商品重量',trigger:'blur'}
                    ],
                    goods_number:[
                        {required:true,message:'请输入商品数量',trigger:'blur'}
                    ],
                    goods_cat:[
                        {required:true,message:'请选择商品分类',trigger:'blur'}
                    ]
                },
                //商品分类列表
                catelist:[],
                cateProps:{
                    expandTrigger: 'hover',
                    label:'cat_name',
                    value:'cat_id',
                    children:'children'
                },
                //动态参数列表函数
                manyTableData:{},
                //静态参数列表函数
                onlyTableData:{},
                //上传的图片地址
                uploadURL:'http://127.0.0.1:8888/api/private/v1/upload',
                //图片上传组件的headers请求头对象
                headerObj:{
                    Authorization:window.sessionStorage.getItem('token')
                },
                //图片预览路径
                previewPath:'',
                //图片预览对话框默认
                previewVisible:false
            }
        },
        created() {
            this.getCateList()
        },
        methods:{
            //获取所有商品分类数据
            async getCateList(){
             const {data:res}= await this.$http.get('categories')
                if(res.meta.status!==200){
                    return this.$message.error('获取商品分类数据失败!')
                }
                this.catelist=res.data
                console.log(this.catelist)
            },
            //级联选择器变化会触发得函数
            handleChange(){
                console.log(this.addForm.goods_cat)
                if(this.addForm.goods_cat.length!==3){
                    this.addForm.goods_cat=[]
                }
            },
            //
            beforeTabLeave(activeName, oldActiveName){
                // console.log('离开'+oldActiveName)
                // console.log('进入'+activeName)
                // return false
                if(oldActiveName==='0'&& this.addForm.goods_cat.length!==3){
                    this.$message.error('请先选择商品分类')
                    return false
                }
            },
            //
           async tabClicked() {
               //点击tab页签,name 名称的变化
               //console.log(this.activeIndex)
               //证明访问的是动态参数面板
               if (this.activeIndex === '1') {
                   const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: 'many'}})

                   if (res.meta.status !== 200) {
                       return this.$message.error('获取数据失败!')
                   }
                   console.log(res.data)
                   //将获取到的字符穿成数组
                   res.data.forEach(item =>{
                     item.attr_vals= item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
                   })
                   this.manyTableData = res.data
               }else if(this.activeIndex === '2'){
                   const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: 'only'}})
                   if(res.meta.status!==200){
                       return this.$message.error('获取静态属性失败!')
                   }
                   //console.log(res.data)
                   this.onlyTableData=res.data

               }
           },
            //处理图片预览效果
            handlePreview(file){
                console.log(file)
                this.previewPath=file.response.data.url
                this.previewVisible = true

            },
            //处理移除图片的操作
            handleRemove(file){
                //console.log(file)
                //1获取将要删除的图片的临时路径
                const filePath=file.response.data.tmp_path
                //2从pics数组中,找到这个图片对应的索引值
               const i= this.addForm.pics.findIndex(x =>x.pic===filePath)
                //3调用数组的splite方法,把图片信息对象从pics数组中移除出去
                this.addForm.pics.splice(i,1)
                //console.log(this.addForm)

            },
            //监听图片上传成功的事件
            handleSuccess(response){
                //console.log(response)
                //1拼接得到一个图片信息对象
                 const picInfo={pic:response.data.tmp_path}
                //2将图片信息对象PuSH到pics数组中
                this.addForm.pics.push(picInfo)
                //console.log(this.addForm)

            },
            //添加按钮事件
            add(){
               // console.log(this.addForm)
                this.$refs.addFormRef.validate(async valid=>{
                    if(!valid){
                        return this.$message.error('请填写必要的表单项')
                    }
                    //执行添加的业务逻辑
                    // goods_cat从数组变成字符串
                    //直接会报错,使用深拷贝复制addForm,使用lodash 的cloneDeep(obi)
                    const form = _.cloneDeep(this.addForm)
                    form.goods_cat= form.goods_cat.join(',')
                    //处理动态参数,用foreach,每循环一次拿到一个动态参数的item项
                    this.manyTableData.forEach(item =>{
                        const newInfo={
                            attr_id:item.attr_id,
                            attr_value:item.attr_vals.join(' ')
                        }
                        this.addForm.attrs.push(newInfo)
                    })
                    //处理静态属性
                    this.onlyTableData.forEach(item=>{
                        const newInfo={
                            attr_id:item.attr_id,
                            attr_value:item.attr_vals
                        }
                        this.addForm.attrs.push(newInfo)
                    })
                    form.attrs=this.addForm.attrs
                    //最终向服务器提交的是form
                    console.log(form)
                    //发起请求添加商品,商品的名称必须是唯一的
                    const {data:res}=await this.$http.post('goods',form)
                    console.log(res.meta)
                    if(res.meta.status !== 201){
                        return this.$message.error('添加商品失败!')
                    }
                    this.$message.success('添加商品成功!')
                    //编程式导航跳转到goods页面
                    this.$router.push('/goods')

                })
            }
        },
        computed:{
            //三级的id,用在网络后端请求
            cateId(){
                if(this.addForm.goods_cat.length === 3){
                    return this.addForm.goods_cat[2]
                }
                return null
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-checkbox{
        /*margin上右下左*/
        margin: 0 5px 0 0 !important;
    }
    .previewImg{
        width: 100%;
    }
    .btnAdd{
        margin-top: 15px;
    }


</style>