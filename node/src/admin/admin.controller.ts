import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    // 管理页面渲染
    @Get('/*')
    @Render('admin')
    async home() {
        return {};
    }
}
