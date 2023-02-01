<!-- eslint-disable prettier/prettier -->
<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="svgIconName"></use>
    </svg>
</template>
<!-- eslint-disable prettier/prettier -->
  
<script lang="ts">
export default {
    name: "SvgIcon",
    components: {

    },
    props: ['iconName'],
    setup(props: any) {
        const svgIconName: string = '#icon-' + props.iconName
        return {
            svgIconName
        }
    }
};
</script>
<!-- eslint-disable prettier/prettier -->
  
<style lang="less" scoped>
.icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
