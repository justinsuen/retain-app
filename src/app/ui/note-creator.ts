import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'note-creator',
  styles: [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
  `],
  template: `
    <div
      class="note-creator shadow-2"
      [ngStyle]="{'background-color': newNote.color}"
      >
      <form class="row" (submit)="onCreateNote()">
        <input
          type="text"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          [(ngModel)]="newNote.title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
          [(ngModel)]="newNote.value"
          (focus)="toggle(true)"
        >
        <div
          class="actions col-xs-12 row between-xs"
          *ngIf="fullForm"
          >
          <div class="col-xs-3">
            <color-picker
              [colors]="colors"
              (selected)="onColorSelect($event)"
              >
            </color-picker>
          </div>
          <button
            type="submit"
            class="btn-light"
           >
            Done
          </button>
        </div>
      </form>
    </div>
  `
})

export class NoteCreator {
  @Output() createNote = new EventEmitter();

  colors: string[] = ['#B19CD9', '#9CBAD9', '#D99C9C', '#9CD9C3', '#D8D99C', '#88E096', '#FFFFFF'];

  newNote = {
    title: '',
    value: '',
    color: '#FFFFFF'
  }

  fullForm: boolean = false;

  onCreateNote() {
    const { title, value, color } = this.newNote;

    if (title && value) {
      this.createNote.next({title, value, color});
    }

    this.reset();
    this.toggle(false);
  }

  reset() {
    this.newNote = {
      title: '',
      value: '',
      color: '#FFFFFF'
    }
  }

  toggle(value: boolean) {
    this.fullForm = value;
  }

  onColorSelect(color: string) {
    this.newNote.color = color;
  }
}
