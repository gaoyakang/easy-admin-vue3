<template>
  <div>
    <template v-for="(item, index) in options" :key="item.value">
      <template v-if="values.includes(item.value)">
        <span
          v-if="item.elTagType == 'default' || item.elTagType == ''"
          :index="index"
          :class="item.elTagClass"
        >
          {{ item.label + ' ' }}
        </span>
        <el-tag
          v-else
          :disable-transitions="true"
          :key="item.value + ''"
          :index="index"
          :type="getTagType(item.value)"
          :class="item.elTagClass"
        >
          {{ item.label + ' ' }}
        </el-tag>
      </template>
    </template>
    <template v-if="unmatch && showValue">
      {{ handleArray(unmatchArray) }}
    </template>
  </div>
</template>

<script setup name="DictTag">
import { ref, watch, computed } from 'vue';

const unmatchArray = ref([]);

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  value: [Number, String, Array],
  showValue: {
    type: Boolean,
    default: true,
  },
});

const values = computed(() => {
  if (props.value !== null && typeof props.value !== 'undefined') {
    return Array.isArray(props.value) ? props.value : [String(props.value)];
  } else {
    return [];
  }
});

const unmatch = ref(false);

watch(
  () => props.value,
  () => {
    unmatchArray.value = [];
    if (props.value !== null && typeof props.value !== 'undefined') {
      const valuesArray = Array.isArray(props.value)
        ? props.value
        : [props.value];
      valuesArray.forEach((item) => {
        if (!props.options.some((v) => v.value == item)) {
          unmatchArray.value.push(item);
        }
      });
      unmatch.value = unmatchArray.value.length > 0;
    } else {
      unmatch.value = false;
    }
  },
  { immediate: true },
);

const handleArray = (array) => {
  if (array.length === 0) return '';
  return array.reduce((pre, cur) => {
    return pre + ' ' + cur;
  });
};

const getTagType = (value) => {
  // 根据 value 返回不同的 type
  if (value === '1') {
    return 'danger'; // 失败状态
  } else {
    return 'primary'; // 其他状态
  }
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
