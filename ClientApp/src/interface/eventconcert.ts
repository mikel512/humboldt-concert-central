import { Venue } from "./venue";

export interface EventConcert {
    eventConcertId: number;
    eventName: string;
    flyer: string;
    eventDate: string;
    isApproved: boolean;
    venue: Venue;
    tickets: string;
    eventTime: string;
    details: string;
    price: string;
    dateFormatted:string;
    status: string;
}
