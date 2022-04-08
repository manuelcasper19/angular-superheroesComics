export interface UserResponse {
    ok:       boolean;
    name?:     string;
    lastname?: string;
    email?:    string;
    token?:    string;
    msg?:   string,
    uid?: string,
    img?: string
    public_id?: string
}


export interface User {
    uid?: string
    name?: string,
    lastname?: string,
    email?: string;
    img?: string,
    public_id?: string
    
}


export interface EmailDisponible {
    ok:  boolean;
    msg: string;
}
