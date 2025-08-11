import type { ObjectDirective } from '@vue/runtime-core';
import { useAuthStore } from '@/store/modules/auth';

type PermissionArg = 'role' | 'button';

export const permission: ObjectDirective<any, string, any, PermissionArg> = {
  mounted(el, binding) {
    const authStore = useAuthStore();

    if (authStore.userInfo.superAdmin) {
      return;
    }

    const authArgCondition: Record<PermissionArg, (value: string) => boolean> = {
      role: value => authStore.userInfo.roles.includes(value),
      button: value => authStore.userInfo.buttons.includes(value)
    };

    const { value, arg } = binding;

    if (arg) {
      const condition = authArgCondition[arg];
      if (!condition(value)) {
        el.remove();
      }
    }
  }
};
