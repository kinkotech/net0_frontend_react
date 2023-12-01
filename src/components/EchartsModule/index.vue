<template>
	<div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import tdTheme from './theme.json' // 引入默认主题
import resizeMixins from "@/mixins/resizeMixins";

export default {
	name: 'echart',
	mixins: [resizeMixins],
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		id: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '2.5rem'
		},
		options: {
			type: Object,
			default: ()=>({})
		}
	},
	data () {
		return {
			chart: null
		}
	},
	watch: {
		options: {
			handler (options) {
				// 设置true清空echart缓存
				this.chart.setOption(options, true)
			},
			deep: true
		}
	},
	mounted () {
		this.$echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
		this.initChart();
	},
	methods: {
		initChart () {
			// 初始化echart
			this.chart = this.$echarts.init(this.$el, 'tdTheme');
			this.$emit('myCharts', this.chart);  // 把实例丢出来
			this.chart.setOption(this.options, true);
			let _this = this;
			_this.chart.on('click', function (params) {
				_this.$emit('getParams', params.name); 
			})
			_this.chart.getZr().on('click', function (params) {
				let name = ''
				let pointInPixel = [params.offsetX, params.offsetY];
				if (_this.chart.containPixel('grid', pointInPixel)) {
					let pointInGrid = _this.chart.convertFromPixel({
						seriesIndex: 0
					}, pointInPixel);
					let xIndex = pointInGrid[0]; //索引
					let handleIndex = Number(xIndex);
					let seriesObj = _this.chart.getOption(); //图表object对象
					let op = _this.chart.getOption();
					//获得图表中点击的列
					name = op.xAxis[0].data[handleIndex];  //获取点击的列名
				}
				_this.$emit('getZrParams', name);
			})
			_this.chart.getZr().on('mouseover', function (params) {
				let name = '';
				let pointInPixel = [params.offsetX, params.offsetY];
				if (_this.chart.containPixel('grid', pointInPixel)) {
					let pointInGrid = _this.chart.convertFromPixel({
						seriesIndex: 0
					}, pointInPixel);
					let xIndex = pointInGrid[0]; //索引
					let handleIndex = Number(xIndex);
					let seriesObj = _this.chart.getOption(); //图表object对象
					let op = _this.chart.getOption();
					//获得图表中点击的列
					name = op.xAxis[0].data && op.xAxis[0].data[handleIndex];  //获取点击的列名
				}
				_this.$emit('getZrParamsOver', name);
			})
		}
	}
}
</script>