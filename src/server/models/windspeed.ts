import * as Sequelize from "sequelize"
import { Api } from "../../types";

export interface WindspeedAttributes {
    id?: number
    createdAt?: Date
    updatedAt?: Date
    average_speed: number
}

export class Windspeed {
    private sequelize: Sequelize.Sequelize
    private instance: Sequelize.Model<Api.WindspeedData, WindspeedAttributes>

    constructor(sequelize: Sequelize.Sequelize) {
        this.sequelize = sequelize
        this.instance = sequelize.define<Api.WindspeedData, WindspeedAttributes>('Windspeed', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            average_speed: Sequelize.INTEGER
        })
    }

    create(values: WindspeedAttributes) {
        return this.instance.create(values)
    }

    getBetween(from: Date, to:Date) {
        return this.instance.findAll({
            where: {
                createdAt: {
                    [this.sequelize.Op.gte]: from,
                    [this.sequelize.Op.lte]: to,
                }
            },
            order: [['createdAt']]
        })
    }
}