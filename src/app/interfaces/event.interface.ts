export interface EventData {
  name: string;
  image: string;
  description: string;
  userId: number;
  beginDate: string;
  endDate?: string | null;
  address: string;
  isCancelled: boolean;
}
