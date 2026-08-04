import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  imports: [],
  templateUrl: './DeleteUser.component.html',
  styleUrl: './DeleteUser.component.css',
})
export class DeleteUserComponent {

  modalOpen = input(false);
  close = output<void>();

  closeModal() {
    this.close.emit()
  }
}
