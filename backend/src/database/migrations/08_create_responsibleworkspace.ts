import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('responsibleworkspace', table => {
        table.increments('id').primary();
        table.integer('usuario')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('usuarios');
        table.integer('workspace')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('workspaces');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('responsibleworkspace');
}