import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783720075941 implements MigrationInterface {
    name = 'Uzchess1783720075941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book_categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_a414d9bb6fcf42874c6797093b4" UNIQUE ("title"), CONSTRAINT "PK_23cd2d376c4ce915f1f5994a4a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(128) NOT NULL, "description" text NOT NULL, "image" character varying, "price" numeric(12,2) NOT NULL, "newPrice" numeric(12,2), "rating" numeric(2,1), "reviewsCount" integer NOT NULL DEFAULT '0', "pages" integer NOT NULL, "pubDate" date NOT NULL, "authorId" integer NOT NULL, "categoryId" integer NOT NULL, "difficultyId" integer NOT NULL, "languageId" integer NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_a0f13454de3df36e337e01dbd55" FOREIGN KEY ("categoryId") REFERENCES "book_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_78f9d0c7bf6c0588b6d06fd1aef" FOREIGN KEY ("difficultyId") REFERENCES "difficulties"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_49060974a6295b7f70ac2c102b5" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_49060974a6295b7f70ac2c102b5"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_78f9d0c7bf6c0588b6d06fd1aef"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_a0f13454de3df36e337e01dbd55"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "book_categories"`);
    }

}
