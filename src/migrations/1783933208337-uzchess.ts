import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783933208337 implements MigrationInterface {
    name = 'Uzchess1783933208337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(128) NOT NULL, "image" character varying NOT NULL, "price" numeric(12,2) NOT NULL, "newPrice" numeric(12,2), "isPublished" boolean NOT NULL DEFAULT false, "rating" numeric(2,1), "reviewsCount" integer NOT NULL DEFAULT '0', "sectionsCount" integer NOT NULL DEFAULT '0', "lessonsCount" integer NOT NULL DEFAULT '0', "authorId" integer NOT NULL, "categoryId" integer NOT NULL, "languageId" integer NOT NULL, "difficultyId" integer NOT NULL, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_sections" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "courseId" integer NOT NULL, "title" character varying(256) NOT NULL, "order" integer, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_03086ef0602f2721612a5ce610d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_lessons" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "courseId" integer NOT NULL, "courseSectionId" integer NOT NULL, "title" character varying(128) NOT NULL, "content" text, "thumbnail" character varying, "video" character varying NOT NULL, "order" integer, "date" TIMESTAMP NOT NULL, "isFree" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3b9df6e0f006a24c680208e4e9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_likes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "UQ_ff8416185e969eb9f7a8747b1c9" UNIQUE ("userId", "courseId"), CONSTRAINT "PK_27a0a53d61523df9affc5e02757" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchased_courses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "courseId" integer NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, "date" TIMESTAMP NOT NULL, CONSTRAINT "UQ_3b8055acf480771ed322b9dd2ec" UNIQUE ("userId", "courseId"), CONSTRAINT "PK_0e77cb42fa6a061e15bb988b8ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_lessons" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "courseLessonId" integer NOT NULL, "stoppedAt" integer, "isCompleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_3cb1f9b4228790adc047c929578" UNIQUE ("userId", "courseLessonId"), CONSTRAINT "PK_e8e8a32a31661537f30f4be373b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_fffcbc92f4e8fa650d08be6903d" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_c730473dfb837b3e62057cd9447" FOREIGN KEY ("categoryId") REFERENCES "courseCategories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_a09de3e6027500ac44609a8055f" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_87136dee8b3b8d5ca093961c5e5" FOREIGN KEY ("difficultyId") REFERENCES "difficulties"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_sections" ADD CONSTRAINT "FK_86cf0cbf22034eea0ec79ab7ab3" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_lessons" ADD CONSTRAINT "FK_a4dc7855b148a230609fbf38542" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_lessons" ADD CONSTRAINT "FK_a9f77b0b8eb44123d6f6524f29d" FOREIGN KEY ("courseSectionId") REFERENCES "course_sections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_likes" ADD CONSTRAINT "FK_6315a117214255e725466ecacaa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_likes" ADD CONSTRAINT "FK_093c84a8fa081181895bc068097" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchased_courses" ADD CONSTRAINT "FK_e662f787e93fc7862f0438d1949" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchased_courses" ADD CONSTRAINT "FK_9bb3c4d590172590e33afe82850" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_lessons" ADD CONSTRAINT "FK_f25daf01e7be838fdb8028f814b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_lessons" ADD CONSTRAINT "FK_ffa9dc205bc8954a4abdd088713" FOREIGN KEY ("courseLessonId") REFERENCES "course_lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_lessons" DROP CONSTRAINT "FK_ffa9dc205bc8954a4abdd088713"`);
        await queryRunner.query(`ALTER TABLE "user_lessons" DROP CONSTRAINT "FK_f25daf01e7be838fdb8028f814b"`);
        await queryRunner.query(`ALTER TABLE "purchased_courses" DROP CONSTRAINT "FK_9bb3c4d590172590e33afe82850"`);
        await queryRunner.query(`ALTER TABLE "purchased_courses" DROP CONSTRAINT "FK_e662f787e93fc7862f0438d1949"`);
        await queryRunner.query(`ALTER TABLE "course_likes" DROP CONSTRAINT "FK_093c84a8fa081181895bc068097"`);
        await queryRunner.query(`ALTER TABLE "course_likes" DROP CONSTRAINT "FK_6315a117214255e725466ecacaa"`);
        await queryRunner.query(`ALTER TABLE "course_lessons" DROP CONSTRAINT "FK_a9f77b0b8eb44123d6f6524f29d"`);
        await queryRunner.query(`ALTER TABLE "course_lessons" DROP CONSTRAINT "FK_a4dc7855b148a230609fbf38542"`);
        await queryRunner.query(`ALTER TABLE "course_sections" DROP CONSTRAINT "FK_86cf0cbf22034eea0ec79ab7ab3"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_87136dee8b3b8d5ca093961c5e5"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_a09de3e6027500ac44609a8055f"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_c730473dfb837b3e62057cd9447"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_fffcbc92f4e8fa650d08be6903d"`);
        await queryRunner.query(`DROP TABLE "user_lessons"`);
        await queryRunner.query(`DROP TABLE "purchased_courses"`);
        await queryRunner.query(`DROP TABLE "course_likes"`);
        await queryRunner.query(`DROP TABLE "course_lessons"`);
        await queryRunner.query(`DROP TABLE "course_sections"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
