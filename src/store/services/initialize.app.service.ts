import { Injectable } from '@angular/core';

import { SQLiteService } from './sqlite.service';
import { DepartmentEmployeesService } from './department-employees.service';
import { Toast } from '@capacitor/toast';
import { ConfigService } from './config.service';
import { AuthorPostsService } from './author-posts.service';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    private authorPostsService: AuthorPostsService,
    private departmentEmployeesService: DepartmentEmployeesService,
    private configService:ConfigService,
    ) {

  }

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
     
      this.platform = this.sqliteService.platform;
      try {
        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }
         // Initialize the starter_posts database
        await this.authorPostsService.initializeDatabase();
        // Initialize the starter_employees database
        await this.departmentEmployeesService.initializeDatabase();
        // Initialize the start:config database
        await this.configService.initializeDatabase();
       

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
