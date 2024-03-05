import { Injectable, ConsoleLogger} from "@nestjs/common";

@Injectable()
export class ChatLogger extends ConsoleLogger {}