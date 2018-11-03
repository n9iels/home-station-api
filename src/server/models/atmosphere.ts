import * as Sequelize from "sequelize"
import { Api } from "../../types";

export interface AtmosphereAttributes {
    id?: number
    createdAt?: Date
    updatedAt?: Date
    temperature: number
    humidity: number
    heatIndex: number
}

export class Atmosphere {
    private sequelize: Sequelize.Sequelize
    private instance: Sequelize.Model<Api.AtmosphereData, AtmosphereAttributes>

    constructor(sequelize: Sequelize.Sequelize) {
        this.sequelize = sequelize
        this.instance = sequelize.define<Api.AtmosphereData, AtmosphereAttributes>('Atmosphere', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            heatIndex: Sequelize.FLOAT,
            humidity: Sequelize.FLOAT,
            temperature: Sequelize.FLOAT,
        })
    }

    create(values: AtmosphereAttributes) {
        return this.instance.create(values)
    }

    getBetween(from: Date, to:Date) {
        return this.instance.findAll({
            where: {
                createdAt: {
                    [this.sequelize.Op.gte]: from,
                    [this.sequelize.Op.lte]: to,
                }
            }
        })
    }
}