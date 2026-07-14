import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783914756987 implements MigrationInterface {
    name = 'Uzchess1783914756987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book_likes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "UQ_7ecf9c0879c024de58bf4c5a6fb" UNIQUE ("userId", "bookId"), CONSTRAINT "PK_2ceb2da6734680b1335c949e6e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book_likes" ADD CONSTRAINT "FK_f7e69df240d2f0326d361097e68" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_likes" ADD CONSTRAINT "FK_c437c56892c81c6cd42998a7ebe" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_likes" DROP CONSTRAINT "FK_c437c56892c81c6cd42998a7ebe"`);
        await queryRunner.query(`ALTER TABLE "book_likes" DROP CONSTRAINT "FK_f7e69df240d2f0326d361097e68"`);
        await queryRunner.query(`DROP TABLE "book_likes"`);
    }

}
