import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly visible = signal(false);
  readonly message = signal('');
  readonly type = signal<'alert-success' | 'alert-error'>('alert-success');

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: 'alert-success' | 'alert-error' = 'alert-success') {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);

    this.timeoutId = setTimeout(() => {
      this.visible.set(false);
      this.timeoutId = null;
    }, 2000);
  }
}