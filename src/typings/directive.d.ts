import type { Directive } from 'vue';
import type { ObjectDirective } from '@vue/runtime-core';

declare module 'vue' {
  export interface GlobalDirectives {
    permission: ObjectDirective<HTMLElement, string, any, 'role' | 'button'>;
  }
}
