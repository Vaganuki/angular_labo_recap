import {RegisterData} from "./register.interface";

export interface EventData {
  id: number;
  name: string;
  image: string;
  description: string;
  userId: number;
  beginDate: string;
  endDate?: string | null;
  address: string;
  isCancelled: boolean;

  // Ajouté pour la propriété `_expand=user` dans la route
  participants?: RegisterData[];
  users?: RegisterData[];
}
