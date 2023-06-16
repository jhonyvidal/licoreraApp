import { Injectable } from '@angular/core';

import { SQLiteService } from './sqlite.service';
import { DepartmentEmployeesService } from './department-employees.service';
import { Toast } from '@capacitor/toast';
import { ConfigService } from './config.service';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    // private configService:ConfigService,
    private departmentEmployeesService: DepartmentEmployeesService
    ) {

  }

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
     
      this.platform = this.sqliteService.platform;
      try {
        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }
        // Initialize the starter_employees database
        await this.departmentEmployeesService.initializeDatabase();

        // await this.configService.initializeDatabase();
        // Initialize any other database if any

        this.isAppInit = true;

      } catch (error) {
        console.log(`initializeAppError: ${error}`);
        await Toast.show({
          text: `initializeAppError: ${error}`,
          duration: 'long'
        });
      }
    });
  }

}
