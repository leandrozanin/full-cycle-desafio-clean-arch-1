import Notification from '../../@shared/notification/notification' 
export default interface ProductInterface {
  notification: Notification;
  
  get id(): string;
  get name(): string;
  get price(): number;

  changePrice(price: number): void
  changeName(name: string): void;
}
