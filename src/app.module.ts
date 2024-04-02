import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule } from "./clients/clients.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./clients/entities/client.entity";
import { ConceptsModule } from "./concepts/concepts.module";
import { Concept } from "./concepts/entities/concept.entity";
import { ReceiptsModule } from "./receipts/receipts.module";
import { UsersModule } from "./users/users.module";
import { ChequesModule } from "./cheques/cheques.module";
import { ModificationsModule } from "./modifications/modifications.module";
import { User } from "./users/entities/user.entity";
import { Cheque } from "./cheques/entities/cheque.entity";
import { DaysModule } from "./days/days.module";
import { Day } from "./days/entities/day.entity";
import { Receipt } from "./receipts/entities/receipt.entity";
import { AuthModule } from "./auth/auth.module";
import { ConceptItem } from "./concept-items/entities/concept.entity";
import { ConceptItemsModule } from "./concept-items/concept-items.module";
import { DataSource } from "typeorm";
import { UtilsModule } from "./utils/utils.module";
import { GeneralConfigsModule } from "./general-configs/general-configs.module";
import { GeneralConfig } from "./general-configs/entities/general-config.entity";
import { BillingsModule } from './billings/billings.module';
import { Billing } from "./billings/entities/billing.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "estudio",
      entities: [
        Client,
        Concept,
        User,
        Cheque,
        Day,
        Receipt,
        ConceptItem,
        GeneralConfig,
        Billing,
      ],
      synchronize: true,
    }),
    AuthModule,
    ChequesModule,
    ClientsModule,
    ConceptsModule,
    ConceptItemsModule,
    DaysModule,
    ModificationsModule,
    ReceiptsModule,
    UsersModule,
    UtilsModule,
    GeneralConfigsModule,
    BillingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
