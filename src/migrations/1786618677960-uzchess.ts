import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1786618677960 implements MigrationInterface {
    name = 'Uzchess1786618677960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rolePermissions" DROP CONSTRAINT "FK_5cb213a16a7b5204c8aff881518"`);
        await queryRunner.query(`CREATE TABLE "otps" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "code" character varying(6) NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_91fef5ed60605b854a2115d2410" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_logintype_enum" AS ENUM('email', 'number')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "loginType" "public"."users_logintype_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."users_type_enum" AS ENUM('user', 'admin', 'superadmin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" "public"."users_type_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(96) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rolePermissions" ADD CONSTRAINT "FK_5cb213a16a7b5204c8aff881518" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otps" ADD CONSTRAINT "FK_82b0deb105275568cdcef2823eb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otps" DROP CONSTRAINT "FK_82b0deb105275568cdcef2823eb"`);
        await queryRunner.query(`ALTER TABLE "rolePermissions" DROP CONSTRAINT "FK_5cb213a16a7b5204c8aff881518"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loginType"`);
        await queryRunner.query(`DROP TYPE "public"."users_logintype_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('User', 'Admin', 'SuperAdmin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'User'`);
        await queryRunner.query(`DROP TABLE "otps"`);
        await queryRunner.query(`ALTER TABLE "rolePermissions" ADD CONSTRAINT "FK_5cb213a16a7b5204c8aff881518" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
