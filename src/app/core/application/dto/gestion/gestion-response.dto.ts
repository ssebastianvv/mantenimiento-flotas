export interface IGetProjectsResponse {
    statusCode: number;
    message:    string;
    data:       Datum[];
    metadata:   Metadata;
}


export interface Datum {
    id:          number;
    make:        string;
    model:       string;
    year:        Date;
    licensePlate:string;
    file:        string;
    organizer: Organizer;
}

export interface Organizer {
    id:       number;
    email:    string;
    password: string;
    name:     string;
}

export interface Metadata {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}
export interface IGetProjectsResponseID {
    statusCode: number;
    message:    string;
    data:       Datum;
    metadata:   Metadata;
}