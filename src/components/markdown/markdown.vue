<template>
  <div style="width: 100%; height:800px;margin-top: 20px;">

          <mavon-editor v-model="context"

                        :toolbars="toolbars"
                        style="height: 800px;z-index:9;"
                        @imgAdd="handleEditorImgAdd"
                        @imgDel="handleEditorImgDel"
          />

      </div>

</template>

<script>
  	// import Vue from 'vue'
// import mavonEditor from 'mavon-editor'
import { formatDateFull } from '@/assets/utils/dateUtils'


export default {
        data(){
            return {
                oldName:"旧图片",
                imgDatas:[],
                formLayout: 'horizontal',
                // form: this.$form.createForm(this, { name: 'coordinated' }),
                form:'',
                /*发布文章*/
                loading: false,
                visible: false,
                color: ['pink','red','orange','green','cyan'],
                //文章标签
                inputVisible: false,
                inputValues: '',
                tags: [],
                //分类专栏
                sortVisible: false,
                sortValues: '',
                sortTags: [],
                /*浏览器窗口大小*/
                clientWidth: '',
                number: 0,
                numberSum: 100,
                maxLength: 100,
                /*markdown*/
                inputValue: '',
                contexts: '',
                context: '',//输入的数据,
                toolbars: {
                            bold: true, // 粗体
                            italic: true, // 斜体
                            header: true, // 标题
                            underline: true, // 下划线
                            strikethrough: true, // 中划线
                            mark: true, // 标记
                            superscript: true, // 上角标
                            subscript: true, // 下角标
                            quote: true, // 引用
                            ol: true, // 有序列表
                            ul: true, // 无序列表
                            link: true, // 链接
                            imagelink: true, // 图片链接
                            code: true, // code
                            table: true, // 表格
                            fullscreen: false, // 全屏编辑
                            readmodel: false, // 沉浸式阅读
                            htmlcode: true, // 展示html源码
                            help: true, // 帮助
                            /* 1.3.5 */
                            undo: true, // 上一步
                            redo: true, // 下一步
                            trash: true, // 清空
                            save: true, // 保存（触发events中的save事件）
                            /* 1.4.2 */
                            navigation: true, // 导航目录
                            /* 2.1.8 */
                            alignleft: true, // 左对齐
                            aligncenter: true, // 居中
                            alignright: true, // 右对齐
                            /* 2.2.1 */
                            subfield: true, // 单双栏模式
                            preview: true, // 预览
                        }

            };

        },
        methods: {
            handleEditorImgAdd (pos, $file) {
              let base = $file.miniurl;
              let name = $file._name;
              let oname = name;
              if (name.includes('-')) {
                  name = name.replace(/-/g, '')
                }

              // name = formatDateFull()+"_"+name;
              // this.changeImgUrl(name,oname);
              let map = {};
              map.base = base;
              map.name = name;
              this.imgDatas[pos-1] = map;
            }
            ,
            handleEditorImgDel (pos) {
              console.log(pos)
              this.imgDatas.splice(pos[0]-1,1);
            }
            ,
            showInput() {
                this.inputVisible = true;
                this.$nextTick(function() {
                    this.$refs.input.focus();
                });
            },

            change(val, render) {
              console.log("-------------"+render);
                this.contexts = render;
            },
            /**
             * 发布文章弹出窗口 end
             */
            /**
             * 浏览器窗口大小调整start
             */
            inputChange() {
                this.number = this.inputValue.length;
                this.numberSum = 100 - this.inputValue.length;
            },
            clientWidths() {
                if (this.clientWidth <= 801 && this.clientWidth > 582) {
                    $(".header input").css("width", "30%");
                } else if (this.clientWidth <= 582) {
                    $(".header input").css("width", "16%");
                } else {
                    $(".header input").css("width", "50%");
                }
            }
            /**
             * 浏览器窗口大小调整 end
             */
        },
        watch:{
            context() {
              let _this = this;
              let imgs = _this.imgDatas;
              let ctx = {};
              ctx.imgs = _this.imgDatas;
              ctx.context = _this.context
              _this.$emit('eventMarkdown', ctx)
            }
        },
        mounted() {
            this.clientWidth = document.body.clientWidth;
            this.clientWidths();
            window.onresize = () => {
                return (() => {
                    this.clientWidth = document.body.clientWidth;
                    console.log(document.body.clientWidth);
                    this.clientWidths();
                })();
            };
          }
        }
</script>

<style >

   /* @import '../../../static/css/markdown/markdown.css'; */
   @import '../../../static/css/style.css';
   @import "mavon-editor/dist/css/index.css";
   @import '../../../static/css/markdown/markdown.css';


</style>
