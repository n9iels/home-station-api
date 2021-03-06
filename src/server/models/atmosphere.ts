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

    getBetween(from: Date, to: Date, limit: number = 0) {
        return this.sequelize.query(
            'SELECT * FROM (SELECT * FROM Atmospheres WHERE createdAt > ? AND createdAt < ? ORDER BY createdAt DESC LIMIT ?) T ORDER BY createdAt',
            { replacements: [from, to, limit], type: this.sequelize.QueryTypes.SELECT }
        )
    }
}