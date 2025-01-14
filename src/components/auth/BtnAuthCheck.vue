<template>
  <el-button
    v-if="isVisible"
    :type="props.type"
    :size="props.size"
    :disabled="props.disabled"
    :icon="props.icon"
    @click="handleClick"
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useUserStore from '../../store/modules/login.ts'; // 确保路径正确

const userStore = useUserStore();
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  click: {
    type: Function,
  },
  permission: {
    type: Array,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: true,
  },
});

const handleClick = (event: Event) => {
  if (props.click) {
    props.click(event);
  }
};
const hasPermission = computed(() => {
  const userPermissions = userStore.buttons;
  if (Array.isArray(props.permission) && props.permission.length === 0) {
    return false; // 如果权限列表为空数组，直接返回 false
  }
  if (typeof props.permission === 'string') {
    return userPermissions.includes(props.permission);
  } else if (Array.isArray(props.permission)) {
    return props.permission.every((permission) =>
      userPermissions.includes(permission as string),
    );
  }
  return false;
});
const isVisible = computed(() => {
  return props.visible && hasPermission.value;
});
</script>
