import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783661479007 implements MigrationInterface {
    name = 'Uzchess1783661479007'


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userPermissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "permissionId" integer NOT NULL, "isAllowed" boolean NOT NULL, CONSTRAINT "PK_5cbba686fa42e45a2914c590261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userRoles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_f51275374b5fb007ccf0fff9806" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "description" text, CONSTRAINT "UQ_08e86fada7ae67b1689f948e83e" UNIQUE ("title"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rolePermissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_a6537fd825da917ef380e6672b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "resource" character varying(64) NOT NULL, "action" character varying(64) NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courseCategories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_6abac9e602f9ddbe55a5876d8ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "difficulties" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(32) NOT NULL, "icon" character varying(256) NOT NULL, CONSTRAINT "UQ_de991ed11f2258b97640f71a45a" UNIQUE ("title"), CONSTRAINT "PK_4c3dd46c9ed9b426d0307e45b3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userPermissions" ADD CONSTRAINT "FK_f9a54628e2dcdb14a6df1da8d3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userPermissions" ADD CONSTRAINT "FK_5fcff32fd1e0d2ad9e179c06ec6" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userRoles" ADD CONSTRAINT "FK_fdf65c16d62910b4785a18cdfce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userRoles" ADD CONSTRAINT "FK_5760f2a1066eb90b4c223c16a10" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rolePermissions" ADD CONSTRAINT "FK_b20f4ad2fcaa0d311f925162675" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rolePermissions" ADD CONSTRAINT "FK_5cb213a16a7b5204c8aff881518" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rolePermissions" DROP CONSTRAINT "FK_5cb213a16a7b5204c8aff881518"`);
        await queryRunner.query(`ALTER TABLE "rolePermissions" DROP CONSTRAINT "FK_b20f4ad2fcaa0d311f925162675"`);
        await queryRunner.query(`ALTER TABLE "userRoles" DROP CONSTRAINT "FK_5760f2a1066eb90b4c223c16a10"`);
        await queryRunner.query(`ALTER TABLE "userRoles" DROP CONSTRAINT "FK_fdf65c16d62910b4785a18cdfce"`);
        await queryRunner.query(`ALTER TABLE "userPermissions" DROP CONSTRAINT "FK_5fcff32fd1e0d2ad9e179c06ec6"`);
        await queryRunner.query(`ALTER TABLE "userPermissions" DROP CONSTRAINT "FK_f9a54628e2dcdb14a6df1da8d3b"`);
        await queryRunner.query(`DROP TABLE "difficulties"`);
        await queryRunner.query(`DROP TABLE "courseCategories"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "rolePermissions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "userRoles"`);
        await queryRunner.query(`DROP TABLE "userPermissions"`);
    }

}
