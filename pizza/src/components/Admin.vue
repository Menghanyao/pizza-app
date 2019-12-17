<template>
	<div class="row">
		<div class="col-sm-12 col-md-8">
			<!-- new pizza -->
			<new-pizza></new-pizza>
		</div>
		<div class="col-sm-12 col-md-4">
			<!-- 品种展示 -->
			<h3 class="text-muted my-5">菜单</h3>
			<table class="table">
				<thead class="table table-default">
					<tr>
						<th>品种</th>
						<th>删除</th>
					</tr>
				</thead>
				<tbody v-for="item in getMenuItems">
					<tr>
						<td>{{item.name}}</td>
						<td>
							<button @click="removeItem(item)" class="btn btn-outline-danger btn-sm">×</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import NewPizza from './NewPizza'
	import axios from 'axios'
	export default{
		components:{'new-pizza':NewPizza},
		data(){
			return{
				name:'henry',
				//getMenuItems:[]
			}
		},
		computed:{
			getMenuItems:{
				//在vuex中获取数据
				get(){
					//return this.$store.state.menuItems
					return this.$store.getters.getMenuItems
				},
				set(){

				}
			}
		},
		methods:{
			removeItem(item){
				console.log(item.id)
				axios.delete('/menus/'+item.id)
				.then(res=>{
					
					//this.getMenuItems.splice(this.getMenuItems.indexOf(item),1)
					this.$store.commit('removeMenuItems',item)
				})
			}
		},
		created(){
			axios.get('/menus')
			.then(res=>{
				this.$store.commit('setMenuItems',res.data)
				//this.getMenuItems=res.data
				//console.log(this.getMenuItems)

			})
		},
		beforeRouteEnter:((to,from,next)=>{
			// alert('hello '+this.name);
			// next();

			next(vm=>{
				alert('hello '+ vm.name);
			})

		}),

		beforeRouteLeave(to,from,next){
			if (confirm('确定离开吗？')==true) {
				next();
			}else{
				next(false);
			}
		}
	}
</script>