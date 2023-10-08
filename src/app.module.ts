import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { createConnection } from 'typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
// import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<ConnectionOptions> => {
        const connectionOptions: ConnectionOptions = {
          type: 'mssql',
          host: `${process.env.DB_HOST}`,
          port: parseInt(process.env.DB_PORT),
          username: `${process.env.DB_USERNAME}`,
          password: `${process.env.DB_PASSWORD}`,
          database: `${process.env.DB_DATABASE}`,
          options: { trustServerCertificate: true },
          entities: [__dirname + '/../**/*.entity.js'],
          // entities: [
          //   User,
          //   Color,
          //   Department,
          //   ListAPI,
          //   Permisstion,
          //   Stage,
          //   Time,
          // ],
          synchronize: true,
          pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000,
          },
        };

        const connection = await createConnection(connectionOptions);
        console.log('Connected to the database', connection.options.database);

        return connectionOptions;
      },
    } as TypeOrmModuleAsyncOptions),
    UserModule,
    DepartmentModule,
    AuthModule,
    WorkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mssql',
//       host: 'localhost\\sqlexpress',
//       port: 1433,
//       username: 'sa',
//       password: '1234',
//       database: 'seowondb',
//       autoLoadEntities: true,
//       synchronize: true,
//       options: { trustServerCertificate: true },
//       pool: {
//         max: 10,

//         min: 0,

//         idleTimeoutMillis: 30000,
//       },
//     }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule implements OnModuleInit {
//   constructor(private connection: Connection) {}

//   async onModuleInit() {
//     try {
//       await this.connection.connect();
//       console.log('Connected to the database');
//     } catch (error) {
//       console.error('Failed to connect to the database:', error);
//     }
//   }
// }
