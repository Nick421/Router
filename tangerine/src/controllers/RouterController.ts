import { Controller, Get } from "@tsed/common";

@Controller("/test")
export class RouterController {
    @Get()
    findAll(): string {
        console.log("AAAAAAAAAAAAAAA");

        return "aaaaaaaaaaaaaaa";
    }
}