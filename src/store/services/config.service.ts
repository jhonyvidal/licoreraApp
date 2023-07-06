import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';
import { environment } from 'src/environments/environment';

import { MOCK_CONFIGS} from '../mock-data/employees-depts';
import { ConfigData } from '../models/employee-dept';
import { IdsSeq } from '../models/ids-seq';
import { configUpgrades } from '../upgrades/config/upgrade-statements';


@Injectable()
export class ConfigService {
  public databaseName: string;
 
  public configList: BehaviorSubject<ConfigData[]> = new BehaviorSubject<ConfigData[]>([]);
  public idsSeqList: BehaviorSubject<IdsSeq[]> = new BehaviorSubject<IdsSeq[]>([]);

  private isIdsSeqReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isConfigReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private versionUpgrades = configUpgrades;
  private loadToVersion = configUpgrades[configUpgrades.length-1].toVersion;
  private mDb!: SQLiteDBConnection;

  constructor(  private sqliteService: SQLiteService,
    private dbVerService: DbnameVersionService,
  ) {
    this.databaseName = environment.databaseNames.filter(x => x.name.includes('config'))[0].name;
  }


  async initializeDatabase() {
    // create upgrade statements
    await this.sqliteService
    .addUpgradeStatement({ database: this.databaseName,
                            upgrade: this.versionUpgrades});
    // create and/or open the database
    await this.openDatabase();

    this.dbVerService.set(this.databaseName,this.loadToVersion);
    
    const isData = await this.mDb.query("select * from sqlite_sequence");
    // create database initial data
    if(isData.values!.length === 0) {
      await this.createInitialData();
    }
    if( this.sqliteService.platform === 'web') {
      await this.sqliteService.sqliteConnection.saveToStore(this.databaseName);
    }
    await this.getAllData();
  }
  async openDatabase() {
    if(this.sqliteService.native
      && (await this.sqliteService.isInConfigEncryption()).result
      && (await this.sqliteService.isDatabaseEncrypted(this.databaseName)).result) {
      this.mDb = await this.sqliteService
        .openDatabase(this.databaseName, true, "secret",
                        this.loadToVersion,false);

    } else {
      this.mDb = await this.sqliteService
        .openDatabase(this.databaseName, false, "no-encryption",
                      this.loadToVersion,false);
    }
  }
  async getAllData() {

    await this.getAllConfig();
    this.isConfigReady.next(true);

    await this.getAllIdsSeq();
    this.isIdsSeqReady.next(true);
  }



  /**
   * Return Ids Sequence state
   * @returns
   */
  idsSeqState() {
    return this.isIdsSeqReady.asObservable();
  }

    /**
   * Fetch configs
   * @returns
   */
  fetchConfigs(): Observable<ConfigData[]> {
    return this.configList.asObservable();
  }
  /**
   * Fetch Ids Sequence
   * @returns
   */
  fetchIdsSeq(): Observable<IdsSeq[]> {
    return this.idsSeqList.asObservable();
  }

   /**
   * Get, Create, Update a Department
   * @returns
   */
  async getConfig(jsonDepartment: ConfigData): Promise<ConfigData> {
    let department = await this.sqliteService.findOneBy(this.mDb, "configuration", {id: jsonDepartment.id});
    if(!department) {
      if(jsonDepartment.name) {
        // create a new department
        department = new ConfigData();
        department.id = jsonDepartment.id;
        department.name = jsonDepartment.name;
        department.data = jsonDepartment.data;
      
        await this.sqliteService.save(this.mDb, "configuration", department);
        department = await this.sqliteService.findOneBy(this.mDb, "configuration", {id: jsonDepartment.id});
        if(department) {
          return department;
        } else {
          return Promise.reject(`failed to getConfig for id ${jsonDepartment.id}`);
        }
      } else {
        // department not in the database
        department = new ConfigData();
        department.id = -1;
        return department;
      }
    } else {
      if(Object.keys(jsonDepartment).length > 1) {
        // update and existing department
        const updDepartment = new ConfigData();
        updDepartment.id = jsonDepartment.id;
        updDepartment.name = jsonDepartment.name;
        updDepartment.data = jsonDepartment.data

        await this.sqliteService.save(this.mDb, "configuration", updDepartment, {id: jsonDepartment.id});
        department = await this.sqliteService.findOneBy(this.mDb, "configuration", {id: jsonDepartment.id});
        if(department) {
          return department;
        } else {
          return Promise.reject(`failed to getDepartment for id ${jsonDepartment.id}`);
        }
      } else {
        return department;
      }
    }
  }
  /**
   * Delete a Config
   * @returns
   */
  async deleteConfig(jsonDepartment: ConfigData): Promise<void>  {
    let department = await this.sqliteService.findOneBy(this.mDb, "configuration", {id: jsonDepartment.id});
    if( department) {
      await this.sqliteService.remove(this.mDb, "configuration", {id: jsonDepartment.id});
    }
    return;
  }
 /**
   * Post a Config
   * @returns
   */
  async postConfig(json: ConfigData): Promise<void>  {
    await this.sqliteService.save(this.mDb, "configuration", {id: json.id,name:json.name,data:json.data});
    return;
  }

   /**
   * Post a Config
   * @returns
   */
   async updateConfig(json: ConfigData): Promise<void>  {
    await this.sqliteService.save(this.mDb, "configuration",json, {id: json.id});
    return;
  }
  /**
   * Get all Departments
   * @returns
   */
  async getAllConfig(): Promise<void> {
    const configs: ConfigData[] = (await this.mDb.query("select * from configuration")).values as ConfigData[];
    this.configList.next(configs);
  }
  /**
   * Get
   * all Ids Sequence
   * @returns
   */
  async getAllIdsSeq(): Promise<void> {
    const idsSeq: IdsSeq[] = (await this.mDb.query("select * from sqlite_sequence")).values as IdsSeq[];
    this.idsSeqList.next(idsSeq);
  }

  /*********************
   * Private Functions *
   *********************/

  /**
   * Create Database Initial Data
   * @returns
   */
  private async createInitialData(): Promise<void> {
     // create config
    for (const config of MOCK_CONFIGS) {
      await this.getConfig(config);
    }
  }

}
