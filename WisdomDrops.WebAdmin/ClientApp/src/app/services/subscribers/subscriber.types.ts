export interface SubscriberModel {
  id: string | null;
  firstName: string;
  phone: string;
  timeWindowStart: Date;
  timeWindowEnd: Date;
}

export interface GetSubscribersResult {
  subscribers: SubscriberModel[];
  count: number;
}

export enum SortDir {
  Asc = 1,
  Desc
}
