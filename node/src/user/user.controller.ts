import { Controller, Body, Post, Header, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserData } from './user.interface';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    /**
     * 登录
     */
    @Post('login')
    @Header('Content-Type', 'application/json')
    async login(@Body()body: UserData) {
        const user = await this.userService.findUser(body.username);
        let result = null;
        if (user === null) {
            result = {
                code: 50000,
                message: '用户不存在',
            };
        } else {
            // 验证密码是否正确
            const isPassword = await this.userService.verifyPassword(body.password, user.password);
            if (isPassword) {
                result = {
                    code: 20000,
                    data: {
                        toke: user.roles,
                        name: user.username,
                    },
                };
            } else {
                result = {
                    code: 50000,
                    message: '密码错误',
                };
            }
        }
        return JSON.stringify(result);
    }

    /**
     * 更改密码
     */
    @Post('cpwd')
    @Header('Content-Type', 'application/json')
    async updatePassword(@Body()body: UserData) {
        const user = await this.userService.findUser(body.username);
        let result = null;
        if (user === null) {
            result = {
                code: 50000,
                message: '用户不存在',
            };
        } else {
            // 验证密码是否正确
            const isPassword = await this.userService.verifyPassword(body.password, user.password);
            if (isPassword) {
                // 更改密码
                const isUpdate = await this.userService.updatePassword(body);
                if (isUpdate) {
                    result = {
                        code: 20000,
                    };
                } else {
                    result = {
                        code: 20000,
                        message: '更改密码失败',
                    };
                }
            } else {
                result = {
                    code: 50000,
                    message: '密码错误',
                };
            }
        }
        return JSON.stringify(result);
    }

    /**
     * 获得 token 信息
     */
    @Get('info')
    @Header('Content-Type', 'application/json')
    async info() {
        const user = await this.userService.findUser('admin');
        let result = null;
        if (user === null) {
            result = {
                code: 50000,
                message: '用户不存在',
            };
        } else {
            result = {
                code: 20000,
                data: {
                    roles: [
                        user.roles,
                    ],
                    name: user.username,
                    avatar: user.avatar,
                },
            };
        }
        return JSON.stringify(result);
    }

    /**
     * 退出登录
     */
    @Post('loginout')
    @Header('Content-Type', 'application/json')
    async loginout() {
        return JSON.stringify({
            code: 20000,
        });
    }

}
