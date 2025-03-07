export interface Notification {
    id: number;
    idUser: number;
    isRead: boolean;
    isActive: boolean;
    title: string;
    concept: string;
    idPayment?: number;
    idActivity?: number;
  }