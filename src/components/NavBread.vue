<template>
	
	<div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <!--插槽 方便更换各种页面：购物车页面、订单页面等 -->
            <slot name="bread"></slot>
          </nav>
        </div>
     </div>
</template>