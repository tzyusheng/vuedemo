<!-- eslint-disable prettier/prettier -->
<template>
    <div class="articleNumber"></div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TitleComponentOption,
    ToolboxComponent,
    ToolboxComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    LegendComponent,
    LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, ref } from 'vue';
import { selectBlogarticleAll } from '@/api/api';

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);
type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | PieSeriesOption
>;

let option: EChartsOption;

let myChart;

interface EchartsData {
    value: number;
    name: string;
}
const countPriority = (data: Array<any>) => {
    const countPriorityArr = ref<EchartsData[]>([])
    const numberCount: any = {}
    data.forEach((item: any) => {
        numberCount[item.blogArticleType.articleTypeName] = numberCount[item.blogArticleType.articleTypeName] ? numberCount[item.blogArticleType.articleTypeName] + 1 : 1
    })
    Object.keys(numberCount).forEach((item: any, index: number) => {
        countPriorityArr.value[index] = { value: numberCount[item], name: item }
    })
    // 排序
    countPriorityArr.value.sort(function (a, b) { return b.value - a.value });
    return countPriorityArr.value
}

onMounted(async () => {
    const chartDom = document.querySelector('.articleNumber');
    const res: any = await selectBlogarticleAll()
    myChart = echarts.init(chartDom as HTMLElement);
    option = {
        title: {
            text: '文章总数统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            top: 'bottom'
        },
        series: [
            {
                name: '文章类型数据统计',
                type: 'pie',
                radius: [50, 120],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: countPriority(res)
            }
        ]
    };
    option && myChart.setOption(option);
})






</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less">
.articleNumber {
    width: 500px;
    height: 400px;
}
</style>

