import * as Sequelize from 'sequelize';
import {sequelize} from '../instances/dbConfig'

// export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
//     /* onboarding & registration details */
//    const onboarding = sequelize.define("user_details", {
//     msisdn: {
//         type: dataTypes.STRING,
//         allowNull: false
//     },
//     user_name: {
//         type: dataTypes.STRING,
//         allowNull: false
//     },
//     user_role: {
//         type: dataTypes.NUMBER,
//         allowNull: false
//     },
//     user_status: {
//         type: dataTypes.NUMBER,
//         allowNull: false
//     }
//    })

//    return onboarding;
// }
/* User Onbaording Model */
export interface OnboardingModel {
    msisdn: string;
    user_name: string;
    user_role: string;
    user_status: string;
}

export interface OnboardingViewModel {
    id:number;
    msisdn: string;
}

export interface UserModel extends Sequelize.Model {
    id: number
    msisdn: string;
    user_name: string;
    user_role: number;
    user_status: number;
    created_at: string;
    updated_at: string;
}

export class User extends Sequelize.Model<UserModel, OnboardingModel > {
    // id: number
    // msisdn: string;
    // user_name: string;
    // user_role: number;
    // user_status: number;
    // created_at: string;
    // updated_at: string;
    public id!: number;
    public msisdn!: string;
    public user_name!: string;
    public user_role!: number;
    public user_status!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;


}

// User.init({
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     msisdn: Sequelize.STRING,
//     user_name: Sequelize.STRING,
//     user_role: Sequelize.NUMBER,
//     user_status: Sequelize.NUMBER

// }, {
    
// })



// export const User = sequelize.define<UserModel, OnboardingModel>('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     msisdn: Sequelize.STRING,
//     user_name: Sequelize.STRING,
//     user_role: Sequelize.INTEGER,
//     user_status: Sequelize.INTEGER,

    
    
// })

