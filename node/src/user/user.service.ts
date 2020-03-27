import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserData } from './user.interface';
import bcrypt = require('bcryptjs');

/**
 * 用户服务类
 */
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
  /**
   * 根据用户名验证是否有该用户
   * @param username 用户名
   * @return 返回用户信息
   */
  async findUser(username: string) {
    try {
      const user = await this.userRepository.findByIds([1]);
      return user[0];
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  /**
   * 更新密码
   * @param data 请求 body
   */
  async updatePassword(data: UserData) {
    try {
      const password = await this.encryptPassword(data.password);
      const result = await this.userRepository.update(data.id, {
          password,
      });
      return result.raw.affectedRows > 0 ? 1 : 0;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  /**
   * 加密密码
   * @param password 密码
   */
  async encryptPassword(password: string) {
    try {
      const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      return hashPassword;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  /**
   * 验证密码
   * @param getPassword 前端提交的密码
   * @param hashPassword 加密后的密码
   */
  async verifyPassword(getPassword: string, hashPassword: string) {
    try {
      return await bcrypt.compareSync(getPassword, hashPassword);
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }
}
