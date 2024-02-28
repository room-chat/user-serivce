import * as path from 'path';
import * as fs from "fs";

export type EnvConfig = {
  SERVICE_CONFIG: string;
};

export type IHttp = {
  dbManageHttp: string;
}

export class HttpConfig {
  public readonly dir = path.join(__dirname, '../asset/config/config-file.json');
  public readonly nameConfig = 'http';

  public dbManageHttp = 'http://localhost:3000'

  constructor(env: EnvConfig = process.env as EnvConfig){
    let conf: IHttp;

    try {
      conf = JSON.parse(fs.readFileSync(env.SERVICE_CONFIG || this.dir, 'utf-8'))[this.nameConfig] as IHttp;
    } catch(e) {
      console.log("Error occur when read file config");
    }

    this.dbManageHttp = conf.dbManageHttp || this.dbManageHttp;
  }
}