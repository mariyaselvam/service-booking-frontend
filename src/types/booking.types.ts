import { type Service } from "./service.types";

export interface Booking {
  _id: string;
  serviceId: Service;
  date: string;
  status: "pending" | "accepted" | "rejected";
}
