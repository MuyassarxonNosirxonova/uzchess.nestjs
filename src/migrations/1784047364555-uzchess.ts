import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1784047364555 implements MigrationInterface {
    name = 'Uzchess1784047364555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_reviews" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "courseId" integer NOT NULL, "userId" integer NOT NULL, "rating" integer NOT NULL, "comment" character varying(512), CONSTRAINT "UQ_f6d97f7e2bac1ff99b6f7871678" UNIQUE ("courseId", "userId"), CONSTRAINT "PK_2dc117d5b688a2040125a09d1f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course_reviews" ADD CONSTRAINT "FK_2e14b15c1658e0b78a86df473d9" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_reviews" ADD CONSTRAINT "FK_976ca9eb883e2988c09d6bb2cd1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_reviews" DROP CONSTRAINT "FK_976ca9eb883e2988c09d6bb2cd1"`);
        await queryRunner.query(`ALTER TABLE "course_reviews" DROP CONSTRAINT "FK_2e14b15c1658e0b78a86df473d9"`);
        await queryRunner.query(`DROP TABLE "course_reviews"`);
    }

}
