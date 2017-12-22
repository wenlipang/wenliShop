<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:;" class="price" @click="sortGoods" >Price <svg class="icon icon-arrow-short"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
                <dd v-for="(price,index) in priceFilter" >
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImage " alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.productPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
              
                </ul>

                <!-- 滚动加载 -->
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="load-more">
                    <img src="../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay " v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>

    import '../assets/css/base.css'
    import '../assets/css/product.css'
    import  NavHeader  from '@/components/Navheader.vue'
    import  NavFooter from  '../components/Navfooter.vue'
    import  NavBread from  '../components/NavBread.vue'
    import axios from 'axios'
      export default{
          data(){
              return {
                  goodsList:[],
                  sortFlag:1,//默认升序
                  page:1,
                  pageSize:8,
                   busy:true,//禁用 滚动
                   loading:false,//加载 默认不显示
                  priceFilter:[ 
                    {
                      startPrice:'0.00',
                      endPrice:' 100.00'
                    },
                    {
                      startPrice:'100.00',
                      endPrice:'500.00'
                    },
                    {
                      startPrice:'500.00',
                      endPrice:'1000.00'
                    } ,
                    {
                      startPrice:'1000.00',
                      endPrice:'5000.00'
                    }

                  ],
                  priceChecked:'all',
                  filterBy:false,
                  overLayFlag:false
              }
          },
          // mounted(){
          //   axios.get('/goods').then((response)=>{
          //     let res=response.data;
          //     if(res.status=='0'){
          //       this.goodsList=res.result;

          //     }else {
          //       this.goodsList=[];    
          //     }
          //   })
          // },
          components:{
            NavHeader:NavHeader,
            NavFooter,
            NavBread
          },
          mounted:function(){
            // 初始化时会加载商品列表
              this.getGoodsList();
         
          },
          methods:{
            getGoodsList(flag){
              var param={
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1,
                priceLevel:this.priceChecked
              };
              this.loading=true;//接口请求之前显示
              // 接口请求
              axios.get('/goods',{
                params:param
              }).then((response)=>{
               let res=response.data;
               this.loading=false;//接口请求之后关闭
               if(res.status=='0'){
                 if(flag){//若flag为true ：分页需要累加
                      this.goodsList=this.goodsList.concat(res.result.list);//累加
                       if(res.result.count==0){
                           this.busy=true;
                       }else{
                         this.busy=false;
                       }
                 }else{
                   this.goodsList=res.result.list;
                   this.busy=false;
                 }
               }else{
                 this.goodsList=[];
               }
              })
             

            },
            // 排序
            sortGoods(){
              this.sortFlag=!this.sortFlag;
              this.page=1;
              this.getGoodsList();

            },
               // 滚动加载要调用的方法
            loadMore(){
                this.busy=true;//滚到第二页之后禁止再去滚动加载
              setTimeout(()=>{
                this.page++;//滚动时加到第二页
                this.getGoodsList(true);//分页需要进行累加

              },5000);
            },

            // 加入购物车
            addCart(productId){
                axios.post("/goods/addCart",{
                  productId:productId
                }).then((res)=>{
                  if(res.status==0){
                    alert("加入购物车成功");
                  }else{
                    alert("msg:"+res.msg);
                  }
                })
            },
            showFilterPop(){
                this.filterBy=true;
                 this.overLayFlag=true;
            },
            setPriceFilter(index){
                this.priceChecked=index;
                console.log("价格",this.priceChecked)
                this.page=1;
                this.closePop();
                this.getGoodsList();

            },
            closePop(){
                 this.filterBy=false;
                 this.overLayFlag=false;
            }
          }
      }

</script>
