import { NgxCookiebotConfig } from '@halloverden/ngx-cookiebot';

export class CookiebotConfig extends NgxCookiebotConfig {

    override blockingMode: 'auto' | 'manual' | any;
   // override cbId: string = 'd487196d-107d-46d9-b501-1ca24c7f64ab';
    override cbId: string = '90637dc4-f43b-473d-902e-fe47cac51410';
    override culture?: string;
    override framework?: string;
    override level?: string;
    override type?: string;
}