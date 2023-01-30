<!-- eslint-disable prettier/prettier -->
<template>
    <div>{{ text }}
        <p>{{ id }}</p>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps(['id', 'text'])
</script>
