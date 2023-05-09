
export type Branch = {
    id: UniqueID;
    created_at: DateTime;
    updated_at: DateTime;
    name: string;
    location: string;
    vendor: string;
    active: boolean;
};