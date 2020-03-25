import { Controller, Get, Render } from '@nestjs/common';

@Controller('')
export class HomeController {
    // 展示页面渲染
    @Get(['/', '/about', '/article/*', '/404'])
    @Render('index')
    async admin() {
        return {};
    }
}
