import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('workspaces', table => {
        table.increments('id').primary();
        table.string('titulo').notNullable();
        table.integer('deletado').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('workspaces');
}