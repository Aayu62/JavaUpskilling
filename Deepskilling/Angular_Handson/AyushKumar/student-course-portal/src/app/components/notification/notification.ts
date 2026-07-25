import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NgFor } from '@angular/common';

// Step 67 Comment: Providing NotificationService at the component level via providers: [NotificationService] overrides the root injector and creates a brand-new, isolated service instance scoped exclusively to this component instance and its child components.
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor],
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  messageInput = '';

  constructor(public notificationService: NotificationService) {}

  addNotification(text: string): void {
    if (text.trim()) {
      this.notificationService.addMessage(text);
    }
  }
}
