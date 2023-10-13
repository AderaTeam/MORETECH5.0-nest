import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AdminDto } from 'src/dtos/admin/admin.dto';
import { Admin } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { AdminResponseDto } from 'src/dtos/admin/adminResponse.dto';
@Injectable()
export class AdminService {
    constructor(
        @Inject('ADMIN_REPOSITORY')
        private adminRepository: Repository<Admin>
    ){}

    public async signup(adminDto: AdminDto)
    {
        const salt = 10
        const hash = await bcrypt.hash(adminDto.password, salt)
        if (await this.adminRepository.findOne({where:{username: adminDto.username}}))
        {
            console.log (await this.adminRepository.findOne({where:{username: adminDto.username}}))
            throw new BadRequestException("User with this email already exists")
        }
        const currentUser = this.adminRepository.create({password: hash, username: adminDto.username})
        await this.adminRepository.insert(currentUser)
        return {
            user: new AdminResponseDto(currentUser)
        };
    }

    public async signin(signinDto: AdminDto)
    {
        const candidate = await this.adminRepository.findOne({where:{username: signinDto.username}})
        if (!candidate)
        {
            throw new BadRequestException('User with that email not found')
        }
        if (!bcrypt.compare(signinDto.password, candidate.password))
        {
            throw new BadRequestException('Wrong password')
        }
        const payload = {id: candidate.id, email: candidate.username}
        return {
            user: new AdminResponseDto(candidate)
        };    
    }
}
