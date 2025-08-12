import type { ObjectDirective } from '@vue/runtime-core';
import type { Record } from 'immutable';
import { useAuthStore } from '@/store/modules/auth';

type PermissionArg = 'role' | 'button';

let authArgCondition: any;

export const permission: ObjectDirective<any, string, any, PermissionArg> = {
  mounted(el, binding) {
    const authStore = useAuthStore();

    if (authStore.userInfo.superAdmin) {
      return;
    }

    if (!authArgCondition) {
      authArgCondition = {
        role: (value: string) => authStore.userInfo.roles.includes(value),
        button: (value: string) => authStore.userInfo.buttons.includes(value)
      };
    }

    const { value, arg } = binding;

    if (arg) {
      const condition = authArgCondition[arg];
      if (!condition(value)) {
        el.remove();
      }
    }
  }
};
