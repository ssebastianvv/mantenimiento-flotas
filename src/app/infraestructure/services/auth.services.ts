import { ILoginRequest, ILoginResponse } from "@/app/core/application/index";
import { PAuth } from "@/app/core/application/ports";
import { HttpClient } from "@/app/infraestructure/untils/index";

export class AuthService  implements PAuth {
    private clientHttp : HttpClient;
    private basePath : string = "auth";
    
    constructor(){
        this.clientHttp = new HttpClient();
    }

    async login(req: ILoginRequest): Promise<ILoginResponse> {

        return this.clientHttp.post<ILoginResponse,ILoginRequest >(
            `${this.basePath}/login`,
            req
        )
    }
}