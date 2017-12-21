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
                      <a href="#"><img v-lazy="'/static/'+item.productImg " alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.productPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
               <!--    <li>
                    <div class="pic">
                      <a href="#"><img src="static/2.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">1000</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="static/3.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">500</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="static/4.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">2499</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li> -->
                </ul>
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
                      endPrice:'2000.00'
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
            getGoodsList(){
              var param={
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1
              };
              axios.get('/goods',{
                params:param
              }).then((response)=>{
                let res=response.data;
                if(res.status=='0'){
                  this.goodsList=res.result.list;
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
            showFilterPop(){
                this.filterBy=true;
                 this.overLayFlag=true;
            },
            setPriceFilter(index){
                this.priceChecked=index;
                this.closePop();
            },
            closePop(){
                 this.filterBy=false;
                 this.overLayFlag=false;
            }
          }
      }
</script>
