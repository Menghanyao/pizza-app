<template>
	<div class="row mt-3">
		<div class="col-md-12 col-lg-12">
			<div class="card">
				<div class="card-body">
					<img src="../../src/assets/icon.png" alt="糟糕，图片木得了" class="mx-auto d-block">
					<form @submit.prevent="onSubmit">
						<div class="form-group">
							<label for="email">邮箱</label>
							<input type="email" class="form-control" v-model="email" placeholder="xx@xx.xx">
						</div>
						<div class="form-group">
							<label for="password">密码</label>
							<input type="password" class="form-control" v-model="password">
						</div>
						<div class="form-group">
							<label for="confirm-password">确认密码</label>
							<input type="password" class="form-control" v-model="confirmPassword">
						</div>
						<button type="submit" class="btn btn-block btn-success">注册</button>
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
				password:'',
				confirmPassword:''
			}
		},
		methods:{
			onSubmit(){
				if(!this.password||!this.email||!this.confirmPassword)
				{
					alert('请把信息补充完整');
				}
				else if (this.password==this.confirmPassword) {
					const formData={
						email:this.email,
						password:this.password,
						confirmPassword:this.confirmPassword
					}
					axios.post('/users',formData)
					.then(res=>this.$router.push({name:'loginLink'}))
				}else{
					alert('两次密码不一致');
				}
				
			}
		}
	}
</script>