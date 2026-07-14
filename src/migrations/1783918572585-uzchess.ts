import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783918572585 implements MigrationInterface {
    name = 'Uzchess1783918572585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookReviews" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "bookId" integer NOT NULL, "userId" integer NOT NULL, "rating" integer NOT NULL, "comment" character varying(512), CONSTRAINT "UQ_05852b41b0dc3db4ae04b1a6c99" UNIQUE ("bookId", "userId"), CONSTRAINT "PK_fbd29f7d604cf4ba60c0f28a384" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookReviews" ADD CONSTRAINT "FK_ca9aae9f8655c98c8a89a7a523a" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookReviews" ADD CONSTRAINT "FK_362ae32a4a1728e8376e3de429f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookReviews" DROP CONSTRAINT "FK_362ae32a4a1728e8376e3de429f"`);
        await queryRunner.query(`ALTER TABLE "bookReviews" DROP CONSTRAINT "FK_ca9aae9f8655c98c8a89a7a523a"`);
        await queryRunner.query(`DROP TABLE "bookReviews"`);
    }

}
