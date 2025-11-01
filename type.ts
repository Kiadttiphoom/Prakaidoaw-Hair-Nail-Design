export type NotificationType = 'success' | 'warning' | 'error';

export interface Notification {
  type: NotificationType;
  message: string;
}