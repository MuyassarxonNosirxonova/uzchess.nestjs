import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783928926237 implements MigrationInterface {
    name = 'Uzchess1783928926237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_views" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "newsId" integer NOT NULL, "firstDate" TIMESTAMP NOT NULL, "lastDate" TIMESTAMP NOT NULL, "count" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_292b5d908fa538ae7f23786e29d" UNIQUE ("userId", "newsId"), CONSTRAINT "PK_1e2c51f1d3f77e278927d806a76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news" ADD "viewsCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "news_views" ADD CONSTRAINT "FK_61b8defd6210dccbd2e5f4949a8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_views" ADD CONSTRAINT "FK_4a375e5c36f8f2c827624293052" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_views" DROP CONSTRAINT "FK_4a375e5c36f8f2c827624293052"`);
        await queryRunner.query(`ALTER TABLE "news_views" DROP CONSTRAINT "FK_61b8defd6210dccbd2e5f4949a8"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "viewsCount"`);
        await queryRunner.query(`DROP TABLE "news_views"`);
    }

}
