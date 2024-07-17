import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

/**
 * Config Service Class
 *
 * Class used for application settings by reading configuration
 * data from the .env file
 */
class ConfigService {

    constructor(private env: any) { }

    /**
     * Get value from env file
     *
     * @param key whose value is requested
     * @return {string} key value or throw new error
     */
    private getValue(key: string, throwOnMissing = true): string {

        const value = this.env[key];

        if(!value && value !== '' && throwOnMissing) {
            throw new Error(`Config error - missing env.${key}`);
        }

        return value;
    }

    /**
     * Return ensured values
     *
     * @param keys array of keys
     * @return {string[]} key values
     */
    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    /**
     * Returns the port on which the application is listening
     *
     * @return {number}
     */
    public getPort(): number {
        return parseInt(this.getValue('PORT', true));   
    }

    /**
     * Returns the application name
     *
     * @return {string}
     */
    public getAppName(): string {
        return this.getValue('APP_NAME', true);   
    }

    /**
     * Returns the port on which the database is listening
     *
     * @return {number}
     */
    public getDbPort(): number {
        return parseInt(this.getValue('DATABASE_PORT', true));   
    }

    /**
     * Returns the host on which the database
     *
     * @return {string} value of the database host
    */
    public getDbHost(): string {
        return this.getValue('DATABASE_HOST', true);
    }

    /**
     * Checking if production mode is on
     *
     * @return {boolean}, true for production
     */
    public isProduction(): boolean {
        return this.getValue('MODE', false) !== 'DEV';
    }

    /**
     * Returns JWT Secret key
     *
     * @return {string} value of the secret key
     */
    public getJwtSecret(): string {
        return this.getValue('JWT_SECRET_KEY', true);
    }

    /**
     * Returns expiration time of the JWT Access Token
     *
     * @return {string} value of the JWT Access Token
     */
    public getJwtExpTime(): string {
        return this.getValue('JWT_ACCESS_TOKEN_EXPIRATION_TIME', true);
    }

    /**
     * Returns JWT Refresh secret token
     *
     * @return {string} value of the refresh secret token
     */
    public getJwtRefreshSecret(): string {
        return this.getValue('JWT_REFRESH_TOKEN_SECRET', true);
    }

    /**
     * Returns JWT Refresh secret token expiration time
     *
     * @return {string} value of the refresh secret token expiration time
     */
    public getJwtRefreshExpTime(): string {
        return this.getValue('JWT_REFRESH_TOKEN_EXPIRATION_TIME', true);
    }

    /**
     * Returns settings for TypeOrm database connection read from .env file 
     *
     * @return {TypeOrmModuleOptions} object
     */
    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.getDbHost(),
            port: this.getDbPort(),
            username: this.getValue('DATABASE_USER'),
            password: this.getValue('DATABASE_PASSWORD'),
            database: this.getValue('DATABASE_NAME'),
            synchronize: !!this.getValue('DATABASE_SYNCHRONIZE'),
            logging: true,
            entities: [`${__dirname}/../models/**/**/*.{j,t}s`],
            migrations: [`${__dirname}/../migrations/*.{j,t}s`],
            migrationsTableName: 'migration',
            ssl: this.isProduction()
        }
    }
}

const configService = new ConfigService(process.env)
export { configService }