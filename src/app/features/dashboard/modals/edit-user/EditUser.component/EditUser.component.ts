import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  imports: [],
  templateUrl: './EditUser.component.html',
  styleUrl: './EditUser.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserComponent {

  modalOpen = input(false);
  close = output<void>();

  closeModal() {
    this.close.emit()
  }
}
