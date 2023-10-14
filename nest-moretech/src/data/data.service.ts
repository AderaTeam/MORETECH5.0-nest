import { Inject, Injectable } from '@nestjs/common';
import { ATM } from 'src/entities/atm.entity';
import { Office } from 'src/entities/office.entity';
import { OpenHours } from 'src/entities/openHours.entity';
import { OpenHoursIndividual } from 'src/entities/openHoursIndividual.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class DataService {
    constructor(
        @Inject("OFFICE_REPOSITORY")
        private officeRepository: Repository<Office>,
        @Inject("OPENHOURS_REPOSITORY")
        private openHoursRepository: Repository<OpenHours>,
        @Inject("OPENHOURSINDIVIDUAL_REPOSITORY")
        private openHoursIndividualRepository: Repository<OpenHoursIndividual>,
        @Inject("ATM_REPOSITORY")
        private ATMRepository: Repository<ATM>,
    ){}


    public async parseJsonOffices()
    {
        var fs=require('fs');
        var data=fs.readFileSync('src/pureData/offices.json', 'utf8');
        var json=JSON.parse(data);
        var current
        for(const subjson of json) {
            console.log(subjson)
            const current = this.officeRepository.create(subjson)
            const id = await this.officeRepository.insert(current)
            for(const day of subjson.openHours){
                const daydata = this.openHoursRepository.create({office: current['id'], ...day})
                await this.openHoursRepository.insert(daydata)
            };
            for(const day of subjson.openHoursIndividual){
                const daydata = this.openHoursIndividualRepository.create({office: current['id'], ...day})
                await this.openHoursIndividualRepository.insert(daydata)
            };
        };
        return current;
    }

    public async getAllOfficeData()
    {
        return await this.officeRepository.find({relations: {openHours: true, openHoursIndividual: true}, select:{openHours: {days: true, hours: true}, openHoursIndividual: {days: true, hours: true}}})
    }

    public async getAllOfficeDataInRadius(latitude: number, longitude: number)
    {
        return await this.officeRepository.find({where:{latitude: Between(Number(latitude - 0.5), Number(latitude + 0.5) ), longitude: Between(Number(longitude - 0.5), Number(longitude + 0.5) )}, relations: {openHours: true, openHoursIndividual: true}, select:{openHours: {days: true, hours: true}, openHoursIndividual: {days: true, hours: true}}})
    }

    public async parseJsonAtms()
    {
        var fs=require('fs');
        var data=fs.readFileSync('src/pureData/atms.json', 'utf8');
        var json=JSON.parse(data).atms;
        var current
        for(const subjson of json) {
            console.log(subjson)
            console.log(subjson.services)
            for(const service in subjson.services)
            {
                console.log(service)
                console.log(subjson.services[service])
                subjson[service] = (subjson.services[service].serviceActivity == ("UNKNOWN" || "UNAVAILABLE" || null)) ? "false" : "true"
            }
            const current = this.ATMRepository.create({...subjson})
            const id = await this.ATMRepository.insert(current)
        };
        return current;
    }

    public async getAllATMsData()
    {
        return await this.ATMRepository.find();
    }

    public async getIndividualJobs()
    {
        return [
        {"Оформление кредита": "40 минут"},
        {"Оформление карты": "15 минут"},
        {"Выдача ипотеки":"60 минут"},
        {"Выдача автокредита":"45 минут"},
        {"Открытие вкладов и счетов": "20 минут"},
        {"Инвестиции": "15 минут"},
        {"Платежи и переводы": "10 минут"},
        {"Страховые и сервисные продукты": "30 минут"},
        {"Госуслуги":"20 минут"},
        {"Предложения для семьи":"30 минут"},
        {"Аренда сейфовых ячеейк":"10 минут"},
        {"Выдача аккредитива":"20 минут"},
        {"Получение дополнительная пенсии":"15 минут"},
        {"Оформление банкротства физических лиц":"40 минут"},
        {"Мобильная связь":"5 минут"},
        {"Открытие счета эскроу":"15 минут"}
        ]
    }

    public async getOrganizationJobs()
    {
        return[
        {"Открытие расчётного счёта": "40 минут"},
        {"Регистрация бизнеса": "70 минут"},
        {"Выдача кредитов для бизнеса" : "30 минут"},
        {"Оформление бизнес-карты": "20 минут"},
        {"Подключение эквайринга": "25 минут"},
        {"Отрытие депозитов": "50 минут"},
        {"ВЭД": "40 минут"},
        {"Выдача гарантий и аккредитивов для бизнеса": "30 минут"},
        {"Сервисы для бизнеса": "20 минут"},
        {"Документарные операции": "25 минут"},
        {"Оформление зарплатного проекта": "20 минут"},
        {"Подключение СБП": "15 минут"},
        {"Торговое и экспортное финансирование": "60 минут"},
        {"Инвестиционный бизнес": "30 минут"}
        ]
    }
}




/*
{salePointName: subjson.salePointName,
                address: subjson.address,
                status: subjson.status,
                openHours: subjson.openHours,
                rko: subjson.rko,
                openHoursIndividual: subjson.openHoursIndividual,
                officeType: subjson.officeType,
                salePointFormat: subjson.salePointFormat,
                suoAvailability: subjson.suoAvailability,
                hasRamp: subjson.hasRamp,
                latitude: subjson.latitude,
                longitude: subjson.longitude,
                metroStation: subjson.metroStation,
                distance: subjson.distance,
                kep: subjson.kep,
                myBranch: subjson.myBranch
            }




*/