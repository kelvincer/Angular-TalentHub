import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
    @if (visible()) {
      <div class="toast z-1">
        <div role="alert" class="alert {{ type() }}">
          <span class="text-white">{{ message() }}</span>
        </div>
      </div>
    }
  `,
})
export class ToastComponent {
  visible = input<boolean>(false);
  message = input<string>('');
  type = input<'alert-success' | 'alert-error'>('alert-success');
}