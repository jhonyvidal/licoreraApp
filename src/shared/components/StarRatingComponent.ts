// star-rating.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating">
      <ion-icon
        *ngFor="let star of stars; let i = index"
        name="{{star === 'star' ? 'star' : 'star-outline'}}"
        (click)="rate(i + 1)"
      ></ion-icon>
    </div>
  `,
  styles: [
    `
      ion-icon {
        font-size: 24px;
        color: gray;
        cursor: pointer;
      }
    `,
  ],
})
export class StarRatingComponent {
  @Input() maxStars: number = 5;
  @Input() initialRating: number = 0;
  @Output() ratingChanged = new EventEmitter<number>();
  stars: string[] = Array(this.maxStars).fill('star-outline');

  ngOnInit() {
    this.updateStars();
  }

  rate(rating: number) {
    this.initialRating = rating;
    this.updateStars();
    this.ratingChanged.emit(rating);
  }

  updateStars() {
    this.stars = Array(this.maxStars).fill('star-outline');

    for (let i = 0; i < this.initialRating; i++) {
      this.stars[i] = 'star';
    }
  }
}
