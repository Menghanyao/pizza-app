<template>
	<div class="row mt-3">
		<div class="col-md-12 col-lg-12">
			<div class="card">
				<div class="card-body">
					<img src="../../src/assets/icon.png" alt="糟糕，图片木得了" class="mx-auto d-block">
					<form @submit.prevent="onSubmit">
						<div class="form-group">
							<label for="email">邮箱</label>
							<input type="email" class="form-control" v-model="email">
						</div>
						<div class="form-group">
							<label for="password">密码</label>
							<input type="password" class="form-control" v-model="password">
						</div>
						<button type="submit" class="btn btn-block btn-success">登录</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				email:'',
				password:''
			}
		},
		methods:{
			onSubmit(){
				//console.log(111);
				if (!this.email||!this.password) {
					alert("请把信息补充完整");
				}else{
					axios.get('/users?email='+this.email).then(res=>{
						console.log(res.data)
						const data=res.data
						const users=[]
						
						if (res.data.length==0) {
							alert('账户不存在')
						}else{
							console.log('账户存在，判断对错')
							var flag=false
							for(var i=0;i<res.data.length;i++){
								console.log(res.data[i])
								if (res.data[i].password==this.password) {
									console.log('登录成功')
									alert('登录成功')
									flag=true
									console.log(res.data[i])
									this.$store.dispatch('setUser',res.data[i].email)
									this.$router.push({name:'homeLink'})
								}
							}
							if (!flag) {
								console.log('密码错误')
								this.$store.dispatch('setUser',null)
								alert('密码错误')
							}
						}
					})
				}
			}
		},
		// 组件内守卫
		beforeRouteEnter:(to,from,next)=>{
			next(vm=>vm.$store.dispatch('setUser',null))
		},
	}
</script>