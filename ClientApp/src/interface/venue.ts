import { City } from "./city";

export interface Venue {
    venueId: number;
    venueName: string;
    location: string;
    address: string;
    description: string;
    picture: string;
    logo: string;
    ticketsLink: string;
    menuLink: string;
    hours: string;
    city: City;

}
